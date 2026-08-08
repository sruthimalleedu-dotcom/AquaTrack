import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  CircleHelp,
  LogOut,
} from "lucide-react";

export default function ProfileDropdown({ mobile = false }) {
  // ==========================================
  // Navigation
  // ==========================================

  const navigate = useNavigate();
  const { t } = useTranslation();

  // ==========================================
  // State
  // ==========================================

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // ==========================================
// Temporary User
// (Replace with Auth Context Later)
// ==========================================

const email =
  localStorage.getItem("email") ??
  "guest@aquatrack.com";

const role =
  localStorage.getItem("role") ??
  "SUPER_ADMIN";

// ==========================================
// User Information
// ==========================================

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
// Role Routing
// ==========================================

const rolePrefix = {
  SUPER_ADMIN: "/admin",
  PROPERTY_ADMIN: "/property",
  MANAGER: "/manager",
  RESIDENT: "/resident",
};

const basePath =
  rolePrefix[role] ?? "/";

// ==========================================
// Close Dropdown
// ==========================================

useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  }

  function handleEscape(event) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  document.addEventListener(
    "keydown",
    handleEscape
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

    document.removeEventListener(
      "keydown",
      handleEscape
    );
  };
}, []);

// ==========================================
// Menu Actions
// ==========================================

const handleProfile = () => {
  setOpen(false);
  navigate(`${basePath}/profile`);
};

const handleSettings = () => {
  setOpen(false);
  navigate(`${basePath}/settings`);
};

const handleHelp = () => {
  setOpen(false);
  navigate(`${basePath}/help`);
};

const handleLogout = () => {
  setOpen(false);

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");

  navigate("/login", {
    replace: true,
  });
};

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
    {/* ======================================
    Profile Trigger
====================================== */}

{mobile ? (

  /* ===============================
      Mobile Trigger
  =============================== */

  <motion.button
    type="button"
    onClick={() => setOpen((prev) => !prev)}
    whileTap={{ scale: 0.95 }}
    className="
      flex
      h-11
      w-11
      items-center
      justify-center

      rounded-full

      bg-gradient-to-br
      from-[#0EA5E9]
      to-[#06B6D4]

      text-sm
      font-bold
      text-white

      shadow-md
      shadow-[#0EA5E9]/20

      transition-all
      duration-200

      hover:shadow-lg
      active:scale-95
    "
  >
    {initials}
  </motion.button>

) : (

  /* ===============================
      Desktop Trigger
  =============================== */

  <motion.button
    type="button"
    onClick={() => setOpen((prev) => !prev)}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="
      group

      flex
      items-center
      gap-3

      rounded-2xl

      border
      border-[#E2E8F0]
      dark:border-slate-700

      bg-[#FFFFFF]
      dark:bg-slate-950

      px-4
      py-2

      shadow-sm

      text-slate-900
      dark:text-slate-100

      transition-all
      duration-300

      hover:border-[#0EA5E9]/40
      hover:bg-[#F8FAFC]
      dark:hover:bg-slate-900
      hover:shadow-md
      hover:shadow-[#0EA5E9]/10
      dark:hover:shadow-[#38BDF8]/10
    "
  >
    {/* Avatar */}

    <div className="relative">

      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center

          rounded-full

          bg-gradient-to-br
          from-[#0EA5E9]
          to-[#06B6D4]

          text-sm
          font-bold
          text-white

          shadow-md
          shadow-[#0EA5E9]/20

          transition-transform
          duration-300

          group-hover:scale-105
        "
      >
        {initials}
      </div>

      {/* Online Indicator */}

      <span
        className="
          absolute
          bottom-0
          right-0

          h-3
          w-3

          rounded-full

          border-2
          border-white

          bg-[#F8FAFC]/90
          blur-[0.5px]
        "
      />

      <span
        className="
          absolute
          bottom-0
          right-0

          h-3
          w-3

          rounded-full

          border-2
          border-white

          bg-[#10B981]
          animate-pulse
        "
      />

    </div>

    {/* User Details */}

    <div className="text-left">

      <h4 className="text-sm font-semibold capitalize text-[#0F172A] dark:text-[#F8FAFC]">
        {userName}
      </h4>

      <span
        className="
          mt-1
          inline-flex

          rounded-full

          bg-[#0EA5E9]/8
          dark:bg-cyan-400/10

          px-2.5
          py-0.5

          text-[10px]
          font-bold
          uppercase

          tracking-wider

          text-[#0EA5E9]
          dark:text-cyan-200
        "
      >
        {role.replaceAll("_", " ")}
      </span>

    </div>

    {/* Dropdown Icon */}

    <ChevronDown
      size={18}
      className={`
        transition-all
        duration-300

        ${
          open
            ? "rotate-180 text-[#0EA5E9]"
            : "text-[#475569] group-hover:text-[#0F172A]"
        }
      `}
    />

  </motion.button>

)}

{/* ======================================
    Dropdown
====================================== */}

<AnimatePresence>
  {open && (
    <motion.div
      initial={{
        opacity: 0,
        y: -8,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -8,
        scale: 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 28,
      }}
      className={`
        absolute
        z-50
        mt-3

        overflow-hidden

        rounded-2xl

        border
        border-[#E2E8F0]
        dark:border-slate-700

        bg-[#FFFFFF]/95
        dark:bg-slate-950/95
        backdrop-blur-xl

        shadow-2xl
        shadow-[#0F172A]/10
        dark:shadow-black/20

        ${
          mobile
            ? "right-0 w-80 max-w-[90vw]"
            : "right-0 w-72"
        }
      `}
    >

      {/* ===============================
          User Header
      =============================== */}

      <div className="border-b border-[#E2E8F0] px-5 py-4">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-full

              bg-gradient-to-br
              from-[#0EA5E9]
              to-[#06B6D4]

              text-base
              font-bold
              text-white

              shadow-lg
              shadow-[#0EA5E9]/20
            "
          >
            {initials}
          </div>

          <div className="min-w-0 flex-1">

            <h3 className="truncate text-sm font-semibold capitalize text-[#0F172A]">
              {userName}
            </h3>

            <p className="truncate text-xs text-[#475569]">
              {email}
            </p>

            <span
              className="
                mt-2
                inline-flex

                rounded-full

                bg-[#0EA5E9]/8

                px-2.5
                py-0.5

                text-[10px]
                font-semibold
                uppercase

                tracking-wider

                text-[#0EA5E9]
              "
            >
              {role.replaceAll("_", " ")}
            </span>

          </div>

        </div>

      </div>

      {/* ===============================
          Menu
      =============================== */}

      <div className="py-2">

        {/* My Profile */}

        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleProfile}
          className="
            group

            flex
            w-full
            items-center
            justify-between

            px-5
            py-3

            text-sm
            text-[#475569]
            dark:text-slate-200

            transition-all
            duration-200

            hover:bg-[#F8FAFC]
            dark:hover:bg-slate-800
            hover:text-[#0EA5E9]
            dark:hover:text-[#38BDF8]
          "
        >
          <div className="flex items-center gap-3">

            <User
              size={18}
              className="transition-transform group-hover:scale-110"
            />

            <span>{t("menu.profile")}</span>

          </div>

          <ChevronRight
            size={16}
            className="
              text-[#475569]

              transition-all
              duration-200

              group-hover:translate-x-1
              group-hover:text-[#0EA5E9]
            "
          />

        </motion.button>

      </div>

            {/* ===============================
                Footer
            =============================== */}

            <div className="border-t border-[#E2E8F0] p-2">

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="
                  group

                  flex
                  w-full
                  items-center
                  justify-between

                  rounded-xl

                  px-4
                  py-3

                  text-sm
                  font-medium

                  text-red-600
                  dark:text-red-300

                  transition-all
                  duration-200

                  hover:bg-red-50
                  dark:hover:bg-red-900/40
                  hover:text-red-700
                  dark:hover:text-red-100
                "
              >
                <div className="flex items-center gap-3">

                  <LogOut
                    size={18}
                    className="
                      transition-all
                      duration-200

                      group-hover:-translate-x-1
                    "
                  />

                  <span>{t("menu.logout")}</span>

                </div>

                <ChevronRight
                  size={16}
                  className="
                    transition-all
                    duration-200

                    group-hover:translate-x-1
                  "
                />

              </motion.button>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
        
    