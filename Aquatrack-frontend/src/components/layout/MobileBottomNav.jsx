import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { menuConfig } from "../../config/menuConfig";

export default function MobileBottomNav({
  role = "SUPER_ADMIN",
}) {
  const { t } = useTranslation();

  // ==========================================
  // User
  // ==========================================

  const email =
    localStorage.getItem("email") ??
    "guest@aquatrack.com";

  const userName = email
    .split("@")[0]
    .replaceAll(".", " ");

  const initials = userName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // ==========================================
  // Menu
  // ==========================================

  const items =
    menuConfig?.[role]?.bottomNav ??
    menuConfig.SUPER_ADMIN.bottomNav;

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50

        border-t
        border-[#E2E8F0]/80

        bg-[#FFFFFF]/95
        backdrop-blur-xl

        shadow-[0_-10px_30px_rgba(15,23,42,0.08)]

        lg:hidden
      "
    >
      <div className="grid h-16 grid-cols-4 px-2">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
            >
              {({ isActive }) => (
                <div
                  className={`
                    flex
                    h-14
                    w-full
                    flex-col
                    items-center
                    justify-center

                    rounded-xl

                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-[#0EA5E9]/8 text-[#0EA5E9]"
                        : "text-[#475569] hover:text-[#0EA5E9]"
                    }
                  `}
                >
                  {/* Profile */}

                  {item.title === "menu.profile" || item.title === "Profile" ? (

                    <div
                      className={`
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center

                        rounded-full

                        text-[11px]
                        font-bold

                        transition-all

                        ${
                          isActive
                            ? "bg-[#0EA5E9] text-white"
                            : "bg-[#F8FAFC] text-[#475569]"
                        }
                      `}
                    >
                      {initials}
                    </div>

                  ) : (

                    <Icon
                      size={21}
                      strokeWidth={isActive ? 2.6 : 2}
                    />

                  )}

                  <span
                    className={`
                      mt-1

                      text-[10px]
                      font-semibold

                      leading-none

                      ${
                        isActive
                          ? "text-[#0EA5E9]"
                          : "text-[#475569]"
                      }
                    `}
                  >
                    {t(item.title)}
                  </span>

                </div>
              )}
            </NavLink>
          );
        })}

      </div>
    </nav>
  );
}