import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
}) {
  const colorMap = {
    blue: {
      gradient: "from-blue-600 to-cyan-500 shadow-blue-500/25",
      aura: "bg-blue-500/10 group-hover:bg-cyan-500/20",
      badge: "text-blue-600 bg-blue-50 border-blue-200/80",
    },
    green: {
      gradient: "from-emerald-600 to-teal-500 shadow-emerald-500/25",
      aura: "bg-emerald-500/10 group-hover:bg-teal-500/20",
      badge: "text-emerald-600 bg-emerald-50 border-emerald-200/80",
    },
    red: {
      gradient: "from-rose-600 to-red-500 shadow-rose-500/25",
      aura: "bg-rose-500/10 group-hover:bg-red-500/20",
      badge: "text-rose-600 bg-rose-50 border-rose-200/80",
    },
    yellow: {
      gradient: "from-amber-500 to-yellow-500 shadow-amber-500/25",
      aura: "bg-amber-500/10 group-hover:bg-yellow-500/20",
      badge: "text-amber-600 bg-amber-50 border-amber-200/80",
    },
    purple: {
      gradient: "from-purple-600 to-indigo-500 shadow-purple-500/25",
      aura: "bg-purple-500/10 group-hover:bg-indigo-500/20",
      badge: "text-purple-600 bg-purple-50 border-purple-200/80",
    },
    indigo: {
      gradient: "from-indigo-600 to-blue-600 shadow-indigo-500/25",
      aura: "bg-indigo-500/10 group-hover:bg-blue-500/20",
      badge: "text-indigo-600 bg-indigo-50 border-indigo-200/80",
    },
    slate: {
      gradient: "from-slate-700 to-slate-900 shadow-slate-600/25",
      aura: "bg-slate-500/10 group-hover:bg-slate-700/20",
      badge: "text-slate-600 bg-slate-100 border-slate-200",
    },
  };

  const selected = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="
        group
        relative
        rounded-3xl
        border
        border-slate-200/80
        bg-white/80
        backdrop-blur-xl
        p-6
        shadow-sm
        hover:shadow-2xl
        hover:shadow-blue-500/10
        hover:border-slate-300
        transition-all
        duration-300
        overflow-hidden
        flex
        flex-col
        justify-between
      "
    >
      {/* Ambient Color Aura Glow Corner */}
      <div
        className={`pointer-events-none absolute -right-10 -bottom-10 w-28 h-28 rounded-full blur-2xl transition-all duration-500 ${selected.aura}`}
      />

      {/* Top Section */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-extrabold text-slate-900 tracking-tight">
            {value ?? 0}
          </h2>
        </div>

        {/* Gradient Icon Badge */}
        <div
          className={`
            flex
            h-14
            w-14
            flex-shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-tr
            ${selected.gradient}
            text-white
            shadow-lg
            group-hover:scale-110
            group-hover:rotate-6
            transition-transform
            duration-300
          `}
        >
          {Icon && <Icon size={26} />}
        </div>
      </div>

      {/* Bottom Live Data Indicator Pill */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Live Telemetry</span>
        </div>

        <span className="p-1 rounded-md text-slate-400 group-hover:text-slate-700 transition-colors">
          <ArrowUpRight size={15} />
        </span>
      </div>
    </motion.div>
  );
}