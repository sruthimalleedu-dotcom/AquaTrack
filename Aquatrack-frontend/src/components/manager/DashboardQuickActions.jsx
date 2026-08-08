import { Link } from "react-router-dom";
import { Home, Users, ArrowUpRight } from "lucide-react";

export default function DashboardQuickActions() {

    const actions = [
        {
            title: "Manage Households",
            description: "View all assigned households",
            icon: Home,
            path: "/manager/households",
            gradient: "from-blue-500 via-blue-600 to-indigo-700",
            glow: "hover:shadow-blue-500/30",
            badge: "12 Active",
        },
        {
            title: "Manage Residents",
            description: "View and invite residents",
            icon: Users,
            path: "/manager/residents",
            gradient: "from-emerald-500 via-teal-500 to-cyan-600",
            glow: "hover:shadow-emerald-500/30",
            badge: "48 Total",
        },
    ];

    return (

        <div className="relative rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-xl shadow-slate-200/50 overflow-hidden">

            {/* Ambient background blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-60 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 opacity-60 blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900">
                            <svg
                                className="w-3.5 h-3.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z
                                       M3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25z
                                       M13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z
                                       M13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                />
                            </svg>
                        </span>
                        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                            Quick Actions
                        </h2>
                    </div>
                    <p className="mt-1 text-sm text-slate-400 font-medium pl-9">
                        Frequently used manager operations
                    </p>
                </div>

                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {actions.length} shortcuts
                </span>
            </div>

            {/* Action Cards */}
            <div className="relative mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <Link
                            key={action.title}
                            to={action.path}
                            className={`
                                group relative overflow-hidden
                                rounded-2xl p-5
                                bg-gradient-to-br ${action.gradient}
                                text-white
                                shadow-lg ${action.glow}
                                hover:shadow-2xl
                                hover:-translate-y-1
                                hover:scale-[1.02]
                                transition-all duration-300 ease-out
                            `}
                        >

                            {/* Shimmer overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {/* Decorative expanding blobs */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

                            {/* Top row: icon + arrow */}
                            <div className="relative flex items-center justify-between">

                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300 shadow-inner">
                                    <Icon size={22} strokeWidth={2} />
                                </div>

                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                                    <ArrowUpRight size={15} strokeWidth={2.5} />
                                </div>

                            </div>

                            {/* Badge */}
                            <div className="relative mt-4 inline-flex">
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
                                    {action.badge}
                                </span>
                            </div>

                            {/* Title & description */}
                            <h3 className="relative mt-2 text-base font-bold tracking-tight leading-snug">
                                {action.title}
                            </h3>

                            <p className="relative mt-0.5 text-sm text-white/70 font-medium">
                                {action.description}
                            </p>

                        </Link>

                    );

                })}

            </div>

        </div>

    );

}