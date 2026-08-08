export default function WaterBillViewDialog({

    open,
    onOpenChange,
    bill

}) {

    if (!open || !bill) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-3xl rounded-xl bg-white dark:bg-slate-900 shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">

                        Water Bill Details

                    </h2>

                    <button

                        onClick={() => onOpenChange(false)}

                        className="text-2xl font-bold hover:text-red-500"

                    >

                        ×

                    </button>

                </div>

                {/* Body */}

                <div className="grid grid-cols-2 gap-6 p-6">

                    <Info
                        label="Invoice"
                        value={bill.invoiceNumber}
                    />

                    <Info
                        label="Status"
                        value={bill.billStatus}
                    />

                    <Info
                        label="Household"
                        value={bill.householdNumber || "-"}
                    />

                    <Info
                        label="Resident"
                        value={bill.residentName || "-"}
                    />

                    <Info
                        label="Consumption"
                        value={`${bill.consumptionKL ?? 0} KL`}
                    />

                    <Info
                        label="Usage Percentage"
                        value={`${bill.usagePercentage ?? 0}%`}
                    />

                    <Info
                        label="Shared Water Cost"
                        value={`₹ ${Number(
                            bill.sharedWaterCost ?? 0
                        ).toFixed(2)}`}
                    />

                    <Info
                        label="Tariff Charge"
                        value={`₹ ${Number(
                            bill.tariffCharge ?? 0
                        ).toFixed(2)}`}
                    />

                    <Info
                        label="Adjustment"
                        value={`₹ ${Number(
                            bill.adjustmentAmount ?? 0
                        ).toFixed(2)}`}
                    />

                    <Info
                        label="Total Amount"
                        value={`₹ ${Number(
                            bill.totalAmount ?? 0
                        ).toFixed(2)}`}
                    />

                    <Info
                        label="Generated Date"
                        value={bill.generatedDate}
                    />

                    <Info
                        label="Due Date"
                        value={bill.dueDate}
                    />

                </div>

                {/* Footer */}

                <div className="flex justify-end border-t px-6 py-4">

                    <button

                        onClick={() => onOpenChange(false)}

                        className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

function Info({ label, value }) {

    return (

        <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">

                {label}

            </p>

            <p className="mt-1 text-base font-semibold">

                {value}

            </p>

        </div>

    );

}