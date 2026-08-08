import { UserPlus } from "lucide-react";

export default function ResidentHeader({ onCreate }) {

    return (

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            {/* Left Section */}

            <div>

                <h1 className="text-3xl font-bold text-gray-900">
                    Resident Management
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage residents, send invitations, and monitor household occupancy.
                </p>

            </div>

            {/* Right Section */}

            <button
                type="button"
                onClick={onCreate}
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-blue-600
                    px-5
                    py-2.5
                    font-medium
                    text-white
                    shadow-sm
                    transition-all
                    duration-200
                    hover:bg-blue-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:ring-offset-2
                "
            >
                <UserPlus size={18} />

                Add Resident

            </button>

        </div>

    );

}