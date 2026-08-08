import { useEffect, useState } from "react";
import waterUsageService from "../../services/waterUsageService";

const EditReadingModal = ({
    open,
    householdId,
    reading,
    onClose,
    onSuccess
}) => {

    const [formData, setFormData] = useState({
        readingDate: "",
        previousReading: "",
        currentReading: "",
        remarks: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (reading) {

            setFormData({
                readingDate: reading.readingDate || "",
                previousReading: reading.previousReading || "",
                currentReading: reading.currentReading || "",
                remarks: reading.remarks || ""
            });

        }

    }, [reading]);

    if (!open || !reading) return null;

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

        try {

            setLoading(true);

            await waterUsageService.updateWaterUsage(
                householdId,
                reading.id,
                {
                    ...formData,
                    previousReading: Number(formData.previousReading),
                    currentReading: Number(formData.currentReading)
                }
            );

            onSuccess();

            onClose();

        } catch (error) {

            console.error(
                "Failed to update water usage.",
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
                    Edit Water Reading
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

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

                    <div>

                        <label className="block mb-2 font-medium">
                            Previous Reading
                        </label>

                        <input
                            type="number"
                            name="previousReading"
                            value={formData.previousReading}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                            className="w-full border rounded-lg px-4 py-2"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Current Reading
                        </label>

                        <input
                            type="number"
                            name="currentReading"
                            value={formData.currentReading}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                            className="w-full border rounded-lg px-4 py-2"
                        />

                    </div>

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

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >

                            {loading
                                ? "Updating..."
                                : "Update Reading"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EditReadingModal;