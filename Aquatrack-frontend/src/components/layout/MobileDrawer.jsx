import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Droplets,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { menuConfig } from "../../config/menuConfig";

export default function MobileDrawer({
  open,
  onClose,
  role = "SUPER_ADMIN",
}) {
  const { t } = useTranslation();

  // ==========================================
  // Navigation
  // ==========================================

  const items =
    menuConfig?.[role]?.drawer ??
    menuConfig.SUPER_ADMIN.drawer;

  // ==========================================
  // Temporary User
  // (Replace with Auth User Later)
  // ==========================================

  const currentUser = {
    name: "Sanket Maity",
    initials: "SM",
    role,
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ======================================
              Overlay
          ====================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
          />

          {/* ======================================
              Drawer
          ====================================== */}

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 30,
            }}
            className="
              fixed
              inset-y-0
              left-0
              z-50

              flex
              flex-col

              w-[300px]
              sm:w-[340px]
              max-w-[85vw]

              bg-[#FFFFFF]

              shadow-2xl
            "
          >
            {/* ======================================
                Header
            ====================================== */}

            <div className="border-b border-[#E2E8F0] p-5">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-[#0EA5E9]/10 p-2">

                    <Droplets
                      size={24}
                      className="text-[#0EA5E9]"
                    />

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-[#0F172A]">
                      AquaTrack
                    </h2>

                    <p className="text-xs text-[#475569]">
                      Enterprise Water Management
                    </p>

                  </div>

                </div>

                <button
                  onClick={onClose}
                  className="
                    rounded-xl
                    p-2
                    transition
                    hover:bg-[#F8FAFC]
                  "
                >
                  <X size={20} />
                </button>

              </div>

            </div>

            {/* ======================================
                User Card
            ====================================== */}

            <div className="border-b border-[#E2E8F0] p-5">

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-full

                    bg-[#0EA5E9]

                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {currentUser.initials}
                </div>

                <div className="min-w-0">

                  <h4 className="truncate font-semibold text-[#0F172A]">
                    {currentUser.name}
                  </h4>

                  <p className="text-sm capitalize text-[#475569]">
                    {currentUser.role.replaceAll("_", " ").toLowerCase()}
                  </p>

                </div>

              </div>

            </div>

            {/* ======================================
                Navigation
            ====================================== */}

            <div className="flex-1 overflow-y-auto p-3">

              {items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                  >
                    {({ isActive }) => (
                      <div
                        className={`
                          mb-2

                          flex
                          items-center
                          justify-between

                          rounded-xl

                          border-l-4

                          px-4
                          py-3

                          transition-all
                          duration-200

                          ${
                            isActive
                              ? "border-[#0EA5E9] bg-[#0EA5E9]/8 text-[#0EA5E9] shadow-sm"
                              : "border-transparent text-[#475569] hover:bg-[#F8FAFC]"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">

                          <Icon
                            size={20}
                            strokeWidth={isActive ? 2.5 : 2}
                          />

                          <span className="font-medium">
                            {t(item.title)}
                          </span>

                        </div>

                        <ChevronRight size={18} />

                      </div>
                    )}
                  </NavLink>
                );
              })}

            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}