import {
    Bell,
    Search,
    ChevronDown,
} from "lucide-react";

export default function Topbar() {

    const email = localStorage.getItem("email") || "Guest";

    const role = localStorage.getItem("role") || "USER";

    return (

        <header
            className="
                sticky
                top-0
                z-30
                bg-white/80
                backdrop-blur-xl
                border-b
                border-slate-200
                h-20
                flex
                items-center
                justify-between
                px-8
            "
        >

            {/* Left */}

            <div>

                <h1 className="text-2xl font-bold text-slate-900">

                    Dashboard

                </h1>

                <p className="text-sm text-slate-500">

                    Welcome back 👋

                </p>

            </div>

            {/* Right */}

            <div className="flex items-center gap-5">

                {/* Search */}

                <div className="relative hidden md:block">

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="
                            w-64
                            rounded-xl
                            border
                            border-slate-300
                            bg-slate-50
                            py-2.5
                            pl-10
                            pr-4
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-100
                        "
                    />

                </div>

                {/* Notification */}

                <button
                    className="
                        relative
                        p-3
                        rounded-xl
                        bg-slate-100
                        hover:bg-slate-200
                        transition
                    "
                >

                    <Bell size={20} />

                    <span
                        className="
                            absolute
                            right-2
                            top-2
                            h-2
                            w-2
                            rounded-full
                            bg-red-500
                        "
                    />

                </button>

                {/* Profile */}

                <button
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-slate-100
                        px-4
                        py-2
                        hover:bg-slate-200
                        transition
                    "
                >

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-600
                            text-white
                            font-bold
                        "
                    >

                        {email.charAt(0).toUpperCase()}

                    </div>

                    <div className="hidden lg:block text-left">

                        <p className="font-semibold text-slate-800">

                            {email}

                        </p>

                        <p className="text-xs text-slate-500">

                            {role}

                        </p>

                    </div>

                    <ChevronDown
                        size={18}
                        className="text-slate-500"
                    />

                </button>

            </div>

        </header>

    );

}