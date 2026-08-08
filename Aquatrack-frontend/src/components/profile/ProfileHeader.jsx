import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProfileHeader() {
  // ==========================================
  // Navigation
  // ==========================================

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        flex
        items-center
        justify-between

        rounded-3xl

        border
        border-slate-200

        bg-white

        p-6

        shadow-sm
      "
    >
      {/* ===============================
          Left
      =============================== */}

      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate(-1)}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-xl

            border
            border-slate-200

            bg-slate-50

            transition-all
            duration-200

            hover:bg-cyan-50
            hover:border-cyan-300
            hover:text-cyan-600
          "
        >
          <ArrowLeft size={20} />
        </button>

        <div>

          <h1 className="text-2xl font-bold text-slate-900">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your account information
          </p>

        </div>

      </div>

    </motion.div>
  );
}