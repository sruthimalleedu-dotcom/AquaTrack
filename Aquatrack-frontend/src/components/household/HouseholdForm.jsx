import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Layers,
  Hash,
  Gauge,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

import householdService from "../../services/householdService";

// ============================================
// Reusable Dark Select
// ============================================
function ModalSelect({
  icon,
  label,
  name,
  value,
  onChange,
  disabled,
  required,
  children,
  error,
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
        {required && <span className="ml-1 text-cyan-500">*</span>}
      </label>
      <div className="relative group">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-300 z-10 pointer-events-none">
          {icon}
        </span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            w-full appearance-none rounded-3xl
            border border-slate-700/80
            bg-slate-950/95
            py-3 pl-10 pr-10
            text-sm text-slate-100
            outline-none
            transition-all duration-300
            focus:border-cyan-400
            focus:ring-4 focus:ring-cyan-500/15
            disabled:opacity-50
            cursor-pointer
          "
        >
          {children}
        </select>
        <ChevronDown
          size={15}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none transition-colors group-focus-within:text-indigo-400"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-400"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// Reusable Dark Input
// ============================================
function ModalInput({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  required,
  error,
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
        {required && <span className="ml-1 text-cyan-500">*</span>}
      </label>
      <div className="relative group">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-300">
          {icon}
        </span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="
            w-full rounded-3xl
            border border-slate-700/80
            bg-slate-950/95
            py-3 pl-10 pr-4
            text-sm text-slate-100 placeholder-slate-500
            outline-none
            transition-all duration-300
            focus:border-cyan-400
            focus:ring-4 focus:ring-cyan-500/15
            disabled:opacity-50
          "
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-400"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// Main Component
// ============================================
export default function HouseholdForm({ formData, setFormData, errors = {} }) {
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingFloors, setLoadingFloors] = useState(false);

  // ==========================================
  // Load Buildings
  // ==========================================
  useEffect(() => {
    loadBuildings();
  }, []);

  const loadBuildings = async () => {
    try {
      setLoadingBuildings(true);
      const response = await householdService.getManagerBuildings();
      setBuildings(response);
    } catch (error) {
      console.error("Load Buildings Error:", error);
    } finally {
      setLoadingBuildings(false);
    }
  };

  // ==========================================
  // Load Floors on Building Change
  // ==========================================
  useEffect(() => {
    if (!formData.buildingId) {
      setFloors([]);
      return;
    }
    loadFloors(formData.buildingId);
  }, [formData.buildingId]);

  const loadFloors = async (buildingId) => {
    try {
      setLoadingFloors(true);
      const response = await householdService.getManagerFloors(buildingId);
      setFloors(response);
    } catch (error) {
      console.error("Load Floors Error:", error);
    } finally {
      setLoadingFloors(false);
    }
  };

  // ==========================================
  // Input Change
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "buildingId") {
      setFormData({ ...formData, buildingId: value, floorId: "" });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // ==========================================
  // Status Toggle
  // ==========================================
  const handleStatusToggle = (status) => {
    setFormData({ ...formData, status });
  };

  // ==========================================
// UI
// ==========================================
return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.35 }}
    className="space-y-6 rounded-3xl border border-slate-800/90 bg-slate-950/95 p-6 shadow-[0_30px_60px_rgba(15,23,42,0.25)]"
  >
    {/* ==========================================
        Building
    ========================================== */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <ModalSelect
        icon={
          loadingBuildings ? (
            <Loader2
              size={17}
              className="animate-spin text-cyan-400"
            />
          ) : (
            <Building2 size={17} />
          )
        }
        label="Building"
        name="buildingId"
        value={String(formData.buildingId ?? "")}
        onChange={handleChange}
        disabled={loadingBuildings}
        required
        error={errors.buildingId}
      >
        <option value="" className="bg-slate-900 text-slate-400">
          {loadingBuildings
            ? "Loading buildings..."
            : "Select Building"}
        </option>

        {buildings.map((building) => (
          <option
            key={building.id}
            value={String(building.id)}
            className="bg-slate-900 text-white"
          >
            {building.buildingName}
          </option>
        ))}
      </ModalSelect>
    </motion.div>

    {/* ==========================================
        Floor
    ========================================== */}

    <AnimatePresence>
      {formData.buildingId && (
        <motion.div
          key="floor"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <ModalSelect
            icon={
              loadingFloors ? (
                <Loader2
                  size={17}
                  className="animate-spin text-cyan-400"
                />
              ) : (
                <Layers size={17} />
              )
            }
            label="Floor"
            name="floorId"
            value={String(formData.floorId ?? "")}
            onChange={handleChange}
            disabled={!formData.buildingId || loadingFloors}
            required
            error={errors.floorId}
          >
            <option value="" className="bg-slate-900 text-slate-400">
              {loadingFloors
                ? "Loading floors..."
                : "Select Floor"}
            </option>

            {floors.map((floor) => (
              <option
                key={floor.id}
                value={String(floor.id)}
                className="bg-slate-900 text-white"
              >
                {floor.floorName}
              </option>
            ))}
          </ModalSelect>
        </motion.div>
      )}
    </AnimatePresence>
          {/* ==========================================
        House Number
    ========================================== */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <ModalInput
        icon={<Hash size={17} />}
        label="House Number"
        name="houseNumber"
        placeholder="e.g. A-101"
        value={formData.houseNumber}
        onChange={handleChange}
        required
        error={errors.houseNumber}
      />
    </motion.div>

    {/* ==========================================
        Meter Number
    ========================================== */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <ModalInput
        icon={<Gauge size={17} />}
        label="Meter Number"
        name="meterNumber"
        placeholder="e.g. MTR-00123"
        value={formData.meterNumber}
        onChange={handleChange}
        required
        error={errors.meterNumber}
      />
    </motion.div>

    {/* ==========================================
        Status
    ========================================== */}

    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-2 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4"
    >
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
        Status <span className="ml-1 text-cyan-500">*</span>
      </label>

      <div className="grid grid-cols-2 gap-3">

        {/* ACTIVE */}

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStatusToggle("ACTIVE")}
          className={`
            flex items-center justify-center gap-2
            rounded-xl
            border
            py-3
            text-sm
            font-semibold
            transition-all
            duration-300

            ${
              formData.status === "ACTIVE"
                ? "border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-lg shadow-emerald-500/10"
                : "border-slate-700 bg-slate-950/60 text-slate-400 hover:border-slate-600"
            }
          `}
        >
          <CheckCircle2 size={16} />

          Active
        </motion.button>

        {/* INACTIVE */}

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStatusToggle("INACTIVE")}
          className={`
            flex items-center justify-center gap-2
            rounded-xl
            border
            py-3
            text-sm
            font-semibold
            transition-all
            duration-300

            ${
              formData.status === "INACTIVE"
                ? "border-rose-500 bg-rose-500/15 text-rose-400 shadow-lg shadow-rose-500/10"
                : "border-slate-700 bg-slate-950/60 text-slate-400 hover:border-slate-600"
            }
          `}
        >
          <XCircle size={16} />

          Inactive
        </motion.button>

      </div>
    </motion.div>
  </motion.div>
  );
}
