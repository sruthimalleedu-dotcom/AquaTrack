import { motion } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  Building2,
  MapPin,
  Layers,
  Sparkles,
  AlertCircle,
} from "lucide-react";

// ============================================
// Skeleton Loader Row
// ============================================
function SkeletonRow() {
  return (
    <tr className="border-t border-slate-100">
      {[1, 2, 3, 4, 5].map((i) => (
        <td key={i} className="px-7 py-5">
          <div className="h-4 rounded-lg bg-slate-100 animate-pulse" />
        </td>
      ))}
    </tr>
  );
}

// ============================================
// Main Component
// ============================================
export default function ApartmentTable({
  apartments,
  loading,
  onView,
  onEdit,
  onDelete,
}) {

  // ==========================================
  // Loading State
  // ==========================================
  if (loading) {
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-md shadow-slate-900/5">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              {["Apartment", "City", "State", "Buildings", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      </div>
    );
  }

  // ==========================================
  // Empty State
  // ==========================================
  if (!apartments.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          flex
          flex-col
          items-center
          justify-center
          gap-4
          rounded-3xl
          border
          border-slate-200/80
          border-dashed
          bg-white/80
          backdrop-blur-xl
          py-20
          text-center
          shadow-md
          shadow-slate-900/5
        "
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-500/30">
          <Building2 size={30} />
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-800">
            No Apartments Found
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 font-medium max-w-xs mx-auto">
            Create your first apartment community to start managing buildings and residents.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold">
          <Sparkles size={13} className="text-cyan-500" />
          Click "Create Apartment" to get started
        </div>
      </motion.div>
    );
  }

  // ==========================================
  // Table
  // ==========================================
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-md shadow-slate-900/5">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">

          {/* Table Head */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Building2 size={13} />
                  Apartment
                </span>
              </th>
              <th className="px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} />
                  City
                </span>
              </th>
              <th className="px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                State
              </th>
              <th className="px-7 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center justify-center gap-1.5">
                  <Layers size={13} />
                  Buildings
                </span>
              </th>
              <th className="px-7 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100/80">
            {apartments.map((apartment, idx) => (
              <motion.tr
                key={apartment.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.055, duration: 0.35, ease: "easeOut" }}
                className="group hover:bg-blue-50/40 transition-colors duration-200"
              >

                {/* Apartment Name */}
                <td className="px-7 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-sm shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                      <Building2 size={16} />
                    </div>
                    <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                      {apartment.apartmentName}
                    </span>
                  </div>
                </td>

                {/* City */}
                <td className="px-7 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600">
                    <MapPin size={14} className="text-slate-400" />
                    {apartment.city}
                  </span>
                </td>

                {/* State */}
                <td className="px-7 py-4 whitespace-nowrap text-sm font-medium text-slate-500">
                  {apartment.state}
                </td>

                {/* Buildings Count Badge */}
                <td className="px-7 py-4 text-center whitespace-nowrap">
                  <span className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-100 shadow-xs">
                    <Layers size={12} className="text-cyan-500" />
                    {apartment.totalBuildings}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-7 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">

                    {/* View */}
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onView(apartment)}
                      title="View"
                      className="
                        group/btn
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-600
                        hover:bg-blue-600
                        hover:text-white
                        hover:shadow-lg
                        hover:shadow-blue-500/30
                        transition-all
                        duration-200
                      "
                    >
                      <Eye size={16} />
                    </motion.button>

                    {/* Edit */}
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(apartment)}
                      title="Edit"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-50
                        text-emerald-600
                        hover:bg-emerald-600
                        hover:text-white
                        hover:shadow-lg
                        hover:shadow-emerald-500/30
                        transition-all
                        duration-200
                      "
                    >
                      <Pencil size={16} />
                    </motion.button>

                    {/* Delete */}
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(apartment)}
                      title="Delete"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-rose-50
                        text-rose-600
                        hover:bg-rose-600
                        hover:text-white
                        hover:shadow-lg
                        hover:shadow-rose-500/30
                        transition-all
                        duration-200
                      "
                    >
                      <Trash2 size={16} />
                    </motion.button>

                  </div>
                </td>

              </motion.tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Footer Count Strip */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-7 py-3.5">
        <p className="text-xs text-slate-500 font-medium">
          Showing{" "}
          <span className="font-bold text-slate-700">{apartments.length}</span>{" "}
          apartment{apartments.length !== 1 ? "s" : ""}
        </p>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <AlertCircle size={12} />
          Click a row action to manage
        </div>
      </div>
    </div>
  );
}