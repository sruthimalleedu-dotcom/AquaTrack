import { RotateCcw, Search } from "lucide-react";

export default function WaterBillFilterBar({

    buildingId,
    setBuildingId,

    commonAreaUsage,
    setCommonAreaUsage,

    billingCycleId,
    setBillingCycleId,

    

    status,
    setStatus,

    search,
    setSearch,

    buildings,
    billingCycles,

    onRefresh,
    onClear

}) {

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow border border-gray-200 dark:border-slate-700 p-5">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                {/* Building */}

                <div>

                    <label className="block text-sm font-medium mb-2">

                        Building

                    </label>

                    <select

                        value={buildingId}

                        onChange={(e) => setBuildingId(e.target.value)}

                        className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2"

                    >

                        <option value="">All Buildings</option>

                        {buildings.map((building) => (

                            <option

                                key={building.id}

                                value={building.id}

                            >

                                {building.buildingName}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Billing Cycle */}

                <div>

                    <label className="block text-sm font-medium mb-2">

                        Billing Cycle

                    </label>

                    <select

                        value={billingCycleId}

                        onChange={(e) => setBillingCycleId(e.target.value)}

                        className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2"

                    >

                        <option value="">All Cycles</option>

                        {billingCycles.map((cycle) => (

                            <option

                                key={cycle.id}

                                value={cycle.id}

                            >

                                {cycle.cycleName}

                            </option>

                        ))}

                    </select>

                </div>

                <div>

    <label className="block text-sm font-medium mb-2">
        Common Area Usage (KL)
    </label>

    <input
        type="number"
        min="0"
        step="0.01"
        value={commonAreaUsage}
        onChange={(e) => setCommonAreaUsage(e.target.value)}
        className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2"
    />

</div>

                {/* Status */}

                <div>

                    <label className="block text-sm font-medium mb-2">

                        Bill Status

                    </label>

                    <select

                        value={status}

                        onChange={(e) => setStatus(e.target.value)}

                        className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2"

                    >

                        <option value="">All</option>

                        <option value="PENDING">Pending</option>

                        <option value="PAID">Paid</option>

                        <option value="OVERDUE">Overdue</option>

                        <option value="CANCELLED">Cancelled</option>

                    </select>

                </div>

                {/* Search */}

                <div>

                    <label className="block text-sm font-medium mb-2">

                        Invoice

                    </label>

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-2.5 text-gray-400"
                        />

                        <input

                            type="text"

                            placeholder="Invoice Number"

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-10 pr-3 py-2"

                        />

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex items-end gap-2">

                    <button

                        onClick={onRefresh}

                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 font-medium transition"

                    >

                        Refresh

                    </button>

                    <button

                        onClick={onClear}

                        className="p-2.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 transition"

                    >

                        <RotateCcw size={18} />

                    </button>

                </div>

            </div>

        </div>

    );

}