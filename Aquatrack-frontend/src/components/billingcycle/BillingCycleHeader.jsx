import { CalendarDays, Plus } from "lucide-react";

export default function BillingCycleHeader({

    onCreate

}) {

    return (

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

                <h1 className="text-3xl font-bold text-gray-900">

                    Billing Cycles

                </h1>

                <p className="mt-1 text-gray-500">

                    Create, manage and monitor billing cycles for your buildings.

                </p>

            </div>

            <button

                onClick={onCreate}

                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-medium shadow-sm transition hover:bg-blue-700"

            >

                <Plus size={18} />

                Create Billing Cycle

            </button>

        </div>

    );

}