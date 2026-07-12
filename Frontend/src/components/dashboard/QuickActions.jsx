import { Link } from "react-router-dom";

import {
    ClipboardList,
    Users,
    Building2,
    BarChart3,
} from "lucide-react";

const actions = [

    {
        title: "Property Registrations",
        description: "Review pending registration requests",
        icon: ClipboardList,
        color: "bg-blue-100 text-blue-600",
        link: "/admin/registrations",
    },

    {
        title: "Property Admins",
        description: "Manage all property admins",
        icon: Users,
        color: "bg-green-100 text-green-600",
        link: "/admin/property-admins",
    },

    {
        title: "Register Property",
        description: "Create a new apartment property",
        icon: Building2,
        color: "bg-purple-100 text-purple-600",
        link: "/register-apartment",
    },

    {
        title: "Analytics",
        description: "Coming Soon",
        icon: BarChart3,
        color: "bg-orange-100 text-orange-600",
        link: "#",
    },

];

export default function QuickActions() {

    return (

        <div>

            <h2 className="mb-5 text-xl font-bold text-slate-900">
                Quick Actions
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <Link
                            key={action.title}
                            to={action.link}
                            className="
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-xl
                            "
                        >

                            <div
                                className={`
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-xl

                                    ${action.color}
                                `}
                            >

                                <Icon size={28} />

                            </div>

                            <h3 className="mt-5 text-lg font-semibold">

                                {action.title}

                            </h3>

                            <p className="mt-2 text-sm text-slate-500">

                                {action.description}

                            </p>

                        </Link>

                    );

                })}

            </div>

        </div>

    );

}