import { Plus } from "lucide-react";

export default function ManagerHeader({

    onCreate,

}) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
            "
        >

            {/* ======================================
                Page Title
            ====================================== */}

            <div>

                <h1 className="text-3xl font-bold text-slate-800">

                    Managers

                </h1>

                <p className="mt-2 text-slate-500">

                    Invite and manage apartment managers.

                </p>

            </div>

            {/* ======================================
                Create Button
            ====================================== */}

            <button
                onClick={onCreate}
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-6
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-blue-700
                "
            >

                <Plus size={20} />

                Invite Manager

            </button>

        </div>

    );

}