import { X, Building2, Layers, Home, FileText } from "lucide-react";

export default function ViewBuildingModal({

    open,

    building,

    onClose,

}) {

    if (!open || !building) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b p-6">

                    <div>

                        <h2 className="text-2xl font-bold">

                            Building Details

                        </h2>

                        <p className="text-slate-500">

                            View building information

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >

                        <X />

                    </button>

                </div>

                {/* Body */}

                <div className="grid gap-6 p-8 md:grid-cols-2">

                    <InfoCard
                        icon={Building2}
                        title="Building Name"
                        value={building.buildingName}
                    />

                    <InfoCard
                        icon={Building2}
                        title="Building Code"
                        value={building.buildingCode}
                    />

                    <InfoCard
                        icon={Layers}
                        title="Building Type"
                        value={building.buildingType}
                    />

                    <InfoCard
                        icon={Home}
                        title="Floors"
                        value={building.numberOfFloors}
                    />

                    <InfoCard
                        icon={Home}
                        title="Units"
                        value={building.numberOfUnits}
                    />

                    <InfoCard
                        icon={FileText}
                        title="Description"
                        value={building.description || "-"}
                    />

                </div>

                {/* Footer */}

                <div className="flex justify-end border-t p-6">

                    <button
                        onClick={onClose}
                        className="rounded-xl bg-slate-900 px-6 py-3 text-white"
                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

function InfoCard({

    icon: Icon,

    title,

    value,

}) {

    return (

        <div className="rounded-xl border p-5">

            <div className="flex items-center gap-3">

                <Icon
                    size={18}
                    className="text-blue-600"
                />

                <span className="text-sm text-slate-500">

                    {title}

                </span>

            </div>

            <p className="mt-3 text-lg font-semibold">

                {value}

            </p>

        </div>

    );

}