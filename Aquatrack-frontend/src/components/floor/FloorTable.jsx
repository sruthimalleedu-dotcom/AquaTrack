export default function FloorTable({

    floors,

    loading,

    onView,

    onEdit,

    onDelete

}) {

    if (loading) {

        return (

            <div className="rounded-xl bg-white p-10 text-center">

                <p className="text-gray-500">
                    Loading floors...
                </p>

            </div>

        );

    }

    return (

        <div
            className="
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                shadow-sm
            "
        >

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Floor No
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Floor Name
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Created At
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {floors.map((floor) => (

                            <tr
                                key={floor.id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="px-6 py-4">

                                    {floor.floorNumber}

                                </td>

                                <td className="px-6 py-4">

                                    {floor.floorName}

                                </td>

                                <td className="px-6 py-4">

                                    {floor.createdAt
                                        ? new Date(
                                              floor.createdAt
                                          ).toLocaleDateString()
                                        : "-"}

                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => onView(floor)}
                                            className="
                                                rounded-lg
                                                bg-blue-100
                                                px-3
                                                py-2
                                                text-sm
                                                font-medium
                                                text-blue-700
                                                hover:bg-blue-200
                                            "
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => onEdit(floor)}
                                            className="
                                                rounded-lg
                                                bg-yellow-100
                                                px-3
                                                py-2
                                                text-sm
                                                font-medium
                                                text-yellow-700
                                                hover:bg-yellow-200
                                            "
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(floor)}
                                            className="
                                                rounded-lg
                                                bg-red-100
                                                px-3
                                                py-2
                                                text-sm
                                                font-medium
                                                text-red-700
                                                hover:bg-red-200
                                            "
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}