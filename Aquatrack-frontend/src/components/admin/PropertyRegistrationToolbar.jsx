import { motion } from "framer-motion";
import { Search, RotateCw, Filter } from "lucide-react";

export default function PropertyRegistrationToolbar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onRefresh,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        flex
        flex-col
        gap-4
        rounded-3xl
        border
        border-slate-200/80
        bg-white/80
        backdrop-blur-xl
        p-5
        shadow-md
        shadow-slate-900/5
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* ======================================
          Search Input Box
      ====================================== */}
      <div className="relative w-full lg:max-w-md group">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            group-focus-within:text-cyan-500
            group-focus-within:scale-110
            transition-all
            duration-300
          "
        />

        <input
          type="text"
          placeholder="Search company, contact person or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-slate-50/70
            py-3
            pl-11
            pr-4
            text-sm
            text-slate-800
            placeholder-slate-400
            outline-none
            transition-all
            duration-300
            focus:bg-white
            focus:border-cyan-400
            focus:ring-4
            focus:ring-cyan-500/10
            focus:shadow-md
          "
        />
      </div>

      {/* ======================================
          Right Actions: Status Select & Refresh
      ====================================== */}
      <div className="flex items-center gap-3">
        
        {/* Status Select */}
        <div className="relative flex-1 sm:flex-none">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="
              w-full
              sm:w-auto
              appearance-none
              rounded-2xl
              border
              border-slate-200
              bg-slate-50/70
              py-3
              pl-4
              pr-10
              text-xs
              font-bold
              text-slate-700
              outline-none
              cursor-pointer
              transition-all
              duration-300
              focus:bg-white
              focus:border-cyan-400
              focus:ring-4
              focus:ring-cyan-500/10
              hover:border-slate-300
            "
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          
          <Filter
            size={14}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className="
            group
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-2xl
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
            duration-300
            active:scale-95
          "
        >
          <RotateCw
            size={16}
            className="transition-transform duration-500 group-hover:rotate-180"
          />
          <span>Refresh</span>
        </button>

      </div>
    </motion.div>
  );
}