import { motion } from "framer-motion";
import { Menu, Droplets } from "lucide-react";

import ProfileDropdown from "./ProfileDropdown";

export default function MobileTopbar({ onMenuClick }) {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="
        fixed
        inset-x-0
        top-0
        z-40

        flex
        items-center
        justify-between

        h-[68px]

        border-b
        border-[#E2E8F0]/80

        bg-[#FFFFFF]/95
        backdrop-blur-xl

        px-4

        shadow-sm
      "
    >
      {/* ======================================
          Left Section
      ====================================== */}

      <div className="flex items-center gap-3">

        {/* Menu Button */}

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open Navigation Menu"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-xl

            text-[#475569]

            transition-all
            duration-200

            hover:bg-[#F8FAFC]
            active:scale-95
          "
        >
          <Menu size={24} />
        </button>

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              bg-gradient-to-br
              from-[#0EA5E9]
              to-[#06B6D4]

              text-white

              shadow-md
              shadow-[#0EA5E9]/20
            "
          >
            <Droplets size={20} />
          </div>

          <div className="leading-tight">

            <h1
              className="
                whitespace-nowrap

                text-lg
                font-bold
                tracking-tight

                text-[#0F172A]
              "
            >
              AquaTrack
            </h1>

            <p
              className="
                whitespace-nowrap

                text-[11px]

                text-[#475569]
              "
            >
              Enterprise Water Management
            </p>

          </div>

        </div>

      </div>

      {/* ======================================
          Right Section
      ====================================== */}

      <ProfileDropdown mobile />

    </motion.header>
  );
}