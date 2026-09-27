import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "lucide-react";
import {
    IconChevronRight,
    IconInfoCircleFilled,
    IconPlus,
} from "@tabler/icons-react";

interface BillItem {
    srNo: number;
    description: string;
    amount: number;
}

interface InvoiceProps {
    bill?: {
        id?: string;
        billNo: string;
        date: string;
        companyName: string;
        customerAddress: string;
        gstno: string;
        items: BillItem[];
        amountWords: string;
    };
    onSave: (bill: any) => void;
    onClose: () => void;
}

const InvoiceGenerator: React.FC<InvoiceProps> = ({ bill: initialBill, onSave, onClose }) => {
    // ===== Local State =====
    const [bill, setBill] = useState(
        initialBill || {
            billNo: "",
            date: new Date().toISOString().split("T")[0],
            companyName: "",
            customerAddress: "",
            gstno: "",
            items: [{ srNo: 1, description: "", amount: 0 }] as BillItem[],
            amountWords: "",
        }
    );

    // ===== Handlers =====
    const handleBillChange = (key: keyof typeof bill, value: any) => {
        setBill((prev) => ({ ...prev, [key]: value }));
    };

    const handleItemChange = (
        index: number,
        key: keyof BillItem,
        value: string | number
    ) => {
        const updatedItems = [...bill.items];
        (updatedItems[index] as any)[key] = value;
        setBill((prev) => ({ ...prev, items: updatedItems }));
    };

    const addItem = () => {
        const newItem: BillItem = {
            srNo: bill.items.length + 1,
            description: "",
            amount: 0,
        };
        setBill((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    };

    const removeItem = (index: number) => {
        const updated = bill.items.filter((_, i) => i !== index);
        setBill((prev) => ({
            ...prev,
            items: updated.map((item, i) => ({ ...item, srNo: i + 1 })),
        }));
    };

    // ===== Totals =====
    const calculateTotals = () => { const total = bill.items.reduce((sum, item) => sum + Number(item.amount || 0), 0); const cgst = total * 0.09; const sgst = total * 0.09; const grandTotal = total + cgst + sgst; return { total, cgst, sgst, grandTotal }; };

    // const { total, cgst, sgst, grandTotal } = calculateTotals();

    // ===== PDF GENERATOR =====
    const generatePDF = () => {
        const { total, cgst, sgst, grandTotal } = calculateTotals();
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const marginTop = 10;
        const marginBottom = 20;

        // Convert date to dd-mm-yyyy
        const formatDate = (dateString) => {
            const d = new Date(dateString);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const invoiceDate = formatDate(bill.date);

        // -----------------------
        // HEADER
        // -----------------------
        doc.setFont("helvetica", "bold");
        doc.setFontSize(26);
        doc.text("Madhav Construction", 105, 15, { align: "center" });

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Regd. Office :- M.B Farm, A/12, satyam CO-OP HSG Society", 105, 20, { align: "center" });
        doc.text("NR. Mahakali Motors, JashodaNagar", 105, 25, { align: "center" });
        doc.text("Ahmedabad, Gujarat-382345", 105, 30, { align: "center" });
        doc.text("Mobile: +91 94279 62678", 105, 35, { align: "center" });

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("GST No: 24BFMPK5165G1ZC, PAN No: BFMPK5165G", 105, 42, { align: "center" });
        doc.line(14, 50, 194, 50);

        // -----------------------
        // TITLE
        // -----------------------
        doc.setFontSize(18);
        doc.text("Service Invoice", 105, 60, { align: "center" });
        const textWidth = doc.getTextWidth("Service Invoice");
        doc.line(105 - textWidth / 2, 61, 105 + textWidth / 2, 61);

        // -----------------------
        // BILL INFO
        // -----------------------
        doc.setFontSize(10);
        doc.text(`Bill No: ${bill.billNo}`, 14, 70);
        doc.text(`Date: ${invoiceDate}`, 166, 70);
        doc.text("To,", 14, 80);
        doc.text(bill.companyName, 14, 85);

        // Customer Address
        autoTable(doc, {
            startY: 87,
            body: [[{ content: bill.customerAddress || "" }]],
            theme: "plain",
            styles: { fontSize: 10, textColor: 0, cellPadding: 0 },
            columnStyles: { 0: { cellWidth: 90 } },
        });

        doc.text(`GST No: ${bill.gstno || ""}`, 14, doc.lastAutoTable.finalY + 3);

        // -----------------------
        // ITEMS TABLE (DYNAMIC HEIGHT, MULTI-PAGE SAFE)
        // -----------------------
        const itemBody = bill.items.map(item => [
            { content: item.srNo.toString(), styles: { halign: "center" } },
            { content: item.description },
            { content: item.amount.toFixed(2), styles: { halign: "right" } }
        ]);

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 8,
            head: [["Sr. No.", "Particulars", "Amount (In INR)"]],
            body: itemBody,
            theme: "grid",
            pageBreak: "auto",
            headStyles: { fillColor: [255, 179, 0], textColor: 0, lineColor: [0, 0, 0], fontStyle: "bold", halign: "center" },
            styles: { fontSize: 10, textColor: 0, lineColor: [0, 0, 0], cellPadding: 2, overflow: "linebreak" },
            columnStyles: {
                0: { cellWidth: 15, halign: "center" },
                1: { cellWidth: 115 },
                2: { cellWidth: 50, halign: "right" },
            },
        });

        let y = doc.lastAutoTable.finalY;

        // If too close to bottom → New Page
        if (y > pageHeight - marginBottom - 50) {
            doc.addPage();
            y = marginTop;
        }

        // -----------------------
        // SUMMARY TABLE
        // -----------------------
        autoTable(doc, {
            startY: y,
            body: [
                ["", "Total:-", total.toFixed(2)],
                ["", "Add: CGST @ 9%", cgst.toFixed(2)],
                ["", "Add: SGST @ 9%", sgst.toFixed(2)],
                ["", "Grand Total:-", grandTotal.toFixed(2)],
            ],
            theme: "grid",
            styles: { fontSize: 10, fontStyle: "bold", textColor: 0, lineColor: 0 },
            columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 115, halign: "right" },
                2: { cellWidth: 50, halign: "right" },
            },
        });

        y = doc.lastAutoTable.finalY;

        // -----------------------
        // AMOUNT IN WORDS
        // -----------------------
        autoTable(doc, {
            startY: y,
            body: [[`Amount in Words:- ${bill.amountWords || ""}`]],
            theme: "grid",
            styles: { textColor: 0, lineColor: [0, 0, 0], fontSize: 10, halign: "center", fontStyle: "bold" },
            columnStyles: { 0: { cellWidth: 180 } }
        });

        y = doc.lastAutoTable.finalY + 10;

        // -----------------------
        // SIGNATURE BLOCK
        // -----------------------
        if (y > pageHeight - 40) {
            doc.addPage();
            y = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.text("For, Madhav Construction", 14, y);

        doc.setFont("helvetica", "normal");
        doc.text("Proprietor", 14, y + 14);
        doc.text("Place: Ahmedabad", 14, y + 24);
        doc.text(`Date: ${invoiceDate}`, 14, y + 29);
        doc.text("PAN No.: BFMPK5165G", 14, y + 34);

        doc.save(`${bill.companyName}_invoice.pdf`);
    };

    const { total, cgst, sgst, grandTotal } = calculateTotals();
    // ===== Save Handler =====
    const handleSave = () => {
        if (!bill.companyName || bill.items.length === 0) {
            alert("Please fill all required fields before saving.");
            return;
        }
        onSave(bill);
    };

    // ===== UI =====
    return (
        <div className="fixed inset-0 p-3 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col bg-white rounded-3xl p-6 pt-0 w-full h-full overflow-y-scroll no-scrollbar">
                {/* Header */}
                <div className="flex flex-col mb-4 pb-1 pt-6 sticky top-0 bg-white z-10">
                    <div className="flex flex-row text-xl text-gray-950 items-center font-medium justify-between w-full">
                        <label className="flex flex-row items-center">
                            <span className="font-extrabold pl-1">
                                {bill.id ? "Edit Invoice" : "Create New Invoice"}
                            </span>
                            <IconChevronRight stroke={5} size={20} />
                        </label>
                        <IconInfoCircleFilled size={18} />
                    </div>
                    <label className="text-xs font-semibold text-gray-400">
                        You can edit, save or download this invoice.
                    </label>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div>
                        <label className="text-md font-semibold pl-2">Bill No.</label>
                        <input
                            type="text"
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.billNo}
                            onChange={(e) => handleBillChange("billNo", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-md font-semibold pl-2">Date</label>
                        <input
                            type="date"
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.date}
                            onChange={(e) => handleBillChange("date", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-md font-semibold pl-2">Company</label>
                        <input
                            type="text"
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.companyName}
                            onChange={(e) => handleBillChange("companyName", e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-md font-semibold pl-2">Address</label>
                        <textarea
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.customerAddress}
                            onChange={(e) =>
                                handleBillChange("customerAddress", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label className="text-md font-semibold pl-2">GST No.</label>
                        <input

                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.gstno}
                            onChange={(e) => handleBillChange("gstno", e.target.value)}
                        />
                    </div>
                </div>

                {/* Items Table */}
                <h3 className="font-semibold text-lg mt-4 mb-2">Items</h3>
                <table className="w-full border border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-1">Sr.No</th>
                            <th className="border px-2 py-1">Description</th>
                            <th className="border px-2 py-1">Amount</th>
                            <th className="border px-2 py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bill.items.map((item, index) => (
                            <tr key={index}>
                                <td className="border text-center px-2 py-1">{item.srNo}</td>
                                <td className="border px-2 py-1">
                                    <textarea
                                        className="bg-gray-100 w-full rounded-xl p-2"
                                        value={item.description}
                                        onChange={(e) =>
                                            handleItemChange(index, "description", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="border px-2 py-1">
                                    <input
                                        type="number"
                                        className="bg-gray-100 w-full rounded-xl p-2"
                                        value={item.amount}
                                        onChange={(e) =>
                                            handleItemChange(index, "amount", Number(e.target.value))
                                        }
                                    />
                                </td>
                                <td className="border text-center px-2 py-1">
                                    <button
                                        onClick={() => removeItem(index)}
                                        className="text-red-600 font-bold hover:underline"
                                    >
                                        ✖
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button
                    onClick={addItem}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-xl flex items-center gap-1"
                >
                    <IconPlus size={15} /> Add Row
                </button>

                {/* Totals */}
                <div className="mt-6 text-right space-y-1 font-semibold">
                    <p>Total: ₹{total.toFixed(2)}</p>
                    <p>CGST (9%): ₹{cgst.toFixed(2)}</p>
                    <p>SGST (9%): ₹{sgst.toFixed(2)}</p>
                    <p className="font-bold text-lg">Grand Total: ₹{grandTotal.toFixed(2)}</p>
                </div>

                {/* Amount in Words */}
                <div className="flex flex-col mt-4">
                    <label className="text-md font-semibold pl-2">Amount in Words</label>
                    <input
                        type="text"
                        className="bg-gray-100 rounded-xl p-3 w-full"
                        value={bill.amountWords}
                        onChange={(e) => handleBillChange("amountWords", e.target.value)}
                    />
                </div>

                {/* Footer buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={generatePDF}
                        className="bg-yellow-500 text-white rounded-xl p-2.5 px-5 font-bold flex items-center gap-2"
                    >
                        <Download size={18} /> Download
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-950 text-white rounded-xl p-2.5 px-5 font-bold"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-700 text-white rounded-xl p-2.5 px-5 font-bold"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceGenerator;
