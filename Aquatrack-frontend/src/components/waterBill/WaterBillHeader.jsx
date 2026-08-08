import { ReceiptIndianRupee, Plus } from "lucide-react";

export default function WaterBillHeader({

    onGenerate,
    generating

}) {

    return (

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Left */}

            <div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">

                    Water Bills

                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">

                    Generate, manage and monitor household water bills.

                </p>

            </div>

            {/* Right */}

            <button

                onClick={onGenerate}

                disabled={generating}

                className="
                    inline-flex
                    items-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    disabled:bg-gray-400
                    disabled:cursor-not-allowed
                    text-white
                    font-medium
                    transition-all
                    shadow-sm
                "

            >

                <Plus size={18} />

                {

                    generating

                        ? "Generating..."

                        : "Generate Bills"

                }

            </button>

        </div>

    );

}