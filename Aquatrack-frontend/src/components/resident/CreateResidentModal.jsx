import { useEffect, useState } from "react";

import ResidentForm from "./ResidentForm";

export default function CreateResidentModal({

    isOpen,
    onClose,
    onSubmit

}) {

    // ==========================================
    // Initial Form State
    // ==========================================

    const initialFormData = {

        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        sendInvitation: true

    };

    // ==========================================
    // State
    // ==========================================

    const [formData, setFormData] = useState(initialFormData);

    const [errors, setErrors] = useState({});

    // ==========================================
    // Reset Form When Modal Opens
    // ==========================================

    useEffect(() => {

        if (isOpen) {

            setFormData(initialFormData);

            setErrors({});

        }

    }, [isOpen]);

    // ==========================================
    // Validation
    // ==========================================

    const validate = () => {

        const newErrors = {};

        if (!formData.firstName.trim()) {

            newErrors.firstName = "First name is required.";

        }

        if (!formData.email.trim()) {

            newErrors.email = "Email is required.";

        }

        if (!formData.phone.trim()) {

            newErrors.phone = "Phone number is required.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate()) return;

        onSubmit(formData);

    };

    // ==========================================
    // Close Modal
    // ==========================================

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">

                {/* Header */}

                <div className="border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">
                        Add Resident
                    </h2>

                </div>

                {/* Body */}

                <form onSubmit={handleSubmit}>

                    <div className="p-6">

                        <ResidentForm

                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}

                        />

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end gap-3 border-t px-6 py-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-5 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                        >
                            Create Resident
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}