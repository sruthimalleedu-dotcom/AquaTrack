import { NavLink, useNavigate } from "react-router-dom";
import { Droplets } from "lucide-react";

import { menuConfig } from "../../config/menuConfig";

export default function Sidebar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const menuItems = menuConfig[role] || [];

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");

        navigate("/login");

    };

    return (

        <aside
            className="
                fixed
                left-0
                top-0
                h-screen
                w-72
                bg-slate-900
                text-white
                flex
                flex-col
                shadow-2xl
            "
        >

            {/* ==========================================
                Logo
            ========================================== */}

            <div className="flex items-center gap-3 px-8 py-7 border-b border-slate-800">

                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600">

                    <Droplets size={24} />

                </div>

                <div>

                    <h2 className="text-xl font-bold">

                        AquaTrack

                    </h2>

                    <p className="text-xs text-slate-400">

                        Water Management

                    </p>

                </div>

            </div>

            {/* ==========================================
                Menu
            ========================================== */}

            <nav className="flex-1 px-5 py-6 space-y-2">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    if (item.title === "Logout") {

                        return (

                            <button
                                key={item.title}
                                onClick={handleLogout}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    rounded-xl
                                    text-slate-300
                                    hover:bg-red-500
                                    hover:text-white
                                    transition-all
                                "
                            >

                                <Icon size={20} />

                                {item.title}

                            </button>

                        );

                    }

                    return (

                        <NavLink
                            key={item.title}
                            to={item.path}
                            className={({ isActive }) =>

                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`

                            }
                        >

                            <Icon size={20} />

                            {item.title}

                        </NavLink>

                    );

                })}

            </nav>

            {/* ==========================================
                Footer
            ========================================== */}

            <div className="border-t border-slate-800 p-5">

                <p className="text-xs text-center text-slate-500">

                    © {new Date().getFullYear()} AquaTrack

                </p>

            </div>

        </aside>

    );

}