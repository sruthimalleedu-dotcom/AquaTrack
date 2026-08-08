import { motion } from "framer-motion";
import { Plus, Building2, Sparkles, ArrowUpRight } from "lucide-react";

export default function ApartmentHeader({ onCreate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="
        relative
        flex
        flex-col
        gap-5
        sm:flex-row
        sm:items-center
        sm:justify-between
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/80
        bg-white/80
        backdrop-blur-xl
        px-8
        py-7
        shadow-md
        shadow-slate-900/5
      "
    >
      {/* Ambient Corner Glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 w-36 h-36 bg-cyan-400/10 rounded-full blur-2xl" />

      {/* Left — Icon + Text */}
      <div className="flex items-center gap-5">
        {/* Icon Block */}
        <div className="
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-tr
          from-blue-600
          via-cyan-500
          to-teal-400
          text-white
          shadow-lg
          shadow-cyan-500/30
        ">
          <Building2 size={26} />
        </div>

        <div>
          {/* Label pill */}
          <div className="mb-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 text-[11px] font-bold tracking-wide uppercase">
            <Sparkles size={11} className="text-cyan-500" />
            Property Management
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Apartments
          </h1>

          <p className="mt-0.5 text-sm text-slate-500 font-medium">
            Manage and monitor all apartment communities in one place.
          </p>
        </div>
      </div>

      {/* Right — Create Button */}
      <motion.button
        onClick={onCreate}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="
          group
          relative
          inline-flex
          shrink-0
          items-center
          gap-2.5
          overflow-hidden
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          via-cyan-600
          to-blue-600
          bg-[length:200%_auto]
          hover:bg-right
          px-6
          py-3.5
          text-sm
          font-extrabold
          text-white
          shadow-lg
          shadow-cyan-500/25
          hover:shadow-cyan-500/40
          transition-all
          duration-500
          self-start
          sm:self-auto
        "
      >
        {/* Button shimmer sweep */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <span className="relative flex items-center gap-2">
          <Plus
            size={18}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
          <span>Create Apartment</span>
          <ArrowUpRight
            size={16}
            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          />
        </span>
      </motion.button>
    </motion.div>
  );
}