import { ArrowUpRight } from "lucide-react";

export default function StatCard({
    title,
    value,
    icon: Icon,
    color = "blue",
}) {

    const colorMap = {
        blue: {
            bg: "bg-blue-100",
            text: "text-blue-600",
        },

        green: {
            bg: "bg-green-100",
            text: "text-green-600",
        },

        red: {
            bg: "bg-red-100",
            text: "text-red-600",
        },

        yellow: {
            bg: "bg-yellow-100",
            text: "text-yellow-600",
        },

        purple: {
            bg: "bg-purple-100",
            text: "text-purple-600",
        },

        indigo: {
            bg: "bg-indigo-100",
            text: "text-indigo-600",
        },

        slate: {
            bg: "bg-slate-100",
            text: "text-slate-600",
        },
    };

    const selected = colorMap[color] || colorMap.blue;

    return (

        <div
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

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-slate-900">

                        {value}

                    </h2>

                </div>

                <div
                    className={`
                        h-14
                        w-14
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        ${selected.bg}
                        ${selected.text}
                    `}
                >

                    <Icon size={28} />

                </div>

            </div>

            <div className="mt-6 flex items-center text-sm text-green-600">

                <ArrowUpRight size={16} />

                <span className="ml-2">

                    Live Data

                </span>

            </div>

        </div>

    );

}