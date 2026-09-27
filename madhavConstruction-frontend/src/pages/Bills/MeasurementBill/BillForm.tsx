// src/BillForm.tsx
import React, { useState } from "react";
import { Bill, Section, Entry } from "../../../service/billService";
import { v4 as uuidv4 } from "uuid";
import { IconChevronRight, IconClearAll, IconHttpDelete, IconInfoCircleFilled, IconPlus, IconTrashFilled } from "@tabler/icons-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
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
    length: 0,
    breadth: 0,
    depth: 1,
});

const emptySection = (): Section => ({
    id: uuidv4(),
    title: "",
    entries: [],
});

const BillForm: React.FC<Props> = ({ bill, onSave, onClose }) => {
    const [form, setForm] = useState<Bill>({
        id: bill.id,
        companyName: bill.companyName,
        workName: bill.workName,
        date: bill.date,
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
        const length = (row.length) || 0;
        const breadth = (row.breadth) || 0;
        const depth = (row.depth) || 1;
        return nos * length * breadth * depth;
    };

    const sectionSubtotal = (section: Section) =>
        section.entries.reduce((sum, r) => sum + calculateQty(r), 0);

    // const grandTotal = bill.sections.reduce((sum, s) => sum + sectionSubtotal(s), 0);


    const downloadPDF = () => {
        const doc = new jsPDF();
        const formatDate = (dateString) => {
            const d = new Date(dateString);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const invoiceDate = formatDate(bill.date);
        // -----------------------
        // Logo + Company Name
        // -----------------------
        doc.addImage("images/logo.png", "PNG", 14, 10, 35, 25);
        doc.setFontSize(24);
        doc.setFont(undefined, "bold");
        doc.text("Madhav Construction", 105, 25, { align: "center" });

        // -----------------------
        // Big Title
        // -----------------------
        doc.setFontSize(16);
        doc.setFont(undefined, "bold");
        doc.setTextColor(255, 0, 0);
        doc.text("MEASUREMENT SHEET", 105, 45, { align: "center" });

        // -----------------------
        // Header info
        // -----------------------
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.text("Company", 14, 60);
        doc.setFont(undefined, "bold");
        doc.text(bill.companyName || "________________", 30, 60);

        doc.setFont(undefined, "normal");
        doc.text("Work", 14, 65);
        doc.setFont(undefined, "bold");
        doc.text(bill.workName || "________________", 24, 65);

        doc.setFont(undefined, "normal");
        doc.text("Date", 165, 60);
        doc.setFont(undefined, "bold");
        doc.text(invoiceDate || "__________", 175, 60);

        doc.setFont(undefined, "normal");

        // -----------------------
        // Build table body
        // -----------------------
        const body: any[] = [];
        let totalEntryCount = 0;

        bill.sections.forEach((section) => {
            // Section heading
            body.push([
                {
                    content: section.title?.toUpperCase() || "UNTITLED SECTION",
                    colSpan: 7,
                    styles: {
                        halign: "left",
                        fontStyle: "bold",
                        fillColor: [220, 220, 220],
                    },
                },
            ]);

            // Actual data rows
            section.entries.forEach((row) => {
                body.push([
                    row.item || "",
                    row.nos || "",
                    row.length || "",
                    row.breadth || "",
                    row.depth || "",
                    calculateQty(row).toFixed(2),
                    "",
                ]);
                totalEntryCount++;
            });

            // Subtotal row
            body.push([
                { content: "Subtotal", colSpan: 5, styles: { halign: "right", fontStyle: "bold" } },
                "",
                { content: sectionSubtotal(section).toFixed(2), styles: { fontStyle: "bold" } },
            ]);
        });

        // -----------------------
        // Add empty rows to make totalEntryCount = 20
        // -----------------------
        const totalDesiredRows = 18;
        const emptyRowCount = Math.max(0, totalDesiredRows - totalEntryCount);
        for (let i = 0; i < emptyRowCount; i++) {
            body.push(["", "", "", "", "", "", ""]);
        }

        // -----------------------
        // Render Table
        // -----------------------
        autoTable(doc, {
            head: [
                [
                    { content: "Items", rowSpan: 2 },
                    { content: "Nos", rowSpan: 2 },
                    { content: "Measurement", colSpan: 3, styles: { halign: "center" } },
                    { content: "Quantity", rowSpan: 2 },
                    { content: "Total Qty", rowSpan: 2 },
                ],
                [
                    { content: "Length" },
                    { content: "Breadth" },
                    { content: "Depth" },
                ],
            ],
            body,
            startY: 70,
            theme: "grid",
            styles: {
                halign: "left",
                valign: "middle",
                fontSize: 10,
                lineColor: [0, 0, 0],
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

        // -----------------------
        // Save PDF
        // -----------------------
        doc.save(`${bill.companyName || "Bill"}_measurementsheet.pdf`);
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <input value={form.companyName} onChange={(e) => updateField({ companyName: e.target.value })} placeholder="Company Name" className="bg-gray-100 rounded-xl p-2 px-3" />
                    <input value={form.workName} onChange={(e) => updateField({ workName: e.target.value })} placeholder="Work Name" className="bg-gray-100 rounded-xl p-2 px-3" />
                    <input type="date" value={form.date} onChange={(e) => updateField({ date: e.target.value })} className="bg-gray-100 rounded-xl p-2 px-3" />
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
                                        <label className="px-2 text-xs font-bold">Width</label>
                                        <input type="number" value={entry.length} placeholder="Length" onChange={(e) => updateEntry(section.id, entry.id, { length: Number(e.target.value) })} className="bg-gray-100 rounded-xl p-2 px-3" />
                                    </div>
                                    <div className="flex  flex-col ">
                                        <label className="px-2 text-xs font-bold">Height</label>
                                        <input type="number" value={entry.breadth} placeholder="Breadth" onChange={(e) => updateEntry(section.id, entry.id, { breadth: Number(e.target.value) })} className="bg-gray-100 rounded-xl p-2 px-3" />
                                    </div>
                                    <div className="flex  flex-col ">
                                        <label className="px-2 text-xs font-bold">Depth</label>
                                        <input type="number" value={entry.depth} placeholder="Depth" onChange={(e) => updateEntry(section.id, entry.id, { depth: Number(e.target.value) })} className="bg-gray-100 rounded-xl p-2 px-3" />
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

export default BillForm;
