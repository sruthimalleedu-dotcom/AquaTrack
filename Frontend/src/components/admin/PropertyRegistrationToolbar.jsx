import { Search, RotateCw } from "lucide-react";

export default function PropertyRegistrationToolbar({

    searchTerm,
    onSearchChange,

    statusFilter,
    onStatusChange,

    onRefresh,

}) {

    return (

        <div
            className="
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm

                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >

            {/* ======================================
                Search
            ====================================== */}

            <div className="relative w-full lg:max-w-md">

                <Search
                    size={18}
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                />

                <input
                    type="text"
                    placeholder="Search company, contact or email..."
                    value={searchTerm}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        py-3
                        pl-11
                        pr-4
                        outline-none
                        transition

                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                    "
                />

            </div>

            {/* ======================================
                Right Section
            ====================================== */}

            <div className="flex gap-3">

                {/* Status */}

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        onStatusChange(e.target.value)
                    }
                    className="
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none

                        focus:border-blue-500
                    "
                >

                    <option value="ALL">

                        All Status

                    </option>

                    <option value="PENDING">

                        Pending

                    </option>

                    <option value="APPROVED">

                        Approved

                    </option>

                    <option value="REJECTED">

                        Rejected

                    </option>

                </select>

                {/* Refresh */}

                <button
                    onClick={onRefresh}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-3
                        text-white

                        transition

                        hover:bg-blue-700
                    "
                >

                    <RotateCw size={18} />

                    Refresh

                </button>

            </div>

        </div>

    );

}