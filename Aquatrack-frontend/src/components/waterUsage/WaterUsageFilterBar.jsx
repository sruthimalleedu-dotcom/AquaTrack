import { Search } from "lucide-react";

export default function WaterUsageFilterBar({

    search = "",
    setSearch = () => {},

    buildingId = "",
    setBuildingId = () => {},
    buildings = [],

    floorId = "",
    setFloorId = () => {},
    floors = [],

    householdId = "",
    setHouseholdId = () => {},
    households = [],

    sortOrder = "latest",
    setSortOrder = () => {}

}) {

    return (

        <div className="rounded-xl border bg-white p-5 shadow-sm">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">

                {/* Building */}

                <select
                    value={buildingId}
                    onChange={(e) => setBuildingId(e.target.value)}
                    className="rounded-lg border px-3 py-2"
                >

                    <option value="">
                        Select Building
                    </option>

                    {buildings.map((building) => (

                        <option
                            key={building.id}
                            value={building.id}
                        >
                            {building.buildingName}
                        </option>

                    ))}

                </select>

                {/* Floor */}

                <select
                    value={floorId}
                    onChange={(e) => setFloorId(e.target.value)}
                    className="rounded-lg border px-3 py-2"
                    disabled={!buildingId}
                >

                    <option value="">
                        Select Floor
                    </option>

                    {floors.map((floor) => (

                        <option
                            key={floor.id}
                            value={floor.id}
                        >
                            {floor.floorName}
                        </option>

                    ))}

                </select>

                {/* Household */}

                <select
                    value={householdId}
                    onChange={(e) => setHouseholdId(e.target.value)}
                    className="rounded-lg border px-3 py-2"
                    disabled={!floorId}
                >

                    <option value="">
                        Select Household
                    </option>

                    {households.map((household) => (

                        <option
                            key={household.id}
                            value={household.id}
                        >
                            {household.houseNumber}
                        </option>

                    ))}

                </select>

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search reading..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border py-2 pl-10 pr-3"
                    />

                </div>

                {/* Sort */}

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="rounded-lg border px-3 py-2"
                >

                    <option value="latest">
                        Latest First
                    </option>

                    <option value="oldest">
                        Oldest First
                    </option>

                </select>

            </div>

        </div>

    );

}