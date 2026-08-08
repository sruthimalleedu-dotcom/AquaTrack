import { Plus } from "lucide-react";

const WaterUsageHeader = ({
    onAdd
}) => {

    return (

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

                <h1 className="text-2xl font-bold text-gray-900">
                    Water Usage
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Monitor and manage household water meter readings.
                </p>

            </div>

            <button
                onClick={onAdd}
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

                Add Reading

            </button>

        </div>

    );

};

export default WaterUsageHeader;