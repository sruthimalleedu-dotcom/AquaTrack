import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command, Home } from "lucide-react";

export default function HouseholdSearchBar({ search, setSearch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        rounded-3xl
        border
        border-slate-200/80
        bg-white/80
        backdrop-blur-xl
        px-6
        py-5
        shadow-md
        shadow-slate-900/5
      "
    >
      <div className="flex items-center gap-4">

        {/* Search Field Wrapper */}
        <div className="relative flex-1 group">

          {/* Search Icon */}
          <Search
            size={18}
            className="
              absolute left-4 top-1/2 -translate-y-1/2
              text-slate-400
              group-focus-within:text-indigo-500
              transition-colors duration-300
              z-10
            "
          />

          {/* Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by house number, meter ID, building..."
            className="
              w-full
              rounded-2xl
              border border-slate-200
              bg-slate-50/60
              py-3.5 pl-11 pr-28
              text-sm text-slate-800
              placeholder-slate-400
              font-medium
              outline-none
              transition-all duration-300
              focus:bg-white
              focus:border-indigo-400
              focus:ring-4 focus:ring-indigo-500/10
              hover:border-slate-300
            "
          />

          {/* Right Accessories */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">

            {/* Clear Button */}
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setSearch("")}
                  className="
                    flex h-6 w-6 items-center justify-center
                    rounded-full
                    bg-slate-200 text-slate-500
                    hover:bg-rose-100 hover:text-rose-500
                    transition-all duration-200
                  "
                >
                  <X size={12} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ⌘K Shortcut Hint */}
            <AnimatePresence>
              {!search && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-mono font-semibold text-slate-400"
                >
                  <Command size={11} />
                  <span>K</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Live Indicator Pill */}
        <div className="hidden sm:flex shrink-0 items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 text-xs font-bold text-indigo-600">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-2 h-2 rounded-full bg-indigo-500"
          />
          Live Search
        </div>

        {/* Household Count Chip */}
        <div className="hidden lg:flex shrink-0 items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-500">
          <Home size={13} className="text-indigo-500" />
          Households
        </div>

      </div>

      {/* Contextual Hint */}
      <AnimatePresence>
        {search && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-3 text-[11px] text-slate-400 font-medium pl-1"
          >
            Showing results for{" "}
            <span className="text-indigo-600 font-bold">"{search}"</span> — press{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-500">
              Esc
            </kbd>{" "}
            to clear
          </motion.p>
        )}
      </AnimatePresence>

    </motion.div>
  );
}