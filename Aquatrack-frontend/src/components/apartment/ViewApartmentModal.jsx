import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  MapPin,
  Layers,
  Home,
  Sparkles,
  AlertCircle,
  Hash,
  Navigation,
} from "lucide-react";

import { getApartmentById } from "../../services/apartmentService";

// ============================================
// Skeleton Info Tile
// ============================================
function SkeletonTile() {
  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-800/40 p-5 space-y-3 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-slate-700" />
        <div className="h-3 w-24 rounded-lg bg-slate-700" />
      </div>
      <div className="h-5 w-32 rounded-lg bg-slate-700" />
    </div>
  );
}

// ============================================
// Info Tile
// ============================================
function InfoTile({ icon: Icon, label, value, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-800/60
        bg-slate-800/40
        p-5
        hover:border-cyan-500/30
        hover:bg-slate-800/70
        transition-all
        duration-300
      "
    >
      {/* Corner ambient glow */}
      <div className="pointer-events-none absolute -bottom-6 -right-6 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/15 transition-all duration-500" />

      <div className="flex items-center gap-3 mb-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr ${gradient} text-white shadow-md`}>
          <Icon size={16} />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>

      <p className="text-base font-bold text-white truncate">
        {value || <span className="text-slate-500 font-normal italic">—</span>}
      </p>
    </motion.div>
  );
}

// ============================================
// Main Component
// ============================================
export default function ViewApartmentModal({ open, apartmentId, onClose }) {
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && apartmentId) {
      loadApartment();
    }
  }, [open, apartmentId]);

  async function loadApartment() {
    try {
      setLoading(true);
      setError("");
      const response = await getApartmentById(apartmentId);
      setApartment(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load apartment.");
    } finally {
      setLoading(false);
    }
  }

  const fields = apartment
    ? [
        {
          icon: Building2,
          label: "Apartment Name",
          value: apartment.apartmentName,
          gradient: "from-blue-600 to-cyan-500 shadow-blue-500/20",
        },
        {
          icon: Layers,
          label: "Total Buildings",
          value: apartment.totalBuildings,
          gradient: "from-emerald-600 to-teal-500 shadow-emerald-500/20",
        },
        {
          icon: Navigation,
          label: "City",
          value: apartment.city,
          gradient: "from-violet-600 to-indigo-500 shadow-violet-500/20",
        },
        {
          icon: MapPin,
          label: "State",
          value: apartment.state,
          gradient: "from-pink-600 to-rose-500 shadow-pink-500/20",
        },
        {
          icon: Hash,
          label: "Pincode",
          value: apartment.pincode,
          gradient: "from-amber-500 to-orange-500 shadow-amber-500/20",
        },
        {
          icon: MapPin,
          label: "Address Line 1",
          value: apartment.addressLine1,
          gradient: "from-cyan-600 to-sky-500 shadow-cyan-500/20",
        },
        {
          icon: MapPin,
          label: "Address Line 2",
          value: apartment.addressLine2 || "—",
          gradient: "from-slate-600 to-slate-500 shadow-slate-500/20",
        },
      ]
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="view-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            key="view-card"
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 32 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="
              relative
              w-full
              max-w-2xl
              overflow-hidden
              rounded-3xl
              border
              border-slate-800/90
              bg-slate-900/95
              backdrop-blur-2xl
              shadow-[0_30px_100px_rgba(0,0,0,0.7)]
              shadow-cyan-950/40
              text-white
            "
          >
            {/* Top Gradient Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400" />

            {/* Ambient Glow Orbs */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-cyan-500/8 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 w-40 h-40 bg-blue-500/8 rounded-full blur-2xl" />

            {/* Scrollable Body */}
            <div className="relative overflow-y-auto max-h-[90vh]">

              {/* ================================
                  Header
              ================================ */}
              <div className="flex items-start justify-between p-8 pb-6">
                <div className="flex items-center gap-4">
                  <div className="
                    flex h-13 w-13 shrink-0 items-center justify-center
                    rounded-2xl
                    bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400
                    text-white shadow-lg shadow-cyan-500/30
                    p-3
                  ">
                    <Building2 size={24} />
                  </div>

                  <div>
                    <div className="mb-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-bold tracking-wide uppercase">
                      <Sparkles size={11} />
                      Property Details
                    </div>
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">
                      Apartment Details
                    </h2>
                    <p className="text-sm text-slate-400 font-medium">
                      Full information for this property record.
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={onClose}
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl bg-slate-800 text-slate-400
                    hover:bg-rose-500/20 hover:text-rose-400
                    border border-slate-700/80
                    transition-colors duration-200
                  "
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Divider */}
              <div className="mx-8 border-t border-slate-800/80" />

              {/* ================================
                  Body
              ================================ */}
              <div className="p-8 pt-6">

                {/* Loading Skeletons */}
                {loading && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <SkeletonTile key={i} />
                    ))}
                  </div>
                )}

                {/* Error */}
                {!loading && error && (
                  <div className="flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-5 py-4 text-rose-400 text-sm font-medium">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Info Grid */}
                {!loading && apartment && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {fields.map((field, idx) => (
                      <InfoTile
                        key={field.label}
                        icon={field.icon}
                        label={field.label}
                        value={field.value}
                        gradient={field.gradient}
                        delay={idx * 0.06}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* ================================
                  Footer
              ================================ */}
              <div className="flex items-center justify-between border-t border-slate-800/80 px-8 py-5">
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <Home size={13} />
                  AquaTrack Property Registry
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="
                    px-6 py-2.5 rounded-xl
                    bg-slate-800
                    border border-slate-700
                    text-sm font-bold text-slate-300
                    hover:bg-slate-700 hover:text-white
                    transition-all duration-200
                  "
                >
                  Close
                </motion.button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}