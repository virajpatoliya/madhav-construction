// src/BillForm.tsx
import React, { useState } from "react";
import { Bill, Section, Entry, updateAbstractBill, addAbstractBill } from "../../../service/abstractService";
import { v4 as uuidv4 } from "uuid";
import { IconChevronRight, IconHttpDelete, IconInfoCircleFilled, IconPlus, IconTrashFilled } from "@tabler/icons-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "lucide-react";

type Props = {
    bill: Bill;
    onSave: (bill: Bill) => void;
    onClose: () => void;
};

const emptyEntry = (): Entry => ({
    id: uuidv4(),
    item: "",
    nos: 0,
    rate: 0,
    perUnit: "",
    amount: 0,
});

const emptySection = (): Section => ({
    id: uuidv4(),
    title: "",
    entries: [],
});


const AbstractBillForm: React.FC<Props> = ({ bill, onSave, onClose }) => {
    const normalizeBill = (bill: Bill): Bill => ({
        ...bill,
        abstractSection: (bill.abstractSection || []).map((section) => ({
            ...section,
            entries: (section.entries || []).map((entry) => ({
                id: entry.id || uuidv4(),
                item: entry.item || "",
                nos: entry.nos ?? 0,
                perUnit: entry.perUnit || "",
                rate: entry.rate ?? 0,
                amount: entry.amount ?? 0,
            })),
        })),
    });
    const [form, setForm] = useState<Bill>(normalizeBill(bill));

    React.useEffect(() => {
        setForm(normalizeBill(bill));
    }, [bill]);



    const updateField = (patch: Partial<Bill>) => setForm(prev => ({ ...prev, ...patch }));

    const addSection = () => setForm(prev => ({ ...prev, abstractSection: [...(prev.abstractSection || []), emptySection()] }));

    const removeSection = (sectionId: string) => {
        setForm(prev => ({ ...prev, abstractSection: prev.abstractSection.filter(s => s.id !== sectionId) }));
    };

    const addEntry = (sectionId: string) => {
        setForm(prev => ({
            ...prev,
            abstractSection: prev.abstractSection.map(s => s.id === sectionId ? ({ ...s, entries: [...s.entries, emptyEntry()] }) : s)
        }));
    };

    const updateSectionTitle = (sectionId: string, title: string) => {
        setForm(prev => ({ ...prev, abstractSection: prev.abstractSection.map(s => s.id === sectionId ? { ...s, title } : s) }));
    };

    const updateEntry = (sectionId: string, entryId: string, patch: Partial<Entry>) => {
        setForm((prev) => {
            const updatedabstractSection = prev.abstractSection.map((section) => {
                if (section.id !== sectionId) return section;

                const updatedEntries = section.entries.map((entry) => {
                    if (entry.id !== entryId) return entry;

                    const updated = { ...entry, ...patch };
                    const nos = Number(updated.nos) || 0;
                    const rate = Number(updated.rate) || 0;
                    updated.amount = nos * rate; // ✅ recalc and store

                    return updated;
                });

                return { ...section, entries: updatedEntries };
            });

            return { ...prev, abstractSection: updatedabstractSection };
        });
    };


    const removeEntry = (sectionId: string, entryId: string) => {
        setForm(prev => ({ ...prev, abstractSection: prev.abstractSection.map(s => s.id === sectionId ? { ...s, entries: s.entries.filter(e => e.id !== entryId) } : s) }));
    };

    const handleSave = async () => {
        if (!form.companyName.trim()) {
            alert("Company name required");
            return;
        }

        const payload: Bill = {
            ...form,
            abstractSection: form.abstractSection.map((s) => ({
                ...s,
                entries: s.entries.map((e) => ({
                    ...e,
                    amount: e.nos * e.rate,
                })),
            })),
        };

        try {
            let savedBill: Bill;
            if (form.id) {
                savedBill = await updateAbstractBill(form.id, payload);
            } else {
                savedBill = await addAbstractBill(payload);
            }

            // ✅ Notify parent so modal closes and list reloads
            onSave(savedBill);
        } catch (err) {
            console.error("Error saving bill:", err);
            alert("Failed to save bill");
        }
    };


    const calculateQty = (row: Entry) => {
        const nos = (row.nos) || 0;
        const rate = (row.rate) || 0;
        return nos * rate;
    };

    const abstractSectionubtotal = (section: Section) =>
        section.entries.reduce((sum, r) => sum + calculateQty(r), 0);

    // const grandTotal = bill.abstractSection.reduce((sum, s) => sum + abstractSectionubtotal(s), 0);

    const downloadPDF = () => {
        const doc = new jsPDF();
        // Convert date to dd-mm-yyyy
        const formatDate = (dateString) => {
            const d = new Date(dateString);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const invoiceDate = formatDate(bill.date);
        // ===== HEADER =====
        doc.addImage("images/logo.png", "PNG", 14, 10, 35, 25);
        doc.setFontSize(24).setFont("helvetica", "bold");
        doc.text("Madhav Construction", 105, 25, { align: "center" });

        doc.setFontSize(16).setTextColor(255, 0, 0);
        doc.text("ABSTRACT BILL", 105, 45, { align: "center" });

        // ===== INFO =====
        doc.setFontSize(10).setTextColor(0, 0, 0);
        doc.text(`Company: ${form.companyName}`, 14, 60);
        doc.text(`Work: ${form.workName}`, 14, 65);
        doc.text(`Date: ${invoiceDate}`, 165, 60);
        doc.text(`Bill No: ${form.billNo}`, 165, 65);

        // ===== TABLE BODY =====
        const body: any[] = [];
        let totalEntryCount = 0;

        form.abstractSection.forEach((section) => {
            // Section heading
            body.push([
                {
                    content: section.title?.toUpperCase() || "UNTITLED SECTION",
                    colSpan: 5,
                    styles: {
                        halign: "left",
                        fontStyle: "bold",
                        fillColor: [220, 220, 220],
                    },
                },
            ]);

            // Entries
            section.entries.forEach((row) => {
                const nos = Number(row.nos) || 0;
                const rate = Number(row.rate) || 0;
                const perUnit = row.perUnit || "";
                const amount = Number(row.amount) || nos * rate;

                body.push([
                    row.item || "",
                    nos.toString(),
                    perUnit,
                    rate ? rate.toFixed(2) : "0.00",
                    amount ? amount.toFixed(2) : "0.00",
                ]);

                totalEntryCount++;
            });

            // Subtotal
            body.push([
                { content: "Total", colSpan: 4, styles: { halign: "right", textColor: 0, fontStyle: "bold" } },
                { content: abstractSectionubtotal(section).toFixed(2), styles: { fontStyle: "bold", textColor: 0, } },
            ]);
        });

        // ===== FILL EMPTY ROWS TO MAKE 20 =====
        const totalDesiredRows = 20;
        const emptyRowCount = Math.max(0, totalDesiredRows - totalEntryCount);
        for (let i = 0; i < emptyRowCount; i++) {
            body.push(["", "", "", "", ""]);
        }

        // ===== RENDER TABLE =====
        autoTable(doc, {
            head: [["Item", "Nos", "Per Unit", "Rate", "Amount"]],
            body,
            startY: 70,
            theme: "grid",
            styles: {
                fontSize: 10,
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                textColor: 0,
            },
            headStyles: {
                fillColor: [255, 179, 0],
                textColor: 0,
                fontStyle: "bold",
            },
        });

        // ===== GRAND TOTAL (optional) =====
        // const grandTotal = form.abstractSection.reduce((sum, s) => sum + abstractSectionubtotal(s), 0);
        // doc.setFontSize(12).setFont("helvetica", "bold");
        // doc.text(`Grand Total: ${grandTotal.toFixed(2)}`, 160, doc.lastAutoTable.finalY + 10);

        doc.save(`${form.companyName}_abstractbill.pdf`);
    };




    return (
        <div className="fixed inset-0 p-3 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col bg-white rounded-3xl  p-6 pt-0 w-full h-full overflow-y-scroll no-scrollbar">
                <div className=" flex flex-col mb-4 bg-white pb-1 pt-6 sticky gap-1 top-0">
                    <div className="flex flex-row text-xl text-gray-950 items-center font-medium justify-between w-full">
                        <label className="flex flex-row items-center">
                            <span className="font-extrabold pl-1">{form.id ? "Edit Bill" : "Create New Bill"}</span>
                            <IconChevronRight stroke={5} size={20} />
                        </label>
                        <IconInfoCircleFilled size={18} />
                    </div>
                    <label className="text-xs font-semibold text-gray-400">Create new bill here. You can able to edit and delete it later.</label>
                </div>
                <label className="text-sm font-bold text-gray-600 my-3">Bill Details</label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">

                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-bold text-gray-600 ml-3">Company</label>
                        <input value={form.companyName} onChange={(e) => updateField({ companyName: e.target.value })} placeholder="Company Name" className="bg-gray-100 rounded-xl p-2 px-3" />
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-bold text-gray-600 ml-3">Work</label>
                        <input value={form.workName} onChange={(e) => updateField({ workName: e.target.value })} placeholder="Work Name" className="bg-gray-100 rounded-xl p-2 px-3" />
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-bold text-gray-600 ml-3">Bill No</label>
                        <input type="text" value={form.billNo} onChange={(e) => updateField({ billNo: e.target.value })} className="bg-gray-100 rounded-xl p-2 px-3" />
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-bold text-gray-600 ml-3">Date</label>
                        <input type="date" value={form.date} onChange={(e) => updateField({ date: e.target.value })} className="bg-gray-100 rounded-xl p-2 px-3" />
                    </div>
                </div>

                <div className="mb-4">
                    {form.abstractSection.map(section => (
                        <div key={section.id} className="border w-full p-3 mb-3 rounded-2xl ">
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <input value={section.title} onChange={(e) => updateSectionTitle(section.id, e.target.value)} placeholder="New section" className="bg-gray-100  w-full rounded-xl p-2.5 px-5 font-bold" />
                                <div className="flex gap-2">
                                    <button onClick={() => addEntry(section.id)} className="bg-yellow-600 text-white p-3 text-sm flex flex-row items-center gap-1 rounded-xl"><IconPlus stroke={5} size={15} /></button>
                                    <button onClick={() => removeSection(section.id)} className="bg-red-700 text-white p-3 text-sm flex flex-row items-center gap-1 rounded-xl"><IconTrashFilled size={15} /> Section</button>
                                </div>
                            </div>
                            {section.entries.map(entry => {
                                const amount = entry.nos * entry.rate; // ✅ Instant calculated amount

                                return (
                                    <div key={entry.id} className="grid grid-cols-2 md:grid-cols-8 gap-2 mb-2 w-full">
                                        {/* Item */}
                                        <div className="flex col-span-2 flex-col">
                                            <label className="px-2 text-xs font-bold">Items</label>
                                            <input
                                                type="text"
                                                value={entry.item}
                                                placeholder="Enter item"
                                                onChange={(e) =>
                                                    updateEntry(section.id, entry.id, { item: e.target.value })
                                                }
                                                className="bg-gray-100 rounded-xl p-2 px-3"
                                            />
                                        </div>

                                        {/* Quantity */}
                                        <div className="flex flex-col">
                                            <label className="px-2 text-xs font-bold">Quantity</label>
                                            <input
                                                type="number"
                                                value={entry.nos}
                                                placeholder="Nos"
                                                onChange={(e) => {
                                                    const nos = Number(e.target.value);
                                                    const updatedAmount = nos * entry.rate;
                                                    updateEntry(section.id, entry.id, {
                                                        nos,
                                                        amount: updatedAmount,
                                                    });
                                                }}
                                                className="bg-gray-100 rounded-xl p-2 px-3"
                                            />
                                        </div>

                                        {/* Per Unit */}
                                        <div className="flex flex-col">
                                            <label className="px-2 text-xs font-bold">Per Unit</label>
                                            <input
                                                type="text"
                                                value={entry.perUnit}
                                                placeholder="e.g. sq.ft / kg / m"
                                                onChange={(e) =>
                                                    updateEntry(section.id, entry.id, { perUnit: e.target.value })
                                                }
                                                className="bg-gray-100 rounded-xl p-2 px-3"
                                            />
                                        </div>

                                        {/* Rate */}
                                        <div className="flex flex-col">
                                            <label className="px-2 text-xs font-bold">Rate</label>
                                            <input
                                                type="number"
                                                value={entry.rate}
                                                placeholder="Rate"
                                                onChange={(e) => {
                                                    const rate = Number(e.target.value);
                                                    const updatedAmount = entry.nos * rate;
                                                    updateEntry(section.id, entry.id, {
                                                        rate,
                                                        amount: updatedAmount,
                                                    });
                                                }}
                                                className="bg-gray-100 rounded-xl p-2 px-3"
                                            />
                                        </div>

                                        {/* Amount */}
                                        <div className="flex flex-col">
                                            <label className="px-2 text-xs font-bold">Amount</label>
                                            <input
                                                type="number"
                                                readOnly
                                                value={amount.toFixed(2)}
                                                className="bg-gray-100 w-full rounded-xl p-2 px-3 font-semibold text-gray-700"
                                            />
                                        </div>

                                        {/* Delete */}
                                        <button
                                            onClick={() => removeEntry(section.id, entry.id)}
                                            className="bg-red-700 text-white p-2 rounded-xl flex justify-center items-center"
                                        >
                                            <IconHttpDelete size={20} />
                                        </button>
                                    </div>
                                );
                            })}

                        </div>
                    ))}

                    <div>
                        <button onClick={addSection} className="bg-teal-600 text-white rounded-xl p-2.5 px-5 font-bold">+ Add Section</button>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={downloadPDF}
                        disabled={form.abstractSection.length === 0 || !form.companyName || !form.workName}
                        className={form.abstractSection.length === 0 || !form.companyName || !form.workName ? 'opacity-50 cursor-not-allowed flex flex-row gap-1  rounded-xl p-2.5 px-5 font-bold' : 'bg-yellow-500 flex flex-row gap-1 text-white rounded-xl p-2.5 px-5 font-bold'}>
                        <Download className="mr-2" size={20} /> Download
                    </button>
                    <button onClick={handleSave} className="bg-blue-950 text-white rounded-xl p-2.5 px-5 font-bold">Save</button>
                    <button onClick={onClose} className="bg-red-700 text-white rounded-xl p-2.5  font-bold">Cancel</button>
                </div>


            </div>
        </div>
    );
};

export default AbstractBillForm;
