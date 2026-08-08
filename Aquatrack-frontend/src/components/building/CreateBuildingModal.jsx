import { useState } from "react";
import { createBuilding } from "../../services/buildingService";

export default function CreateBuildingModal({

    open,

    apartmentId,

    onClose,

    onSuccess,

}) {

    const [formData, setFormData] = useState({

        buildingName: "",

        buildingCode: "",

        buildingType: "RESIDENTIAL",

        numberOfFloors: "",

        numberOfUnits: "",

        description: "",

    });

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData(previous => ({

            ...previous,

            [name]: value,

        }));

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            await createBuilding(

                apartmentId,

                {

                    ...formData,

                    numberOfFloors: Number(formData.numberOfFloors),

                    numberOfUnits: Number(formData.numberOfUnits),

                }

            );

            setFormData({

                buildingName: "",

                buildingCode: "",

                buildingType: "RESIDENTIAL",

                numberOfFloors: "",

                numberOfUnits: "",

                description: "",

            });

            onSuccess();

            onClose();

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Failed to create building."

            );

        }

    }

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold">

                        Create Building

                    </h2>

                    <button

                        onClick={onClose}

                        className="text-2xl"

                    >

                        ×

                    </button>

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="mt-8 space-y-6"

                >

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block">

                                Building Name

                            </label>

                            <input

                                name="buildingName"

                                value={formData.buildingName}

                                onChange={handleChange}

                                className="w-full rounded-xl border p-3"

                            />

                        </div>

                        <div>

                            <label className="mb-2 block">

                                Building Code

                            </label>

                            <input

                                name="buildingCode"

                                value={formData.buildingCode}

                                onChange={handleChange}

                                className="w-full rounded-xl border p-3"

                            />

                        </div>

                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

                        <div>

                            <label className="mb-2 block">

                                Building Type

                            </label>

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

                                <option value="MIXED">

                                    Mixed

                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="mb-2 block">

                                Floors

                            </label>

                            <input

                                type="number"

                                name="numberOfFloors"

                                value={formData.numberOfFloors}

                                onChange={handleChange}

                                className="w-full rounded-xl border p-3"

                            />

                        </div>

                        <div>

                            <label className="mb-2 block">

                                Units

                            </label>

                            <input

                                type="number"

                                name="numberOfUnits"

                                value={formData.numberOfUnits}

                                onChange={handleChange}

                                className="w-full rounded-xl border p-3"

                            />

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block">

                            Description

                        </label>

                        <textarea

                            rows="4"

                            name="description"

                            value={formData.description}

                            onChange={handleChange}

                            className="w-full rounded-xl border p-3"

                        />

                    </div>

                    <div className="flex justify-end gap-4">

                        <button

                            type="button"

                            onClick={onClose}

                            className="rounded-xl border px-6 py-3"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="rounded-xl bg-blue-600 px-6 py-3 text-white"

                        >

                            Create Building

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}