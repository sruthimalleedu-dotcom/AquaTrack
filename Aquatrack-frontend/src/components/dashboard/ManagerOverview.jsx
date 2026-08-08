import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Users, Sparkles, ArrowRight } from "lucide-react";

export default function ManagerOverview({ summary }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="
        group
        relative
        rounded-3xl
        border
        border-slate-200/80
        bg-white/80
        backdrop-blur-xl
        p-7
        shadow-md
        shadow-slate-900/5
        hover:shadow-2xl
        hover:shadow-blue-500/10
        transition-all
        duration-300
        overflow-hidden
      "
    >
      {/* Ambient Color Glow Corner */}
      <div className="pointer-events-none absolute -right-12 -bottom-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />

      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Manager Overview
            <Sparkles size={16} className="text-blue-500" />
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 font-medium">
            Summary of assigned households and active residents
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          <Home size={24} />
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Total Households */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl bg-slate-50/80 border border-slate-200/70 p-5 shadow-xs transition-transform"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Households</span>
            <Home size={18} className="text-blue-500" />
          </div>
          <h3 className="mt-2.5 text-4xl font-extrabold text-slate-900 tracking-tight">
            {summary?.totalHouseholds ?? 0}
          </h3>
        </motion.div>

        {/* Total Residents */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl bg-blue-50/80 border border-blue-200/80 p-5 text-blue-900 shadow-xs transition-transform"
        >
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-bold uppercase tracking-wider">Total Residents</span>
            <Users size={18} className="text-blue-600" />
          </div>
          <h3 className="mt-2.5 text-4xl font-extrabold text-blue-700 tracking-tight">
            {summary?.totalResidents ?? 0}
          </h3>
        </motion.div>

      </div>

      {/* Action Buttons Row */}
      <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-4">
        <Link
          to="/manager/households"
          className="
            group/btn
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            hover:from-blue-700
            hover:to-cyan-600
            px-5
            py-3
            text-xs
            font-extrabold
            text-white
            shadow-md
            shadow-cyan-500/20
            hover:shadow-lg
            hover:shadow-cyan-500/35
            transition-all
            duration-200
            active:scale-95
          "
        >
          <Home size={16} />
          <span>Manage Households</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>

        <Link
          to="/manager/residents"
          className="
            group/btn
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-emerald-600
            to-teal-500
            hover:from-emerald-700
            hover:to-teal-600
            px-5
            py-3
            text-xs
            font-extrabold
            text-white
            shadow-md
            shadow-emerald-500/20
            hover:shadow-lg
            hover:shadow-emerald-500/35
            transition-all
            duration-200
            active:scale-95
          "
        >
          <Users size={16} />
          <span>Manage Residents</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
}