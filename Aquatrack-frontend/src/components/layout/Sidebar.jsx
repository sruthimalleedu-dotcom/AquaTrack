import { NavLink, useNavigate } from "react-router-dom";
import { Droplets } from "lucide-react";
import { useTranslation } from "react-i18next";

import { menuConfig } from "../../config/menuConfig";

export default function Sidebar({
  role = "SUPER_ADMIN",
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ==========================================
  // Navigation
  // ==========================================

  const menuItems =
    menuConfig?.[role]?.sidebar ??
    menuConfig.SUPER_ADMIN.sidebar;

  // ==========================================
  // Temporary User
  // (Replace after authentication)
  // ==========================================

  const currentUser = {
    name: "Sanket Maity",
    initials: "SM",
    role,
  };

  // ==========================================
  // Logout
  // ==========================================

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

        z-50

        flex
        h-screen
        w-72
        flex-col

        overflow-hidden

        border-r
        border-[#334155]/70

        bg-[#0F172A]/95
        backdrop-blur-xl

        text-[#F8FAFC]

        shadow-2xl
      "
    >
      {/* ======================================
          Background Glow
      ====================================== */}

      <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-[#06B6D4]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#0EA5E9]/10 blur-3xl" />

      {/* ======================================
          Logo
      ====================================== */}

      <div className="border-b border-[#334155]/70 px-7 py-6">

        <div className="flex items-center gap-4">

          <div className="relative">

            <div className="absolute inset-0 rounded-xl bg-[#0EA5E9] blur-md opacity-40" />

            <div
              className="
                relative

                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-xl

                bg-gradient-to-tr
                from-[#0EA5E9]
                to-[#06B6D4]

                shadow-lg
                shadow-[#0EA5E9]/20
              "
            >
              <Droplets size={24} />
            </div>

          </div>

          <div>

            <h2
              className="
                bg-gradient-to-r
                from-white
                via-slate-100
                to-slate-300
                bg-clip-text
                text-xl
                font-bold
                tracking-wide
                text-transparent
              "
            >
              AquaTrack
            </h2>

            <div className="mt-1 flex items-center gap-2">

              <div className="relative">

                <span className="block h-2 w-2 rounded-full bg-[#34D399]" />

                <span className="absolute inset-0 rounded-full bg-[#34D399] animate-ping opacity-70" />

              </div>

              <p className="text-xs text-[#CBD5E1]/70">
                {t("dashboard.enterprise")}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================
          Navigation
      ====================================== */}

      <nav
        className="
          flex-1
          overflow-y-auto

          px-4
          py-5

          space-y-1.5
        "
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.title === "menu.logout" || item.title === "Logout") {
            return (
              <button
                key={item.title}
                onClick={handleLogout}
                className="
                  group

                  flex
                  w-full
                  items-center
                  gap-3

                  rounded-xl

                  px-4
                  py-3

                  text-slate-400

                  transition-all

                  hover:bg-red-500/10
                  hover:text-red-400
                "
              >
                <Icon size={20} />

                <span className="text-sm font-medium">
                  {t("menu.logout")}
                </span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.title}
              to={item.path}
            >
              {({ isActive }) => (
                <div
                  className={`
                    group

                    relative

                    flex
                    items-center
                    gap-3

                    rounded-xl

                    border-l-4

                    px-4
                    py-3

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "border-[#38BDF8] bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white shadow-lg shadow-[#0EA5E9]/20"
                        : "border-transparent text-[#CBD5E1] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={`
                      transition-all

                      ${
                        isActive
                          ? "scale-110"
                          : "group-hover:scale-110 group-hover:text-[#38BDF8]"
                      }
                    `}
                  />

                  <span className="text-sm font-medium">
                    {t(item.title)}
                  </span>

                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ======================================
          Footer
      ====================================== */}

      <div className="border-t border-[#334155]/70 bg-[#020617]/40 p-4">

        <div className="flex items-center justify-between">

          <span className="text-xs text-[#CBD5E1]/50">
            © {new Date().getFullYear()} AquaTrack
          </span>

          <span
            className="
              rounded-full

              border
              border-[#38BDF8]/20

              bg-[#38BDF8]/10

              px-2
              py-0.5

              text-[10px]
              font-semibold

              text-[#38BDF8]
            "
          >
            Enterprise
          </span>

        </div>

      </div>

    </aside>
  );
}