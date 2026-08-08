import { motion } from "framer-motion";
import { CalendarDays, Sparkles, Zap } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative"
    >
      {/* Title & Animated Status */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {/* Animated Badge */}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 text-purple-600 border border-purple-500/20 shadow-sm"
          >
            <Sparkles size={13} className="text-purple-500 animate-spin" />
            <span>Super Admin Command Hub</span>
          </motion.span>

          {/* Live Ping Dot */}
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live System Active
          </span>
        </div>

        {/* Shimmer Text Gradient Heading */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 flex items-center gap-2">
          Super Admin{" "}
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent animate-gradient">
            Dashboard
          </span>
          <Zap size={24} className="text-amber-500 animate-bounce" />
        </h1>

        <p className="mt-1.5 text-sm text-slate-500 font-medium">
          Welcome back! Here's what's happening across your water networks today.
        </p>
      </div>

      {/* Interactive Spring Calendar Card */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="
          group
          relative
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-slate-200/90
          bg-white/80
          backdrop-blur-xl
          px-4
          py-3
          shadow-md
          shadow-blue-500/5
          hover:shadow-xl
          hover:shadow-blue-500/15
          hover:border-blue-400/50
          transition-all
          duration-300
          cursor-pointer
          self-start
          sm:self-auto
          overflow-hidden
        "
      >
        {/* Glow corner */}
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-cyan-500/25 transition-colors" />

        <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          <CalendarDays size={18} />
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Current Date
          </span>
          <span className="text-xs font-extrabold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
            {today}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}