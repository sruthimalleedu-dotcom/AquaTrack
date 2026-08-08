export default function BuildingSelector({

    buildings,

    selectedBuilding,

    onChange

}) {

    return (

        <div className="space-y-2">

            <label
                className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                "
            >
                Select Building
            </label>

            <select
                value={selectedBuilding}
                onChange={(e) => onChange(e.target.value)}
                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    focus:border-blue-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            >

                <option value="">
                    -- Select Building --
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

        </div>

    );

}