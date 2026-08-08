import { useState } from "react";

export default function InviteResidentModal({

    isOpen,
    onClose,
    onSubmit,
    householdId

}) {

    const [formData, setFormData] = useState({

        householdId: householdId || "",
        fullName: "",
        email: "",
        phoneNumber: ""

    });

    if (!isOpen) return null;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({

            ...formData,

            householdId

        });

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

                <h2 className="mb-6 text-xl font-semibold">
                    Invite Resident
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-3 py-2"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-3 py-2"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-3 py-2"
                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-4 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Send Invitation
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}