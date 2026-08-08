import { Plus, Building } from "lucide-react";

export default function BuildingHeader({

    onCreate,

    disabled,

}) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
            "
        >

            <div>

                <h1 className="text-3xl font-bold text-slate-800">

                    Buildings

                </h1>

                <p className="mt-2 text-slate-500">

                    Manage buildings inside the selected apartment.

                </p>

            </div>

            <button

    onClick={onCreate}

    disabled={disabled}

    className={`
        flex
        items-center
        gap-2
        rounded-xl
        px-5
        py-3
        font-medium
        text-white
        transition

        ${
            disabled
                ? "cursor-not-allowed bg-slate-400"
                : "bg-blue-600 hover:bg-blue-700"
        }
    `}
>
    <Plus size={18} />

                Create Buildings
</button>

    

        </div>

    );

}