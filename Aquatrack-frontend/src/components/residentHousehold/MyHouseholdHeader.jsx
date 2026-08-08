import { Home } from "lucide-react";

export default function MyHouseholdHeader() {

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="flex items-center justify-between">

            <div>

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">

                        <Home
                            size={24}
                            className="text-blue-600"
                        />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            My Household
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            View your household information, water meter details, and household members.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}