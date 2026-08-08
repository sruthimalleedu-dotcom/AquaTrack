export default function ViewPurchaseModal({

    isOpen,

    onClose,

    purchase

}) {

    if (!isOpen || !purchase) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">

                        Bulk Water Purchase Details

                    </h2>

                    <button

                        onClick={onClose}

                        className="text-2xl text-gray-500 hover:text-black"

                    >

                        ×

                    </button>

                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Building */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Building

                        </p>

                        <p className="font-semibold">

                            {purchase.buildingName}

                        </p>

                    </div>

                    {/* Billing Cycle */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Billing Cycle

                        </p>

                        <p className="font-semibold">

                            {purchase.billingCycleName}

                        </p>

                    </div>

                    {/* Purchase Date */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Purchase Date

                        </p>

                        <p className="font-semibold">

                            {purchase.purchaseDate}

                        </p>

                    </div>

                    {/* Water Source */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Water Source

                        </p>

                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                            {purchase.source}

                        </span>

                    </div>

                    {/* Volume */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Volume (KL)

                        </p>

                        <p className="font-semibold">

                            {purchase.volumeKL}

                        </p>

                    </div>

                    {/* Unit Cost */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Unit Cost

                        </p>

                        <p className="font-semibold">

                            ₹ {purchase.unitCost}

                        </p>

                    </div>

                    {/* Total Cost */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Total Cost

                        </p>

                        <p className="font-semibold text-green-700">

                            ₹ {purchase.totalCost}

                        </p>

                    </div>

                    {/* Supplier */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Supplier Name

                        </p>

                        <p className="font-semibold">

                            {purchase.supplierName}

                        </p>

                    </div>

                    {/* Invoice */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Invoice Number

                        </p>

                        <p className="font-semibold">

                            {purchase.invoiceNumber || "-"}

                        </p>

                    </div>

                    {/* Remarks */}

                    <div className="md:col-span-2">

                        <p className="text-sm text-gray-500">

                            Remarks

                        </p>

                        <p className="font-semibold whitespace-pre-wrap">

                            {purchase.remarks || "-"}

                        </p>

                    </div>

                    {/* Created At */}

                    {purchase.createdAt && (

                        <div>

                            <p className="text-sm text-gray-500">

                                Created At

                            </p>

                            <p className="font-semibold">

                                {purchase.createdAt}

                            </p>

                        </div>

                    )}

                    {/* Updated At */}

                    {purchase.updatedAt && (

                        <div>

                            <p className="text-sm text-gray-500">

                                Last Updated

                            </p>

                            <p className="font-semibold">

                                {purchase.updatedAt}

                            </p>

                        </div>

                    )}

                </div>

                <div className="mt-8 flex justify-end">

                    <button

                        onClick={onClose}

                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700"

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}