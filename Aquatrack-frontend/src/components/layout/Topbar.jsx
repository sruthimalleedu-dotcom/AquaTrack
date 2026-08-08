import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import ProfileDropdown from "./ProfileDropdown";

export default function Topbar() {
  const { t } = useTranslation();

  // ==========================================
  // Temporary User
  // (Replace with Auth Later)
  // ==========================================

  const email =
    localStorage.getItem("email") ??
    "guest@aquatrack.com";

  const userName = email
    .split("@")[0]
    .replaceAll(".", " ");

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="
        sticky
        top-0
        z-30

        flex
        items-center
        justify-between

        h-20

        border-b
        border-[#E2E8F0]/70

        bg-[#FFFFFF]/85
        backdrop-blur-xl

        px-8

        shadow-sm
      "
    >
      {/* ======================================
          Left Section
      ====================================== */}

      <div>

        <div className="flex items-center gap-2">

          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
            {t("dashboard.title")}
          </h1>

          <Sparkles
            size={18}
            className="text-amber-500 animate-pulse"
          />

        </div>

        <p className="mt-1 text-sm text-[#475569]">

          {t("dashboard.welcome")}

          <span className="ml-1 font-semibold capitalize text-[#0F172A]">
            {userName}
          </span>

          <span className="ml-1">👋</span>

        </p>

      </div>

      {/* ======================================
          Right Section
      ====================================== */}

      <ProfileDropdown />

    </motion.header>
  );
}