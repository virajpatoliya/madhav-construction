ok listen here is the code  and the problem is 1.rate is not display in download pdf, 2.add perunit input, 3.when enterd no qawilty, rate then instantly visible on side amount(rate * no qalutilty) and also saved in backend 4.fix the code if you found redundant here is the code // src/BillForm.tsx
import React, { useState } from "react";
import { Bill, Section, Entry } from "../../../service/abstractService";
import { v4 as uuidv4 } from "uuid";
import { IconChevronRight, IconClearAll, IconHttpDelete, IconInfoCircleFilled, IconPlus, IconTrashFilled } from "@tabler/icons-react";
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
    const [form, setForm] = useState<Bill>({
        id: bill.id,
        companyName: bill.companyName,
        workName: bill.workName,
        date: bill.date,
        billNo: bill.billNo,
        sections: bill.sections ?? [],
    });

    const updateField = (patch: Partial<Bill>) => setForm(prev => ({ ...prev, ...patch }));

    const addSection = () => setForm(prev => ({ ...prev, sections: [...(prev.sections || []), emptySection()] }));

    const removeSection = (sectionId: string) => {
        setForm(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== sectionId) }));
    };

    const addEntry = (sectionId: string) => {
        setForm(prev => ({
            ...prev,
            sections: prev.sections.map(s => s.id === sectionId ? ({ ...s, entries: [...s.entries, emptyEntry()] }) : s)
        }));
    };

    const updateSectionTitle = (sectionId: string, title: string) => {
        setForm(prev => ({ ...prev, sections: prev.sections.map(s => s.id === sectionId ? { ...s, title } : s) }));
    };

    const updateEntry = (sectionId: string, entryId: string, patch: Partial<Entry>) => {
        setForm(prev => ({
            ...prev,
            sections: prev.sections.map(s => s.id === sectionId ? {
                ...s,
                entries: s.entries.map(e => e.id === entryId ? { ...e, ...patch } : e)
            } : s)
        }));
    };

    const removeEntry = (sectionId: string, entryId: string) => {
        setForm(prev => ({ ...prev, sections: prev.sections.map(s => s.id === sectionId ? { ...s, entries: s.entries.filter(e => e.id !== entryId) } : s) }));
    };

    const handleSave = () => {
        // minimal validation example
        if (!form.companyName.trim()) {
            alert("Company name required");
            return;
        }
        onSave(form);
    };

    const calculateQty = (row: Entry) => {
        const nos = (row.nos) || 0;
        const rate = (row.rate) || 0;
        return nos * rate;
    };

    const sectionSubtotal = (section: Section) =>
        section.entries.reduce((sum, r) => sum + calculateQty(r), 0);

    // const grandTotal = bill.sections.reduce((sum, s) => sum + sectionSubtotal(s), 0);


    const downloadPDF = () => {
        const doc = new jsPDF();

        // -----------------------
        // Logo + Company Name
        // -----------------------
        // Add logo (adjust path and size as needed)
        // If using base64 string, replace "logo.png" with your base64 data
        doc.addImage("images/logo.png", "PNG", 14, 10, 35, 25); // (x, y, width, height)

        doc.setFontSize(24);
        doc.setFont('helvetica', "bold");
        doc.text("Madhav Construction", 105, 25, { align: "center" }); // Company name next to logo

        // -----------------------
        // Big Title
        // -----------------------
        doc.setFontSize(16);
        doc.setFont('helvetica', "bold");
        doc.setTextColor(255, 0, 0);
        doc.text("ABSTRACT BILL", 105, 45, { align: "center" });

        // -----------------------
        // Header info above table
        // -----------------------
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', "normal");
        doc.text("Company", 14, 60);
        doc.setFont('helvetica', "bold");
        doc.text(bill.companyName || "________________", 30, 60);

        // Work Name
        doc.setFont('helvetica', "normal");
        doc.text("Work", 14, 65);
        doc.setFont('helvetica', "bold");
        doc.text(bill.workName || "________________", 24, 65);

        // Date
        doc.setFont('helvetica', "normal");
        doc.text("Date", 165, 60);
        doc.setFont('helvetica', "bold");
        doc.text(bill.date, 175, 60);

        // Page No
        doc.setFont('helvetica', "normal");
        doc.text("Bill No", 165, 65);
        doc.setFont('helvetica', "bold");
        doc.text(bill.billNo, 180, 65);

        // Reset font to normal before table
        doc.setFont('helvetica', "normal");

        // -----------------------
        // Build a single table body
        // -----------------------
        const body: any[] = [];

        bill.sections.forEach((section) => {
            // Section heading row
            body.push([
                {
                    content: section.title.toUpperCase(),
                    colSpan: 7,
                    styles: {
                        halign: "left",
                        fontStyle: "bold",
                        fillColor: [220, 220, 220],
                    },
                },
            ]);

            // Entries
            section.entries.forEach((row) => {
                body.push([
                    row.item,
                    row.nos,
                    row.rate,
                    row.perUnit,
                    calculateQty(row).toFixed(2),
                    "",
                ]);
            });

            // Section subtotal row
            body.push([
                { content: "Subtotal", colSpan: 5, styles: { halign: "right", fontStyle: "bold" } },
                "",
                { content: sectionSubtotal(section).toFixed(2), styles: { fontStyle: "bold" } },
            ]);
        });


        autoTable(doc, {
            head: [
                [
                    { content: "Items", rowSpan: 2 },
                    { content: "Nos", rowSpan: 2 },
                    // { content: "Measurement", colSpan: 3, styles: { halign: "center" } },
                    { content: "PerUnit", rowSpan: 2 },
                    { content: "Rate", rowSpan: 2 },
                    { content: "Quantity", rowSpan: 2 },

                ],
            ],
            body,
            startY: 70,
            theme: "grid", // ✅ add borders
            styles: {
                halign: "left",
                valign: "middle",
                fontSize: 10,
                lineColor: [0, 0, 0],   // ✅ border color = black
                lineWidth: 0.1,
                textColor: 20,
            },
            headStyles: {
                halign: "center",
                valign: "middle",
                fillColor: [255, 179, 0],
                textColor: 20,
                fontStyle: "bold",
            },
        });

        doc.save(`${form.companyName || "AbstractBill"} Measurement Form.pdf`);
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
                    {form.sections.map(section => (
                        <div key={section.id} className="border w-full p-3 mb-3 rounded-2xl ">
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <input value={section.title} onChange={(e) => updateSectionTitle(section.id, e.target.value)} placeholder="New section" className="bg-gray-100  w-full rounded-xl p-2.5 px-5 font-bold" />
                                <div className="flex gap-2">
                                    <button onClick={() => addEntry(section.id)} className="bg-yellow-600 text-white p-3 text-sm flex flex-row items-center gap-1 rounded-xl"><IconPlus stroke={5} size={15} /></button>
                                    <button onClick={() => removeSection(section.id)} className="bg-red-700 text-white p-3 text-sm flex flex-row items-center gap-1 rounded-xl"><IconTrashFilled size={15} /> Section</button>
                                </div>
                            </div>
                            {section.entries.map(entry => (
                                <div key={entry.id} className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-2  w-full">
                                    <div className="flex col-span-2 flex-col">
                                        <label className="px-2 text-xs font-bold ">Items</label>
                                        <input type="text" value={entry.item} placeholder="Enter item" onChange={(e) => updateEntry(section.id, entry.id, { item: e.target.value })} className="bg-gray-100 rounded-xl p-2 px-3" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <label className="px-2 text-xs font-bold">No. Quantity</label>
                                        <input type="number" value={entry.nos} placeholder="Nos" onChange={(e) => updateEntry(section.id, entry.id, { nos: Number(e.target.value) })} className="bg-gray-100 rounded-xl p-2 px-3" />
                                    </div>
                                    <div className="flex  flex-col ">
                                        <label className="px-2 text-xs font-bold">Rate</label>
                                        <input type="number" value={entry.rate} placeholder="Length" onChange={(e) => updateEntry(section.id, entry.id, { rate: Number(e.target.value) })} className="bg-gray-100 rounded-xl p-2 px-3" />
                                    </div>
                                    <div className="flex  flex-col ">
                                        <label className="px-2 text-xs font-bold">Amount</label>
                                        <input type="number" readOnly value={ } placeholder="Length" onChange={(e) => updateEntry(section.id, entry.id, { rate: Number(e.target.value) })} className="bg-gray-100 rounded-xl p-2 px-3" />
                                    </div>


                                    <button onClick={() => removeEntry(section.id, entry.id)} className="bg-red-700 text-white p-2 rounded-xl"><IconHttpDelete size={20} /></button>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div>
                        <button onClick={addSection} className="bg-teal-600 text-white rounded-xl p-2.5 px-5 font-bold">+ Add Section</button>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={downloadPDF}
                        disabled={form.sections.length === 0 || !form.companyName || !form.workName}
                        className={form.sections.length === 0 || !form.companyName || !form.workName ? 'opacity-50 cursor-not-allowed flex flex-row gap-1  rounded-xl p-2.5 px-5 font-bold' : 'bg-yellow-500 flex flex-row gap-1 text-white rounded-xl p-2.5 px-5 font-bold'}>
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
