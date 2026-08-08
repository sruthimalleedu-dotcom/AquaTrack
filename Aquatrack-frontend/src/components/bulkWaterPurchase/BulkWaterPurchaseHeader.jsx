import { Plus } from "lucide-react";

const BulkWaterPurchaseHeader = ({
    onCreate
}) => {

    return (

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

                <h1 className="text-2xl font-bold text-gray-900">
                    Bulk Water Purchases
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Manage bulk water purchases, suppliers, invoices, and water procurement costs.
                </p>

            </div>

            <button
                onClick={onCreate}
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-blue-600
                    px-4
                    py-2
                    text-white
                    hover:bg-blue-700
                    transition
                "
            >

                <Plus size={18} />

                Add Purchase

            </button>

        </div>

    );

};

export default BulkWaterPurchaseHeader;