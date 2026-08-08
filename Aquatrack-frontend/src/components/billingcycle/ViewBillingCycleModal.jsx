export default function ViewBillingCycleModal({

    isOpen,

    onClose,

    billingCycle

}) {

    if (!isOpen || !billingCycle) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">

                        Billing Cycle Details

                    </h2>

                    <button

                        onClick={onClose}

                        className="text-2xl text-gray-500 hover:text-black"

                    >

                        ×

                    </button>

                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Cycle Name */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Cycle Name

                        </p>

                        <p className="font-semibold">

                            {billingCycle.cycleName}

                        </p>

                    </div>

                    {/* Building */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Building

                        </p>

                        <p className="font-semibold">

                            {billingCycle.buildingName}

                        </p>

                    </div>

                    {/* Start Date */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Start Date

                        </p>

                        <p className="font-semibold">

                            {billingCycle.startDate}

                        </p>

                    </div>

                    {/* End Date */}

                    <div>

                        <p className="text-sm text-gray-500">

                            End Date

                        </p>

                        <p className="font-semibold">

                            {billingCycle.endDate}

                        </p>

                    </div>

                    {/* Due Date */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Due Date

                        </p>

                        <p className="font-semibold">

                            {billingCycle.dueDate}

                        </p>

                    </div>

                    {/* Status */}

                    <div>

                        <p className="text-sm text-gray-500">

                            Billing Status

                        </p>

                        <span

                            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold

                            ${billingCycle.billingStatus === "OPEN"

                                ? "bg-green-100 text-green-700"

                                : "bg-gray-200 text-gray-700"

                            }`}

                        >

                            {billingCycle.billingStatus}

                        </span>

                    </div>

                    {/* Created At */}

                    {billingCycle.createdAt && (

                        <div>

                            <p className="text-sm text-gray-500">

                                Created At

                            </p>

                            <p className="font-semibold">

                                {billingCycle.createdAt}

                            </p>

                        </div>

                    )}

                    {/* Updated At */}

                    {billingCycle.updatedAt && (

                        <div>

                            <p className="text-sm text-gray-500">

                                Last Updated

                            </p>

                            <p className="font-semibold">

                                {billingCycle.updatedAt}

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