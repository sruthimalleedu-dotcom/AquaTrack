import { Search } from "lucide-react";

export default function BulkWaterPurchaseFilterBar({

    search = "",
    setSearch = () => {},

    buildingId = "",
    setBuildingId = () => {},
    buildings = [],

    source = "",
    setSource = () => {}

}) {

    return (

        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-6 shadow md:grid-cols-3">

            {/* ========================================== */}
            {/* Search */}
            {/* ========================================== */}

            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search supplier, invoice or building..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

            </div>

            {/* ========================================== */}
            {/* Building */}
            {/* ========================================== */}

            <select

                value={buildingId}

                onChange={(e) =>
                    setBuildingId(e.target.value)
                }

                className="rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

            >

                <option value="">

                    All Buildings

                </option>

                {buildings.length > 0 ? (
                    buildings.map((building) => (

                        <option
                            key={building.id}
                            value={building.id}
                        >

                            {building.buildingName}

                        </option>

                    ))
                ) : (
                    <option value="" disabled>
                        No Buildings available
                    </option>
                )}

            </select>

            {/* ========================================== */}
            {/* Water Source */}
            {/* ========================================== */}

            <select

                value={source}

                onChange={(e) =>
                    setSource(e.target.value)
                }

                className="rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

            >

                <option value="">

                    All Sources

                </option>

                <option value="MUNICIPAL">

                    Municipal

                </option>

                <option value="TANKER">

                    Tanker

                </option>

            </select>

        </div>

    );

}