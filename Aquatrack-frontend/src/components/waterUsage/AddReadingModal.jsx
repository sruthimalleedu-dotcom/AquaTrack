import { useState } from "react";
import waterUsageService from "../../services/waterUsageService";

const initialForm = {
    readingDate: "",
    previousReading: "",
    currentReading: "",
    remarks: ""
};

const AddReadingModal = ({
    open,
    householdId,
    onClose,
    onSuccess
}) => {

    const [formData, setFormData] = useState(initialForm);

    const [loading, setLoading] = useState(false);

    if (!open) return null;

    // ==========================================
    // Handle Input
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!householdId) {
            console.error("Missing householdId in AddReadingModal");
            return;
        }

        try {

            setLoading(true);

            await waterUsageService.createWaterUsage(
                householdId,
                {
                    ...formData,
                    previousReading: Number(formData.previousReading),
                    currentReading: Number(formData.currentReading)
                }
            );

            setFormData(initialForm);

            onSuccess();

            onClose();

        } catch (error) {

            console.error(
                "Failed to create water usage.",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">

                <h2 className="text-xl font-bold mb-6">

                    Add Water Reading

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* Reading Date */}

                    <div>

                        <label className="block mb-2 font-medium">

                            Reading Date

                        </label>

                        <input
                            type="date"
                            name="readingDate"
                            value={formData.readingDate}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-2"
                        />

                    </div>

                    {/* Previous Reading */}

                    <div>

                        <label className="block mb-2 font-medium">

                            Previous Reading

                        </label>

                        <input
                            type="number"
                            name="previousReading"
                            value={formData.previousReading}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full border rounded-lg px-4 py-2"
                        />

                    </div>

                    {/* Current Reading */}

                    <div>

                        <label className="block mb-2 font-medium">

                            Current Reading

                        </label>

                        <input
                            type="number"
                            name="currentReading"
                            value={formData.currentReading}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full border rounded-lg px-4 py-2"
                        />

                    </div>

                    {/* Remarks */}

                    <div>

                        <label className="block mb-2 font-medium">

                            Remarks

                        </label>

                        <textarea
                            rows="3"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2"
                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >

                            {loading
                                ? "Saving..."
                                : "Save Reading"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default AddReadingModal;