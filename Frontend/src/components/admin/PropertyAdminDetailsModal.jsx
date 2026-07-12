import {
    suspendPropertyAdmin,
    reactivatePropertyAdmin,
} from "../../services/propertyAdminManagementService";

import { X } from "lucide-react";

export default function PropertyAdminDetailsModal({

    open,
    onClose,
    admin,
    onRefresh,

}) {

    if (!open || !admin) return null;

    // ==========================================
    // Suspend
    // ==========================================

    async function handleSuspend() {

        const confirmed = window.confirm(
            "Suspend this Property Admin?"
        );

        if (!confirmed) return;

        try {

            await suspendPropertyAdmin(admin.id);

            alert("Property Admin suspended successfully.");

            onRefresh();

            onClose();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to suspend property admin."
            );

        }

    }

    // ==========================================
    // Reactivate
    // ==========================================

    async function handleReactivate() {

        const confirmed = window.confirm(
            "Reactivate this Property Admin?"
        );

        if (!confirmed) return;

        try {

            await reactivatePropertyAdmin(admin.id);

            alert("Property Admin reactivated successfully.");

            onRefresh();

            onClose();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to reactivate property admin."
            );

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

            <div className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-8 py-6">

                    <div>

                        <h2 className="text-4xl font-bold">

                            Property Admin Details

                        </h2>

                        <p className="mt-2 text-slate-500">

                            Review property administrator information

                        </p>

                    </div>

                    <button onClick={onClose}>

                        <X size={32} />

                    </button>

                </div>

                {/* Body */}

                <div className="grid gap-6 p-8 md:grid-cols-2">

                    <Field
                        label="First Name"
                        value={admin.firstName}
                    />

                    <Field
                        label="Last Name"
                        value={admin.lastName}
                    />

                    <Field
                        label="Email"
                        value={admin.email}
                    />

                    <Field
                        label="Phone"
                        value={admin.phone}
                    />

                    <Field
                        label="Role"
                        value={admin.role}
                    />

                    <Field
                        label="Status"
                        value={
                            admin.active
                                ? "ACTIVE"
                                : "SUSPENDED"
                        }
                    />

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-4 border-t px-8 py-6">

                    {admin.active ? (

                        <button
                            onClick={handleSuspend}
                            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
                        >

                            Suspend

                        </button>

                    ) : (

                        <button
                            onClick={handleReactivate}
                            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                        >

                            Reactivate

                        </button>

                    )}

                    <button
                        onClick={onClose}
                        className="rounded-xl border px-6 py-3"
                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

// ==========================================
// Reusable Field
// ==========================================

function Field({ label, value }) {

    return (

        <div>

            <label className="mb-2 block text-lg font-semibold text-slate-600">

                {label}

            </label>

            <div className="rounded-xl bg-slate-100 p-4 text-lg font-medium">

                {value || "-"}

            </div>

        </div>

    );

}