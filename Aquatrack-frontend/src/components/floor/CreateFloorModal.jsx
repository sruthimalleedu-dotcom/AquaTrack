import { useEffect, useState } from "react";
import { createFloor } from "../../services/floorService";

export default function CreateFloorModal({

    open,
    buildingId,
    onClose,
    onSuccess

}) {

    // ==========================================
    // State
    // ==========================================

    const [floorName, setFloorName] = useState("");
    const [floorNumber, setFloorNumber] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // Reset Form
    // ==========================================

    useEffect(() => {

        if (open) {

            setFloorName("");
            setFloorNumber("");
            setError("");

        }

    }, [open]);

    if (!open) return null;

    // ==========================================
    // Submit
    // ==========================================

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);
            setError("");

            await createFloor(

                buildingId,

                {

                    floorName,

                    floorNumber: Number(floorNumber)

                }

            );

            onSuccess();

            onClose();

        }

        catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ||

                "Failed to create floor."

            );

        }

        finally {

            setLoading(false);

        }

    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

                <h2 className="mb-6 text-2xl font-bold">

                    Create Floor

                </h2>

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
                            placeholder="Ground Floor"
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
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Floor"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}