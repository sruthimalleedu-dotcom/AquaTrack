const ViewReadingModal = ({
    open,
    reading,
    onClose
}) => {

    if (!open || !reading) return null;

    const DetailRow = ({ label, value }) => (

        <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100">

            <span className="font-medium text-gray-600">
                {label}
            </span>

            <span className="text-gray-900 break-words">
                {value ?? "-"}
            </span>

        </div>

    );

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-bold">
                        Water Reading Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>

                </div>

                {/* Body */}

                <div className="p-6 space-y-2">

                    <DetailRow
                        label="Reading Date"
                        value={reading.readingDate}
                    />

                    <DetailRow
                        label="Previous Reading"
                        value={reading.previousReading}
                    />

                    <DetailRow
                        label="Current Reading"
                        value={reading.currentReading}
                    />

                    <DetailRow
                        label="Water Usage"
                        value={reading.waterUsage}
                    />

                    <DetailRow
                        label="Billing Cycle"
                        value={reading.billingCycleName}
                    />

                    <DetailRow
                        label="Uploaded By"
                        value={reading.uploadedByName}
                    />

                    <DetailRow
                        label="Upload Type"
                        value={reading.uploadType}
                    />

                    <DetailRow
                        label="Remarks"
                        value={reading.remarks}
                    />

                    <DetailRow
                        label="Created At"
                        value={reading.createdAt}
                    />

                    <DetailRow
                        label="Updated At"
                        value={reading.updatedAt}
                    />

                </div>

                {/* Footer */}

                <div className="border-t px-6 py-4 flex justify-end">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ViewReadingModal;