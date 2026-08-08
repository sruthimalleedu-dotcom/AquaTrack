import { useEffect, useMemo, useState } from "react";

export default function AddPurchaseModal({

    isOpen,

    onClose,

    onSubmit,

    buildings = [],

    billingCycles = []

}) {

    const initialForm = {

        buildingId: "",

        billingCycleId: "",

        purchaseDate: "",

        source: "MUNICIPAL",

        volumeKL: "",

        unitCost: "",

        supplierName: "",

        invoiceNumber: "",

        remarks: ""

    };

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {

        if (isOpen) {

            setFormData(initialForm);

        }

    }, [isOpen]);

    // ==========================================
    // Auto Calculate Total
    // ==========================================

    const totalCost = useMemo(() => {

        const volume = parseFloat(formData.volumeKL || 0);

        const unit = parseFloat(formData.unitCost || 0);

        return (volume * unit).toFixed(2);

    }, [formData.volumeKL, formData.unitCost]);

    if (!isOpen) return null;

    // ==========================================
    // Handle Change
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    // ==========================================
    // Handle Submit
    // ==========================================

    const handleSubmit = (e) => {

    e.preventDefault();

    if (

        !formData.buildingId ||

        !formData.billingCycleId ||

        !formData.purchaseDate ||

        !formData.volumeKL ||

        !formData.unitCost ||

        !formData.supplierName

    ) {

        alert("Please fill all required fields.");

        return;

    }

    const payload = {

        buildingId: formData.buildingId,

        billingCycleId: formData.billingCycleId,

        purchaseDate: formData.purchaseDate,

        source: formData.source,

        volumeKL: formData.volumeKL,

        unitCost: formData.unitCost,

        supplierName: formData.supplierName,

        invoiceNumber: formData.invoiceNumber,

        remarks: formData.remarks

    };

    onSubmit(payload);

};
    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">

                <h2 className="mb-6 text-2xl font-bold">

                    Add Bulk Water Purchase

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2"
                >

                    {/* Building */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Building

                        </label>

                        <select
                            name="buildingId"
                            value={formData.buildingId}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                        >

                            <option value="">

                                Select Building

                            </option>

                            {buildings.length > 0 ? (
                                buildings.map((building) => (

                                    <option
                                        key={building.id}
                                        value={building.id}
                                    >

                                        {building.buildingName}

                                    </option>

                                ))
                            ) : (
                                <option value="" disabled>
                                    No buildings found
                                </option>
                            )}

                        </select>

                    </div>

                    {/* Billing Cycle */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Billing Cycle

                        </label>

                        <select
                            name="billingCycleId"
                            value={formData.billingCycleId}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                        >

                            <option value="">

                                Select Billing Cycle

                            </option>

                            {billingCycles.map((cycle) => (

                                <option
                                    key={cycle.id}
                                    value={cycle.id}
                                >

                                    {cycle.cycleName}

                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Purchase Date */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Purchase Date

                        </label>

                        <input
                            type="date"
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                        />

                    </div>

                    {/* Source */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Water Source

                        </label>

                        <select
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                        >

                            <option value="MUNICIPAL">Municipal</option>
                            <option value="TANKER">Tanker</option>

                        </select>

                    </div>

                    {/* Volume */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Volume (KL)

                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="volumeKL"
                            value={formData.volumeKL}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                        />

                    </div>

                    {/* Unit Cost */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Unit Cost

                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="unitCost"
                            value={formData.unitCost}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                        />

                    </div>

                    {/* Supplier */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Supplier Name

                        </label>

                        <input
                            type="text"
                            name="supplierName"
                            value={formData.supplierName}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                        />

                    </div>

                    {/* Invoice */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Invoice Number

                        </label>

                        <input
                            type="text"
                            name="invoiceNumber"
                            value={formData.invoiceNumber}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                        />

                    </div>

                    {/* Total */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Total Cost

                        </label>

                        <input
                            type="text"
                            readOnly
                            value={`₹ ${totalCost}`}
                            className="w-full rounded-xl border bg-gray-100 px-4 py-2.5"
                        />

                    </div>

                    {/* Remarks */}

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium">

                            Remarks

                        </label>

                        <textarea
                            rows={3}
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-3 pt-2 md:col-span-2">

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

                            Save Purchase

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}