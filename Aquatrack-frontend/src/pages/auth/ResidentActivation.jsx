import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, AlertCircle, CheckCircle2, Building, Home } from "lucide-react";

import residentInvitationService from "../../services/residentInvitationService";

import logo from "../../assets/logo.png";
import AnimatedBackground from "../../components/AnimatedBackground";
import LeftHero from "../../components/LeftHero";
import PasswordInput from "../../components/PasswordInput";
import LoadingButton from "../../components/LoadingButton";

export default function ResidentActivation() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  // ==========================================
  // State
  // ==========================================
  const [loading, setLoading] = useState(true);
  const [resident, setResident] = useState(null);
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ==========================================
  // Validate Invitation Token
  // ==========================================
  useEffect(() => {
    async function validate() {
      try {
        const response =
          await residentInvitationService.getActivationDetails(token);
        setResident(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Invalid or expired activation link."
        );
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      validate();
    } else {
      setLoading(false);
      setError("Activation token is missing.");
    }
  }, [token]);

  // ==========================================
  // Submit Handler
  // ==========================================
  const handleSubmit = async (event) => {
    event?.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);

      await residentInvitationService.activateResident({
        invitationToken: token,
        password,
        confirmPassword,
      });

      alert("Resident account activated successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to activate account.");
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // Loading Screen
  // ==========================================
  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 p-8 rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-slate-800 text-center text-white shadow-2xl">
          <Loader2 size={36} className="animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-sm font-medium text-slate-300">
            Validating resident activation link...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Error Screen
  // ==========================================
  if (error) {
    return (
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-6">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-red-500/30 text-center text-white shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Activation Error</h2>
          <p className="text-sm text-slate-400 mb-6">{error}</p>
          <Link
            to="/login"
            className="inline-block w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold transition"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // Main Activation View
  // ==========================================
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-cyan-500 selection:text-white">
      {/* Background Canvas */}
      <AnimatedBackground />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* Left Hero */}
        <LeftHero />

        {/* Right Form Card */}
        <div className="flex items-center justify-center p-6 sm:p-10 relative">
          
          {/* Background Neon Aura Pulse */}
          <div className="absolute -z-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-slate-800/90
              bg-slate-900/85
              backdrop-blur-2xl
              shadow-[0_25px_90px_rgba(0,0,0,0.6)]
              shadow-cyan-950/30
              transition-all
              duration-500
              p-8
              sm:p-10
              relative
              overflow-hidden
              text-white
            "
          >
            {/* Top Gradient Highlight Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400" />

            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center mb-6 relative"
            >
              <div className="absolute w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
              <img
                src={logo}
                alt="AquaTrack"
                className="w-20 h-20 drop-shadow-xl transform hover:scale-105 transition-transform duration-300 relative z-10"
              />
            </motion.div>

            {/* Heading */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3">
                <CheckCircle2 size={13} />
                <span>Resident Invitation Verified</span>
              </div>
              
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Activate Resident Portal
              </h1>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Welcome <strong className="text-cyan-300 font-semibold">{resident?.firstName} {resident?.lastName}</strong>!
              </p>
            </div>

            {/* Resident Assignment Details Box */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 p-4 text-xs space-y-2"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Building size={15} className="text-cyan-400" />
                <span className="text-slate-400">Apartment:</span>
                <span className="font-semibold text-white">{resident?.apartmentName || "N/A"}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300 pt-1.5 border-t border-slate-800/60">
                <Home size={15} className="text-cyan-400" />
                <span className="text-slate-400">House / Flat No:</span>
                <span className="font-semibold text-cyan-300">{resident?.houseNumber || "N/A"}</span>
              </div>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <PasswordInput
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  placeholder="Create Password"
                />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <PasswordInput
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={submitting}
                  placeholder="Confirm Password"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-2"
              >
                <LoadingButton
                  loading={submitting}
                  text="Activate Account"
                />
              </motion.div>

              {/* Footer & Security Status */}
              <div className="pt-4 border-t border-slate-800/80 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>256-Bit Encrypted Portal</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  © {new Date().getFullYear()} AquaTrack • All Rights Reserved
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}