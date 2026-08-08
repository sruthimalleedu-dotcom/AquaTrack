import { useEffect, useState } from "react";

import {
    getBuilding,
    updateBuilding,
} from "../../services/buildingService";

export default function EditBuildingModal({

    open,

    apartmentId,

    buildingId,

    onClose,

    onSuccess,

}) {

    // ==========================================
    // State
    // ==========================================

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({

        buildingName: "",

        buildingCode: "",

        buildingType: "RESIDENTIAL",

        numberOfFloors: "",

        numberOfUnits: "",

        description: "",

    });

    // ==========================================
    // Load Building
    // ==========================================

    useEffect(() => {

        if (open && apartmentId && buildingId) {

            loadBuilding();

        }

    }, [open, apartmentId, buildingId]);

    async function loadBuilding() {

        try {

            setLoading(true);

            const response = await getBuilding(

                apartmentId,

                buildingId

            );

            const building = response.data;

            setFormData({

                buildingName: building.buildingName,

                buildingCode: building.buildingCode,

                buildingType: building.buildingType,

                numberOfFloors: building.numberOfFloors,

                numberOfUnits: building.numberOfUnits,

                description: building.description || "",

            });

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    // ==========================================
    // Change
    // ==========================================

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData(previous => ({

            ...previous,

            [name]: value,

        }));

    }

    // ==========================================
    // Submit
    // ==========================================

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setSaving(true);

            await updateBuilding(

                apartmentId,

                buildingId,

                {

                    ...formData,

                    numberOfFloors: Number(formData.numberOfFloors),

                    numberOfUnits: Number(formData.numberOfUnits),

                }

            );

            onSuccess();

            onClose();

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setSaving(false);

        }

    }

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">

                        Edit Building

                    </h2>

                    <button

                        onClick={onClose}

                        className="text-2xl"

                    >

                        ×

                    </button>

                </div>

                {loading ? (

                    <p>Loading...</p>

                ) : (

                    <form

                        onSubmit={handleSubmit}

                        className="space-y-5"

                    >

                        <input

                            name="buildingName"

                            placeholder="Building Name"

                            value={formData.buildingName}

                            onChange={handleChange}

                            className="w-full rounded-xl border p-3"

                        />

                        <input

                            name="buildingCode"

                            placeholder="Building Code"

                            value={formData.buildingCode}

                            onChange={handleChange}

                            className="w-full rounded-xl border p-3"

                        />

                        <select

                            name="buildingType"

                            value={formData.buildingType}

                            onChange={handleChange}

                            className="w-full rounded-xl border p-3"

                        >

                            <option value="RESIDENTIAL">

                                Residential

                            </option>

                            <option value="COMMERCIAL">

                                Commercial

                            </option>

                            <option value="MIXED_USE">

                                Mixed Use

                            </option>

                        </select>

                        <div className="grid grid-cols-2 gap-4">

                            <input

                                type="number"

                                name="numberOfFloors"

                                placeholder="Floors"

                                value={formData.numberOfFloors}

                                onChange={handleChange}

                                className="rounded-xl border p-3"

                            />

                            <input

                                type="number"

                                name="numberOfUnits"

                                placeholder="Units"

                                value={formData.numberOfUnits}

                                onChange={handleChange}

                                className="rounded-xl border p-3"

                            />

                        </div>

                        <textarea

                            rows={4}

                            name="description"

                            placeholder="Description"

                            value={formData.description}

                            onChange={handleChange}

                            className="w-full rounded-xl border p-3"

                        />

                        <div className="flex justify-end gap-4 pt-4">

                            <button

                                type="button"

                                onClick={onClose}

                                className="rounded-xl border px-6 py-3"

                            >

                                Cancel

                            </button>

                            <button

                                type="submit"

                                disabled={saving}

                                className="rounded-xl bg-blue-600 px-6 py-3 text-white"

                            >

                                {saving

                                    ? "Updating..."

                                    : "Update Building"}

                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>

    );

}