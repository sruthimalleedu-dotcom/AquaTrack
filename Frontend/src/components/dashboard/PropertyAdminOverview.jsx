import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export default function PropertyAdminOverview({

    summary,

}) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
            "
        >

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold">

                        Property Admins

                    </h2>

                    <p className="mt-1 text-slate-500">

                        Current platform administrators

                    </p>

                </div>

                <Users
                    size={32}
                    className="text-blue-600"
                />

            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">

                <div className="rounded-xl bg-slate-50 p-4">

                    <p className="text-sm text-slate-500">

                        Total

                    </p>

                    <h3 className="mt-2 text-3xl font-bold">

                        {summary.totalPropertyAdmins}

                    </h3>

                </div>

                <div className="rounded-xl bg-green-50 p-4">

                    <p className="text-sm text-green-700">

                        Active

                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-green-700">

                        {summary.activePropertyAdmins}

                    </h3>

                </div>

                <div className="rounded-xl bg-red-50 p-4">

                    <p className="text-sm text-red-700">

                        Suspended

                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-red-700">

                        {summary.inactivePropertyAdmins}

                    </h3>

                </div>

            </div>

            <Link
                to="/admin/property-admins"
                className="
                    mt-6
                    inline-flex
                    rounded-lg
                    bg-blue-600
                    px-5
                    py-3
                    text-white
                    hover:bg-blue-700
                "
            >

                Manage Property Admins

            </Link>

        </div>

    );

}