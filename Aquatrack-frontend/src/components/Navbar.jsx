import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { Droplets, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import useTheme from "../hooks/useTheme";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        fixed top-0 left-0 w-full z-50
        bg-[#FFFFFF]/70 dark:bg-[#0F172A]/80
        backdrop-blur-xl border-b border-[#E2E8F0]/80 dark:border-[#334155]/80
        shadow-sm shadow-[#0F172A]/5
        text-[#0F172A] dark:text-[#F8FAFC]
        transition-all duration-300
      "
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-cyan-400 rounded-xl blur-md opacity-30 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />

            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0EA5E9] via-[#06B6D4] to-[#10B981] text-white shadow-md shadow-[#0EA5E9]/30 group-hover:scale-105 transition-transform duration-300">
              <Droplets size={22} />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-[#0EA5E9] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
              AquaTrack
            </span>
            <span className="text-[10px] font-semibold text-[#475569] dark:text-[#CBD5E1]/60 -mt-1 tracking-wider uppercase">
              {t("nav.waterPlatform")}
            </span>
          </div>
        </Link>

        <div className="hidden md:flex gap-7 items-center">
          <Link to="/" className="text-sm font-semibold text-[#475569] dark:text-[#CBD5E1] hover:text-[#0EA5E9] dark:hover:text-[#38BDF8] transition-colors">
            {t("common.home")}
          </Link>

          <Link to="/" className="text-sm font-semibold text-[#475569] dark:text-[#CBD5E1] hover:text-[#0EA5E9] dark:hover:text-[#38BDF8] transition-colors">
            {t("common.features")}
          </Link>

          <Link to="/" className="text-sm font-semibold text-[#475569] dark:text-[#CBD5E1] hover:text-[#0EA5E9] dark:hover:text-[#38BDF8] transition-colors">
            {t("common.about")}
          </Link>

          <LanguageSwitcher />

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
              p-2.5
              rounded-xl
              bg-[#F8FAFC]
              dark:bg-[#1E293B]
              text-[#475569]
              dark:text-warning
              hover:scale-105
              active:scale-95
              transition-all
              duration-200
              border
              border-[#E2E8F0]/80
              dark:border-[#334155]/80
            "
            title={t("common.themeToggle")}
          >
            {theme === "dark" ? <FaSun size={17} /> : <FaMoon size={17} />}
          </button>

          <Link
            to="/login"
            className="
              flex
              items-center
              gap-2
              bg-gradient-to-r
              from-[#0EA5E9]
              to-[#06B6D4]
              hover:from-[#0284c7]
              hover:to-[#0891b2]
              text-white
              font-semibold
              text-sm
              px-5
              py-2.5
              rounded-xl
              shadow-md
              shadow-[#0EA5E9]/25
              hover:shadow-lg
              hover:shadow-[#0EA5E9]/40
              transition-all
              duration-300
              active:scale-95
            "
          >
            <LogIn size={16} />
            <span>{t("common.login")}</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher className="hidden sm:flex" />
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] text-[#475569] dark:text-warning text-lg">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <button className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] text-xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="
              md:hidden
              border-t
              border-[#E2E8F0]/80
              dark:border-[#334155]/80
              bg-[#FFFFFF]/95
              dark:bg-[#0F172A]/95
              backdrop-blur-2xl
              px-6
              py-5
              flex
              flex-col
              gap-4
              shadow-xl
            "
          >
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#0EA5E9] dark:hover:text-[#38BDF8] py-1">
              {t("common.home")}
            </Link>

            <Link to="/" onClick={() => setMenuOpen(false)} className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#0EA5E9] dark:hover:text-[#38BDF8] py-1">
              {t("common.features")}
            </Link>

            <Link to="/" onClick={() => setMenuOpen(false)} className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#0EA5E9] dark:hover:text-[#38BDF8] py-1">
              {t("common.about")}
            </Link>

            <Link to="/login" onClick={() => setMenuOpen(false)} className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                bg-gradient-to-r
                from-[#0EA5E9]
                to-[#06B6D4]
                text-white
                font-semibold
                py-3
                rounded-xl
                shadow-md
                shadow-[#0EA5E9]/25
                mt-2
              ">
              <LogIn size={18} />
              <span>{t("common.login")}</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}