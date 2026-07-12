import { X } from "lucide-react";
import { useState } from "react";
import {
    approveRegistration,
    rejectRegistration,
} from "../../services/propertyRegistrationService";

export default function PropertyRegistrationDetailsModal({

    open,
    registration,
    onClose,
    onSuccess,

}) {

    if (!open || !registration) {

        return null;

    }

    const [loading, setLoading] = useState(false);

    const [rejectionReason, setRejectionReason] = useState("");

    const [showRejectBox, setShowRejectBox] = useState(false);

    async function handleApprove() {

    try {

        setLoading(true);

        const response = await approveRegistration(
            registration.id
        );

        console.log(response);

        alert("Property Registration Approved Successfully.");

        onClose();

        if (onSuccess) {

            onSuccess();

        }

    } catch (error) {

        console.error(error);

        alert(

            error.response?.data?.message ||

            "Failed to approve registration."

        );

    } finally {

        setLoading(false);

    }

}

async function handleReject() {

    if (!rejectionReason.trim()) {

        alert("Please enter rejection reason.");

        return;

    }

    try {

        setLoading(true);

        const response = await rejectRegistration(

            registration.id,

            rejectionReason

        );

        console.log(response);

        alert("Property Registration Rejected Successfully.");

        setShowRejectBox(false);

        setRejectionReason("");

        onClose();

        if (onSuccess) {

            onSuccess();

        }

    } catch (error) {

        console.error(error);

        alert(

            error.response?.data?.message ||

            "Failed to reject registration."

        );

    } finally {

        setLoading(false);

    }

}

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
                p-4
            "
        >

            <div
                className="
                    w-full
                    max-w-3xl
                    rounded-2xl
                    bg-white
                    shadow-2xl
                "
            >

                {/* ======================================
                    Header
                ====================================== */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        px-6
                        py-5
                    "
                >

                    <div>

                        <h2 className="text-2xl font-bold">

                            Registration Details

                        </h2>

                        <p className="mt-1 text-slate-500">

                            Review property registration request

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            hover:bg-slate-100
                        "
                    >

                        <X size={22} />

                    </button>

                </div>

                {/* ======================================
                    Body
                ====================================== */}

                <div className="grid gap-6 p-6 md:grid-cols-2">

                    <InfoItem
                        label="Company Name"
                        value={registration.companyName}
                    />

                    <InfoItem
                        label="Contact Person"
                        value={registration.contactPersonName}
                    />

                    <InfoItem
                        label="Email"
                        value={registration.email}
                    />

                    <InfoItem
                        label="Phone"
                        value={registration.phone}
                    />

                    <InfoItem
                        label="Property Type"
                        value={registration.propertyType}
                    />

                    <InfoItem
                        label="Apartments"
                        value={registration.numberOfApartments}
                    />

                    <InfoItem
                        label="Address"
                        value={registration.address}
                    />

                    <InfoItem
                        label="City"
                        value={registration.city}
                    />

                    <InfoItem
                        label="State"
                        value={registration.state}
                    />

                    <InfoItem
                        label="Pincode"
                        value={registration.pincode}
                    />

                    <InfoItem
                        label="Status"
                        value={registration.status}
                    />

                </div>

                {showRejectBox && (

    <div className="border-t px-6 py-5">

        <label
            className="
                mb-2
                block
                font-semibold
            "
        >

            Rejection Reason

        </label>

        <textarea

            rows={4}

            value={rejectionReason}

            onChange={(e) =>
                setRejectionReason(
                    e.target.value
                )
            }

            placeholder="Enter rejection reason..."

            className="
                w-full
                rounded-xl
                border
                border-slate-300
                p-4
                outline-none
                focus:border-red-500
            "

        />

        <div className="mt-4 flex justify-end gap-3">

            <button

                onClick={() => {

                    setShowRejectBox(false);

                    setRejectionReason("");

                }}

                className="
                    rounded-lg
                    border
                    px-5
                    py-2
                "

            >

                Cancel

            </button>

            <button

                onClick={handleReject}

                className="
                    rounded-lg
                    bg-red-600
                    px-5
                    py-2
                    text-white
                    hover:bg-red-700
                "

            >

                Confirm Reject

            </button>

        </div>

    </div>

)}

                {/* ======================================
                    Footer
                ====================================== */}

                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        border-t
                        px-6
                        py-5
                    "
                >

                   <div className="flex items-center gap-3">

    {registration.status === "PENDING" && (

        <>
            <button
                onClick={() => setShowRejectBox(true)}
                className="
                    rounded-lg
                    bg-red-600
                    px-5
                    py-2
                    font-medium
                    text-white
                    hover:bg-red-700
                "
            >
                Reject
            </button>

            <button
                onClick={handleApprove}
                disabled={loading}
                className="
                    rounded-lg
                    bg-green-600
                    px-5
                    py-2
                    font-medium
                    text-white
                    hover:bg-green-700
                    disabled:opacity-60
                "
            >
                {loading ? "Processing..." : "Approve"}
            </button>
        </>

    )}

    <button
        onClick={onClose}
        className="
            rounded-lg
            border
            border-slate-300
            px-5
            py-2
            hover:bg-slate-100
        "
    >
        Close
    </button>

</div>

                </div>

            </div>

        </div>

    );

}

function InfoItem({

    label,
    value,

}) {

    return (

        <div>

            <p
                className="
                    mb-1
                    text-sm
                    font-medium
                    text-slate-500
                "
            >

                {label}

            </p>

            <p
                className="
                    rounded-lg
                    bg-slate-100
                    px-4
                    py-3
                    font-medium
                "
            >

                {value || "-"}

            </p>

        </div>

    );

}