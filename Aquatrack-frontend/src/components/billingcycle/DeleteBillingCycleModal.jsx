export default function DeleteBillingCycleModal({

    isOpen,

    onClose,

    billingCycle,

    onConfirm

}) {

    if (!isOpen || !billingCycle) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                <h2 className="text-xl font-bold text-red-600">

                    Delete Billing Cycle

                </h2>

                <p className="mt-4 text-gray-600">

                    Are you sure you want to delete

                    <span className="font-semibold">

                        {" "}{billingCycle.cycleName}

                    </span>

                    ?

                </p>

                <p className="mt-2 text-sm text-red-500">

                    This action cannot be undone.

                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-gray-300 px-5 py-2.5 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onConfirm(billingCycle)}
                        className="rounded-xl bg-red-600 px-5 py-2.5 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}