import { useEffect, useState } from "react";

export default function CreateBillingCycleModal({

    isOpen,

    onClose,

    onSubmit

}) {

    const initialForm = {

        cycleName: "",

        startDate: "",

        endDate: "",

        dueDate: ""

    };

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {

        if (isOpen) {

            setFormData(initialForm);

        }

    }, [isOpen]);

    if (!isOpen) return null;

    // ==========================================
    // Handle Change
    // ==========================================

    const handleChange = (e) => {

        const {

            name,

            value

        } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();

        if (

            !formData.cycleName ||

            !formData.startDate ||

            !formData.endDate ||

            !formData.dueDate

        ) {

            alert("Please fill all fields.");

            return;

        }

        onSubmit(formData);

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

                <h2 className="mb-6 text-2xl font-bold">

                    Create Billing Cycle

                </h2>

                <form

                    onSubmit={handleSubmit}

                    className="space-y-5"

                >

                    {/* Cycle Name */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Cycle Name

                        </label>

                        <input

                            type="text"

                            name="cycleName"

                            value={formData.cycleName}

                            onChange={handleChange}

                            placeholder="e.g. July 2026"

                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"

                        />

                    </div>

                    {/* Start Date */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Start Date

                        </label>

                        <input

                            type="date"

                            name="startDate"

                            value={formData.startDate}

                            onChange={handleChange}

                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"

                        />

                    </div>

                    {/* End Date */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            End Date

                        </label>

                        <input

                            type="date"

                            name="endDate"

                            value={formData.endDate}

                            onChange={handleChange}

                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"

                        />

                    </div>

                    {/* Due Date */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Due Date

                        </label>

                        <input

                            type="date"

                            name="dueDate"

                            value={formData.dueDate}

                            onChange={handleChange}

                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"

                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-3 pt-4">

                        <button

                            type="button"

                            onClick={onClose}

                            className="rounded-xl border border-gray-300 px-5 py-2.5 hover:bg-gray-100"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"

                        >

                            Create

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}