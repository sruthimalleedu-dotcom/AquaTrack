import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function ProfileAvatar() {
  // ==========================================
  // Temporary User
  // (Replace with API/Auth Later)
  // ==========================================

  const email =
    localStorage.getItem("email") ||
    "guest@aquatrack.com";

  const role =
    localStorage.getItem("role") ||
    "SUPER_ADMIN";

  const userName = email.split("@")[0];

  const initials = userName
    .split(".")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.35 }}
      className="
        rounded-3xl
        border
        border-slate-200

        bg-white

        p-8

        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
        "
      >
        {/* ======================================
            Avatar
        ====================================== */}

        <div className="relative">

          <div
            className="
              flex
              h-28
              w-28
              items-center
              justify-center

              rounded-full

              bg-gradient-to-br
              from-blue-600
              to-cyan-500

              text-3xl
              font-bold
              text-white

              shadow-xl
              shadow-cyan-500/20
            "
          >
            {initials || <User size={42} />}
          </div>

          {/* Online Status */}

          <span
            className="
              absolute
              bottom-2
              right-2

              h-5
              w-5

              rounded-full

              border-4
              border-white

              bg-emerald-500

              animate-pulse
            "
          />

        </div>

        {/* ======================================
            User Details
        ====================================== */}

        <h2
          className="
            mt-6

            text-2xl
            font-bold

            capitalize

            text-slate-900
          "
        >
          {userName}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {email}
        </p>

        <span
          className="
            mt-4

            rounded-full

            bg-cyan-50

            px-4
            py-1.5

            text-xs
            font-bold
            uppercase

            tracking-wider

            text-cyan-700
          "
        >
          {role.replaceAll("_", " ")}
        </span>

      </div>
    </motion.div>
  );
}