import { CalendarDays } from "lucide-react";

export default function DashboardHeader() {

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (

        <div className="flex items-center justify-between">

            <div>

                <h1 className="text-3xl font-bold text-slate-900">
                    Super Admin Dashboard
                </h1>

                <p className="mt-2 text-slate-500">
                    Welcome back! Here's what's happening today.
                </p>

            </div>

            <div
                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    shadow-sm
                "
            >

                <CalendarDays size={18} />

                <span className="text-sm font-medium">

                    {today}

                </span>

            </div>

        </div>

    );

}