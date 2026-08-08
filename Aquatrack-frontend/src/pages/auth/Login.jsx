import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import logo from "../../assets/logo.png";
import AnimatedBackground from "../../components/AnimatedBackground";
import LeftHero from "../../components/LeftHero";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import LoadingButton from "../../components/LoadingButton";

import { login } from "../../services/authService";

export default function Login() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    // ==========================
    // State
    // ==========================
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // ==========================
    // Handle Input Change
    // ==========================
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // ==========================
    // Handle Login
    // ==========================
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            const response = await login(formData);
            const auth = response.data;

            localStorage.setItem("token", auth.token);
            localStorage.setItem("role", auth.role);
            localStorage.setItem("email", auth.email);

            switch (auth.role) {
                case "SUPER_ADMIN":
                    navigate("/admin/dashboard");
                    break;
                case "PROPERTY_ADMIN":
                    navigate("/property/dashboard");
                    break;
                case "MANAGER":
                    navigate("/manager/dashboard");
                    break;
                case "RESIDENT":
                    navigate("/resident/dashboard");
                    break;
                default:
                    navigate("/login");
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================
    // UI
    // ==========================
    return (
        <div className="relative min-h-screen overflow-hidden selection:bg-cyan-500 selection:text-white">
            {/* Animated Canvas Background */}
            <AnimatedBackground />

            <div className="relative z-10 grid min-h-screen md:grid-cols-2">
                {/* Left Hero Section */}
                <LeftHero />

                {/* Right Form Section */}
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
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-extrabold text-white tracking-tight">
                                {t("auth.welcomeBack")}
                            </h1>
                            <p className="mt-2.5 text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
                                {t("auth.welcomeSubtitle")}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <motion.div 
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <EmailInput
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </motion.div>

                            <motion.div 
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <PasswordInput
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </motion.div>

                            {/* Remember Me & Forgot Password */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center justify-between pt-1"
                            >
                                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900 transition cursor-pointer"
                                    />
                                    <span className="group-hover:text-white transition-colors">
                                        {t("auth.rememberMe")}
                                    </span>
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
                                >
                                    {t("auth.forgotPassword")}
                                </Link>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="pt-2"
                            >
                                <LoadingButton
                                    loading={loading}
                                    text={t("auth.loginButton")}
                                />
                            </motion.div>

                            {/* Footer & Security Status */}
                            <div className="pt-4 border-t border-slate-800/80 text-center">
                                <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <ShieldCheck size={13} className="text-emerald-400" />
                                    <span>{t("common.securityBadge")}</span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-1">
                                    © {new Date().getFullYear()} AquaTrack • {t("common.rightsReserved")}
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}