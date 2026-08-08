import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Building,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Sparkles,
  ArrowRight,
  Loader2,
  Droplets,
  ArrowLeft,
} from "lucide-react";

import { registerProperty } from "../services/propertyRegistrationService";
import AnimatedBackground from "../components/AnimatedBackground";

export default function RegisterApartment() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPersonName: "",
    email: "",
    phone: "",
    propertyType: "APARTMENT",
    numberOfApartments: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await registerProperty(formData);

      alert(response.message || "Property Registered Successfully!");
      console.log(response);

      setFormData({
        companyName: "",
        contactPersonName: "",
        email: "",
        phone: "",
        propertyType: "APARTMENT",
        numberOfApartments: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-cyan-500 selection:text-white flex items-center justify-center py-12 px-4">
      {/* Liquid Canvas Background */}
      <AnimatedBackground />

      {/* Main Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="
          relative
          z-10
          w-full
          max-w-3xl
          rounded-3xl
          border
          border-slate-800/90
          bg-slate-900/85
          backdrop-blur-2xl
          shadow-[0_25px_90px_rgba(0,0,0,0.6)]
          shadow-cyan-950/30
          p-8
          sm:p-10
          overflow-hidden
          text-white
        "
      >
        {/* Top Gradient Accent Highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400" />

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>{t("common.backToHome")}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-500/30 mx-auto mb-4">
            <Droplets size={28} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold mb-2">
            <Sparkles size={13} />
            <span>{t("register.badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("register.title")}
          </h1>

          <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
            {t("register.subtitle")}
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Company & Contact Person */}
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput
              icon={<Building size={18} />}
              label={t("register.companyName")}
              name="companyName"
              placeholder="e.g. Skyline Residency"
              value={formData.companyName}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <FormInput
              icon={<User size={18} />}
              label={t("register.contactPerson")}
              name="contactPersonName"
              placeholder="e.g. Alex Mercer"
              value={formData.contactPersonName}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* Email & Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput
              icon={<Mail size={18} />}
              label={t("register.officialEmail")}
              type="email"
              name="email"
              placeholder="admin@skyline.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <FormInput
              icon={<Phone size={18} />}
              label={t("register.phoneNumber")}
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* Property Type & Count */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {t("register.propertyType")}
              </label>
              <div className="relative group">
                <Building2
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors"
                />
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700/80
                    bg-slate-950/60
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-white
                    outline-none
                    transition-all
                    duration-300
                    focus:bg-slate-950/90
                    focus:border-cyan-400
                    focus:ring-4
                    focus:ring-cyan-500/15
                    disabled:opacity-50
                    cursor-pointer
                  "
                >
                  <option value="APARTMENT" className="bg-slate-900 text-white">{t("register.apartment")}</option>
                  <option value="VILLA" className="bg-slate-900 text-white">{t("register.villa")}</option>
                  <option value="GATED_COMMUNITY" className="bg-slate-900 text-white">{t("register.gatedCommunity")}</option>
                </select>
              </div>
            </div>

            <FormInput
              icon={<Building2 size={18} />}
              label={t("register.numberOfApartments")}
              type="number"
              min="1"
              step="1"
              name="numberOfApartments"
              placeholder="e.g. 150"
              value={formData.numberOfApartments}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* Complete Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {t("register.address")}
            </label>
            <div className="relative group">
              <MapPin
                size={18}
                className="absolute left-3.5 top-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors"
              />
              <textarea
                name="address"
                placeholder="Street address, landmark, area details..."
                value={formData.address}
                onChange={handleChange}
                disabled={loading}
                rows={3}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700/80
                  bg-slate-950/60
                  py-3
                  pl-10
                  pr-4
                  text-sm
                  text-white
                  placeholder-slate-500
                  outline-none
                  resize-none
                  transition-all
                  duration-300
                  focus:bg-slate-950/90
                  focus:border-cyan-400
                  focus:ring-4
                  focus:ring-cyan-500/15
                  disabled:opacity-50
                "
              />
            </div>
          </div>

          {/* City, State, Pincode */}
          <div className="grid sm:grid-cols-3 gap-4">
            <FormInput
              icon={<MapPin size={18} />}
              label={t("register.city")}
              name="city"
              placeholder="e.g. Mumbai"
              value={formData.city}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <FormInput
              icon={<MapPin size={18} />}
              label={t("register.state")}
              name="state"
              placeholder="e.g. Maharashtra"
              value={formData.state}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <FormInput
              icon={<MapPin size={18} />}
              label={t("register.pincode")}
              name="pincode"
              placeholder="400001"
              value={formData.pincode}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="
                group
                relative
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-4
                px-6
                rounded-xl
                font-extrabold
                text-white
                bg-gradient-to-r
                from-blue-600
                via-cyan-600
                to-blue-600
                bg-[length:200%_auto]
                hover:bg-right
                shadow-lg
                shadow-cyan-500/25
                hover:shadow-cyan-500/40
                transition-all
                duration-500
                active:scale-98
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-white" />
                  <span>{t("register.submitting")}</span>
                </>
              ) : (
                <>
                  <span>{t("register.submit")}</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </div>

          <p className="text-center text-[11px] text-slate-500 pt-2">
            {t("register.disclaimer")}
          </p>

        </form>
      </motion.div>
    </div>
  );
}

// Reusable Form Field Component
function FormInput({ icon, label, type = "text", name, placeholder, value, onChange, disabled, required, min, step }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative group">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors">
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
          min={min}
          step={step}
          className="
            w-full
            rounded-xl
            border
            border-slate-700/80
            bg-slate-950/60
            py-3
            pl-10
            pr-4
            text-sm
            text-white
            placeholder-slate-500
            outline-none
            transition-all
            duration-300
            focus:bg-slate-950/90
            focus:border-cyan-400
            focus:ring-4
            focus:ring-cyan-500/15
            disabled:opacity-50
          "
        />
      </div>
    </div>
  );
}