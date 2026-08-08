import { useState } from "react";

import { deleteBuilding } from "../../services/buildingService";

export default function DeleteBuildingModal({

    open,

    apartmentId,

    building,

    onClose,

    onSuccess,

}) {

    const [loading, setLoading] = useState(false);

    if (!open || !building) return null;

    async function handleDelete() {

        try {

            setLoading(true);

            await deleteBuilding(

                apartmentId,

                building.id

            );

            onSuccess();

            onClose();

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

                <div className="text-center">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

                        <span className="text-3xl">

                            🗑️

                        </span>

                    </div>

                    <h2 className="text-2xl font-bold text-slate-800">

                        Delete Building

                    </h2>

                    <p className="mt-4 text-slate-600">

                        Are you sure you want to delete

                        <span className="font-semibold">

                            {" "}{building.buildingName}

                        </span>

                        ?

                    </p>

                    <p className="mt-2 text-sm text-red-600">

                        This action cannot be undone.

                    </p>

                </div>

                <div className="mt-8 flex justify-end gap-4">

                    <button

                        onClick={onClose}

                        disabled={loading}

                        className="rounded-xl border border-slate-300 px-6 py-3"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleDelete}

                        disabled={loading}

                        className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"

                    >

                        {loading

                            ? "Deleting..."

                            : "Delete"}

                    </button>

                </div>

            </div>

        </div>

    );

}