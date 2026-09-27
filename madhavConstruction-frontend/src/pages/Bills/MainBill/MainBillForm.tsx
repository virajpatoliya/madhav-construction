import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "lucide-react";
import {
    IconChevronRight,
    IconInfoCircleFilled,
    IconPlus,
} from "@tabler/icons-react";

export interface Item {
    description: string;
    size?: string;
    rate?: number;
    amount?: number;
}

export interface MainBill {
    bill?: {
        id?: string;
        billHeadingName?: string;
        panNo?: string;
        companyName?: string;
        input1?: string;
        input2?: string;
        input3?: string;
        billNo?: string;
        date: string;
        items: Item[];
        amountWords?: string;
        input4?: string;
    }
    onSave: (bill: any) => void;
    onClose: () => void;
}

const MainBillGenerator: React.FC<MainBill> = ({ bill: initialBill, onSave, onClose }) => {
    // ===== Local State =====
    const [bill, setBill] = useState(
        initialBill || {
            billHeadingName: "",
            panNo: "",
            billNo: "",
            date: new Date().toISOString().split("T")[0],
            companyName: "",
            input1: "",
            input2: "",
            input3: "",
            input4: "",
            items: [{ description: "", size: "", rate: 0, amount: 0 }] as Item[],
            amountWords: "",
        }
    );

    // ===== Handlers =====
    const handleBillChange = (key: keyof typeof bill, value: any) => {
        setBill((prev) => ({ ...prev, [key]: value }));
    };

    const handleItemChange = (
        index: number,
        key: keyof Item,
        value: string | number
    ) => {
        const updatedItems = [...bill.items];
        (updatedItems[index] as any)[key] = value;

        // ✅ Automatically calculate amount if rate or size changes
        if (key === "rate" || key === "size") {
            const rate = Number(updatedItems[index].rate) || 0;
            const size = Number(updatedItems[index].size) || 0;
            updatedItems[index].amount = rate * size;
        }

        setBill((prev) => ({ ...prev, items: updatedItems }));
    };


    const addItem = () => {
        const newItem: Item = {
            description: "",
            size: "",
            rate: 0,
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

    const calculateTotals = () => {
        const total = bill.items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        return total.toFixed(2);
    };

    const generateMainBillPDF = () => {
        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        const formatDate = (dateString) => {
            const d = new Date(dateString);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const invoiceDate = formatDate(bill.date);
        // === HEADER ===
        doc.setTextColor(255, 0, 0);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");

        doc.addImage("images/1.jpeg", "JPEG", 14, 8, 20, 3); // (x, y, width, height)
        doc.addImage("images/2.png", "PNG", pageWidth / 2, 8, 12, 3); // (x, y, width, height)
        doc.addImage("images/3.jpeg", "JPEG", 176, 8, 20, 3); // (x, y, width, height)
        // doc.text(" || શ્રી ૧ ||", pageWidth / 2, 12, { align: "center" });
        doc.text("Subject to Ahmedabad Jurisdiction", pageWidth / 2, 17, { align: "center" });

        doc.setFont("helvetica", "bold");

        doc.setFontSize(20);
        doc.text(`${bill.billHeadingName}`, pageWidth / 2, 25, { align: "center" });

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(
            "A/12 Satyam Park Soc., Nr. M.B. Patel Farm, Jashoda Nagar, Ahmedabad. M. 9427962678",
            pageWidth / 2,
            30,
            { align: "center" }
        );
        doc.setTextColor(0, 0, 0);
        // === BILL INFO BOX ===
        doc.setFontSize(10);
        doc.setDrawColor(255, 0, 0);
        doc.rect(14, 37, 120, 8); // Outer box
        doc.text(`Name: ${bill.companyName || ""}`, 16, 42);
        doc.text(`${bill.input1 || ""}`, 16, 50);
        doc.text(`${bill.input2 || ""}`, 16, 58);
        doc.text(`${bill.input3 || ""}`, 16, 66);

        doc.rect(14, 45, 120, 8); // Outer box
        doc.rect(14, 53, 120, 8); // Outer box
        doc.rect(14, 61, 120, 8); // Outer box


        doc.rect(134, 37, 60, 16); // Outer box
        doc.text(`Bill No: ${bill.billNo || ""}`, 136, 42);

        doc.rect(134, 53, 60, 8); // Outer box
        // Second row (date + PAN)
        doc.text(`Date: ${invoiceDate || ""}`, 136, 58);

        doc.rect(134, 61, 60, 8); // Outer box
        doc.text(`PAN No.:${bill.panNo}`, 136, 66);

        // === TABLE === 
        const tableBody = bill.items.map((item, i) => [
            i + 1,
            item.description,
            item.size || "",
            item.rate?.toFixed(2) || "",
            item.amount?.toFixed(2) || "",
        ]);

        // 🧾 Add extra rows so total = at least 10 more than existing or fixed count (like 15 total)
        const totalRows = Math.max(20, tableBody.length + 15); // ensures minimum 15 rows
        while (tableBody.length < totalRows) {
            tableBody.push(["", "", "", "", ""]);
        }

        autoTable(doc, {
            startY: 69,
            head: [["NO.", "DESCRIPTION", "SIZE", "RATE", "AMOUNT"]],
            body: tableBody,
            styles: {
                fontSize: 10,
                lineWidth: 0.1,
                textColor: [0, 0, 0],
                halign: "center",
                valign: "middle",
                lineColor: [255, 0, 0], // red borders
            },
            columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 80, halign: "left" },
                2: { cellWidth: 25 },
                3: { cellWidth: 25 },
                4: { cellWidth: 35, halign: "right" },
            },
            headStyles: {
                fillColor: [255, 0, 0],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            theme: "grid",
        });


        const finalY = doc.lastAutoTable.finalY || 58;

        // === FOOTER ===
        const total = bill.items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

        // RUPEES LINE
        doc.rect(14, finalY, 120, 8); // rupees box
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 0, 0);
        doc.text(`Rupees: ${bill.amountWords || ""}`, 16, finalY + 5);

        // TOTAL LINE

        doc.rect(134, finalY, 25, 8); // total box
        doc.setFont("helvetica", "bold");
        doc.text(`Total`, 143, finalY + 5,);

        doc.rect(159, finalY, 35, 8); // total box
        doc.setTextColor(255, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(`${calculateTotals()}`, 175, finalY + 5, { align: "center" });

        doc.rect(14, finalY + 8, 120, 20);
        doc.setTextColor(0, 0, 0);
        // Footer notes
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(255, 0, 0);
        doc.text(
            [
                "(1) Interest will be charged on accounts remaining unpaid 30 days from the date of this bill.",
                "(2) Our risk & responsibility ceases on delivery of goods.",
                "(3) Payment by cheque is requested."
            ],
            16,
            finalY + 15
        );

        doc.rect(134, finalY + 8, 60, 20);
        // Signature
        doc.setTextColor(0);
        doc.setFontSize(8);
        doc.text(`For, ${bill.billHeadingName}`, 140, finalY + 15);
        doc.setFontSize(10);

        doc.setFont("helvetica", "bold");
        doc.text(`${bill.input4}`, 140, finalY + 20);
        // === SAVE FILE ===
        doc.save(`${bill.companyName}_mainbill.pdf`);
    };;
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
                                {bill.id ? "Edit Main bill" : "Create New Main bill"}
                            </span>
                            <IconChevronRight stroke={5} size={20} />
                        </label>
                        <IconInfoCircleFilled size={18} />
                    </div>
                    <label className="text-xs font-semibold text-gray-400">
                        You can edit, save or download this main bill.
                    </label>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                    <div>
                        <label className="text-md font-semibold pl-2">Bill Heading Name</label>
                        <input
                            type="text"
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.billHeadingName}
                            onChange={(e) => handleBillChange("billHeadingName", e.target.value)}
                        />
                    </div>


                    <div>
                        <label className="text-md font-semibold pl-2">Pan No.</label>
                        <input
                            type="text"
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.panNo}
                            onChange={(e) => handleBillChange("panNo", e.target.value)}
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
                        <label className="text-md font-semibold pl-2">Input Data 1</label>
                        <textarea
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.input1}
                            onChange={(e) =>
                                handleBillChange("input1", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-md font-semibold pl-2">Input Data 2</label>
                        <textarea
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.input2}
                            onChange={(e) =>
                                handleBillChange("input2", e.target.value)
                            }
                        />
                    </div> <div className="md:col-span-2">
                        <label className="text-md font-semibold pl-2">Input Data 3</label>
                        <textarea
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.input3}
                            onChange={(e) =>
                                handleBillChange("input3", e.target.value)
                            }
                        />
                    </div> <div className="md:col-span-2">
                        <label className="text-md font-semibold pl-2">Input Data 4</label>
                        <textarea
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.input4}
                            onChange={(e) =>
                                handleBillChange("input4", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-md font-semibold pl-2">Bill No.</label>
                        <input
                            type="text"
                            className="bg-gray-100 rounded-xl p-3 w-full"
                            value={bill.billNo}
                            onChange={(e) =>
                                handleBillChange("billNo", e.target.value)
                            }
                        />
                    </div>
                </div>

                {/* Items Table */}
                <h3 className="font-semibold text-lg mt-4 mb-2">Items</h3>

                {/* Table container */}

                {/* <div className="overflow-hidden border border-gray-300 rounded-lg"> */}
                <table className="min-w-[700px] table-auto text-sm mb-3">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1 whitespace-nowrap">Description</th>
                            <th className="border px-2 py-1 whitespace-nowrap">Size</th>
                            <th className="border px-2 py-1 whitespace-nowrap">Rate</th>
                            <th className="border px-2 py-1 whitespace-nowrap">Amount</th>
                            <th className="border px-2 py-1 whitespace-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bill.items.length > 0 ? (
                            bill.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="border px-2 py-1 align-top">
                                        <textarea
                                            className="bg-gray-100 w-full min-w-[120px] rounded-xl p-2"
                                            value={item.description}
                                            onChange={(e) =>
                                                handleItemChange(index, "description", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="border px-2 py-1 align-top">
                                        <textarea
                                            className="bg-gray-100 w-full min-w-[80px] rounded-xl p-2"
                                            value={item.size}
                                            onChange={(e) =>
                                                handleItemChange(index, "size", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="border px-2 py-1 align-top">
                                        <input
                                            type="number"
                                            className="bg-gray-100 w-full min-w-[80px] rounded-xl p-2"
                                            value={item.rate}
                                            onChange={(e) =>
                                                handleItemChange(index, "rate", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="border px-2 py-1 align-top">
                                        <input
                                            type="number"
                                            className="bg-gray-100 w-full min-w-[80px] rounded-xl p-2"
                                            value={item.amount}
                                            readOnly
                                        />
                                    </td>
                                    <td className="border text-center px-2 py-1 align-top">
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="text-red-600 font-bold hover:underline"
                                        >
                                            ✖
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    No items added yet
                                </td>
                            </tr>
                        )}
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
                    <p>Total: ₹{calculateTotals()}</p>
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
                        onClick={generateMainBillPDF}
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

export default MainBillGenerator;
