import {
    Users,
    UserCheck,
    Mail,
    Building2,
} from "lucide-react";

export default function ManagerStats({ managers = [] }) {

    // ==========================================
    // Statistics
    // ==========================================

    const totalManagers = managers.length;

    const activeManagers = managers.filter(

        (manager) => manager.status === "ACTIVATED"

    ).length;

    const pendingInvitations = managers.filter(

        (manager) => manager.status === "PENDING"

    ).length;

    const assignedBuildings = managers.reduce(

    (total, manager) =>

        total +

        (manager.buildings
            ? manager.buildings.length
            : 0),

    0

);

    // ==========================================
    // Cards
    // ==========================================

    const stats = [

        {
            title: "Total Managers",
            value: totalManagers,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },

        {
            title: "Active Managers",
            value: activeManagers,
            icon: UserCheck,
            color: "text-green-600",
            bg: "bg-green-50",
        },

        {
            title: "Pending Invitations",
            value: pendingInvitations,
            icon: Mail,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
        },

        {
            title: "Assigned Buildings",
            value: assignedBuildings,
            icon: Building2,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },

    ];

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((item) => {

                const Icon = item.icon;

                return (

                    <div
                        key={item.title}
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
                            hover:shadow-lg
                        "
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">

                                    {item.title}

                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-slate-900">

                                    {item.value}

                                </h2>

                            </div>

                            <div
                                className={`
                                    ${item.bg}
                                    rounded-xl
                                    p-3
                                `}
                            >

                                <Icon
                                    size={26}
                                    className={item.color}
                                />

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}