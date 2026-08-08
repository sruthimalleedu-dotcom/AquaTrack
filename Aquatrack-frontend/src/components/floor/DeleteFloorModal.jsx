import { useState } from "react";

import { deleteFloor } from "../../services/floorService";

export default function DeleteFloorModal({

    open,
    buildingId,
    floor,
    onClose,
    onSuccess

}) {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    if (!open || !floor) return null;

    async function handleDelete() {

        try {

            setLoading(true);

            setError("");

            await deleteFloor(

                buildingId,

                floor.id

            );

            onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ||

                "Failed to delete floor."

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                <h2 className="text-2xl font-bold text-red-600">

                    Delete Floor

                </h2>

                <p className="mt-4 text-gray-600">

                    Are you sure you want to delete

                    <span className="font-semibold">

                        {" "}{floor.floorName}

                    </span>

                    ?

                </p>

                {error && (

                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">

                        {error}

                    </div>

                )}

                <div className="mt-8 flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="rounded-lg border px-5 py-2 hover:bg-gray-100"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleDelete}

                        disabled={loading}

                        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"

                    >

                        {loading ? "Deleting..." : "Delete"}

                    </button>

                </div>

            </div>

        </div>

    );

}