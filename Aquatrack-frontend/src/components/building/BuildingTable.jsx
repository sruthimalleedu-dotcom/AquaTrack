import {

    Eye,

    Pencil,

    Trash2,

} from "lucide-react";

export default function BuildingTable({

    buildings,

    loading,

    onView,

    onEdit,

    onDelete,

}) {

    if (loading) {

        return (

            <div className="rounded-xl bg-white p-8 shadow">

                Loading...

            </div>

        );

    }

    if (buildings.length === 0) {

        return (

            <div className="rounded-xl bg-white p-8 shadow">

                No Buildings Found

            </div>

        );

    }

    return (

        <div className="overflow-hidden rounded-2xl bg-white shadow">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="px-6 py-4 text-left">

                            Name

                        </th>

                        <th className="px-6 py-4">

                            Code

                        </th>

                        <th className="px-6 py-4">

                            Type

                        </th>

                        <th className="px-6 py-4">

                            Floors

                        </th>

                        <th className="px-6 py-4">

                            Units

                        </th>

                        <th className="px-6 py-4">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {buildings.map((building) => (

                        <tr
                            key={building.id}
                            className="border-t"
                        >

                            <td className="px-6 py-4">

                                {building.buildingName}

                            </td>

                            <td className="px-6 py-4 text-center">

                                {building.buildingCode}

                            </td>

                            <td className="px-6 py-4 text-center">

                                {building.buildingType}

                            </td>

                            <td className="px-6 py-4 text-center">

                                {building.numberOfFloors}

                            </td>

                            <td className="px-6 py-4 text-center">

                                {building.numberOfUnits}

                            </td>

                            <td className="px-6 py-4">

                                <div className="flex justify-center gap-3">

                                    <button
                                        onClick={() =>
                                            onView(building)
                                        }
                                    >

                                        <Eye size={18} />

                                    </button>

                                    <button
                                        onClick={() =>
                                            onEdit(building)
                                        }
                                    >

                                        <Pencil size={18} />

                                    </button>

                                    <button
                                        onClick={() =>
                                            onDelete(building)
                                        }
                                    >

                                        <Trash2
                                            size={18}
                                            className="text-red-600"
                                        />

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}