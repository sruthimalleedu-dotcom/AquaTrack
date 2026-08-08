import { Droplets } from "lucide-react";

export default function WaterUsageHeader() {

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="flex items-center justify-between">

            <div>

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100">

                        <Droplets
                            size={24}
                            className="text-cyan-600"
                        />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Water Usage
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Track your household water consumption and usage history.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}