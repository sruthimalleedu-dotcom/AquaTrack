export default function ViewResidentModal({

    isOpen,
    onClose,
    resident

}) {

    if (!isOpen || !resident) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">

                {/* Header */}

                <div className="border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">
                        Resident Details
                    </h2>

                </div>

                {/* Body */}

                <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

                    <div>

                        <p className="text-sm text-gray-500">
                            First Name
                        </p>

                        <p className="font-medium">
                            {resident.firstName}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Last Name
                        </p>

                        <p className="font-medium">
                            {resident.lastName || "-"}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Email
                        </p>

                        <p className="font-medium">
                            {resident.email}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Phone
                        </p>

                        <p className="font-medium">
                            {resident.phone}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Apartment
                        </p>

                        <p className="font-medium">
                            {resident.apartmentName}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            House Number
                        </p>

                        <p className="font-medium">
                            {resident.houseNumber}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Floor
                        </p>

                        <p className="font-medium">
                            {resident.floorName}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Water Meter
                        </p>

                        <p className="font-medium">
                            {resident.meterNumber}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Status
                        </p>

                        <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                resident.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {resident.isActive ? "Active" : "Inactive"}
                        </span>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end border-t px-6 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-lg border px-5 py-2 hover:bg-gray-50"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );

}