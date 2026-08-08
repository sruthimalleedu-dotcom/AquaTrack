import { useEffect, useState } from "react";

export default function WaterBillStatusDialog({

    open,
    onOpenChange,
    bill,
    onSave

}) {

    const [status, setStatus] = useState("");

    useEffect(() => {

        if (bill) {

            setStatus(bill.billStatus);

        }

    }, [bill]);

    if (!open || !bill) return null;

    const handleSave = () => {

        if (!bill.billId) {

            console.error("Bill ID is missing.", bill);

            alert("Unable to update bill status.");

            return;

        }

        onSave({

            billId: bill.billId,

            billStatus: status

        });

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">

                        Update Water Bill Status

                    </h2>

                    <button

                        onClick={() => onOpenChange(false)}

                        className="text-2xl font-bold hover:text-red-500"

                    >

                        ×

                    </button>

                </div>

                {/* Body */}

                <div className="space-y-5 p-6">

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Invoice Number

                        </label>

                        <input

                            type="text"

                            value={bill.invoiceNumber}

                            disabled

                            className="w-full rounded-lg border bg-gray-100 px-3 py-2 dark:bg-slate-800 dark:border-slate-700"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Current Status

                        </label>

                        <select

                            value={status}

                            onChange={(e) => setStatus(e.target.value)}

                            className="w-full rounded-lg border px-3 py-2 dark:bg-slate-800 dark:border-slate-700"

                        >

                            <option value="PENDING">
                                Pending
                            </option>

                            <option value="PAID">
                                Paid
                            </option>

                            <option value="OVERDUE">
                                Overdue
                            </option>

                            <option value="CANCELLED">
                                Cancelled
                            </option>

                        </select>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t px-6 py-4">

                    <button

                        onClick={() => onOpenChange(false)}

                        className="rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleSave}

                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"

                    >

                        Update Status

                    </button>

                </div>

            </div>

        </div>

    );

}