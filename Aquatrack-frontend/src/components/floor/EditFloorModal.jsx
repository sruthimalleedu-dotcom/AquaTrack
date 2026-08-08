import { useEffect, useState } from "react";

import {
    getFloorById,
    updateFloor
} from "../../services/floorService";

export default function EditFloorModal({

    open,
    buildingId,
    floorId,
    onClose,
    onSuccess

}) {

    const [floorName, setFloorName] = useState("");
    const [floorNumber, setFloorNumber] = useState("");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    // ==========================================
    // Load Floor
    // ==========================================

    useEffect(() => {

        if (open && floorId && buildingId) {

            loadFloor();

        }

    }, [open, floorId, buildingId]);

    async function loadFloor() {

        try {

            setLoading(true);
            setError("");

            const response = await getFloorById(
                buildingId,
                floorId
            );

            const floor = response.data;

            setFloorName(floor.floorName);
            setFloorNumber(floor.floorNumber);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load floor."
            );

        } finally {

            setLoading(false);

        }

    }

    // ==========================================
    // Update Floor
    // ==========================================

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");

            await updateFloor(

                buildingId,

                floorId,

                {
                    floorName,
                    floorNumber: Number(floorNumber)
                }

            );

            onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to update floor."
            );

        } finally {

            setSaving(false);

        }

    }

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

                <h2 className="mb-6 text-2xl font-bold">

                    Edit Floor

                </h2>

                {loading ? (

                    <p className="text-center text-gray-500">

                        Loading...

                    </p>

                ) : (

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {error && (

                            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">

                                {error}

                            </div>

                        )}

                        <div>

                            <label className="mb-2 block text-sm font-medium">

                                Floor Number

                            </label>

                            <input
                                type="number"
                                value={floorNumber}
                                onChange={(e) => setFloorNumber(e.target.value)}
                                className="w-full rounded-lg border px-4 py-3"
                                required
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">

                                Floor Name

                            </label>

                            <input
                                type="text"
                                value={floorName}
                                onChange={(e) => setFloorName(e.target.value)}
                                className="w-full rounded-lg border px-4 py-3"
                                required
                            />

                        </div>

                        <div className="flex justify-end gap-3 pt-4">

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg border px-5 py-2"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {saving ? "Updating..." : "Update Floor"}
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>

    );

}