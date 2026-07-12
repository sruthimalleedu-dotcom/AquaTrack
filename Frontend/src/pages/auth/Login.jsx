import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../../assets/logo.png";
import AnimatedBackground from "../../components/AnimatedBackground";
import LeftHero from "../../components/LeftHero";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import LoadingButton from "../../components/LoadingButton";
import { Link } from "react-router-dom";

import { login } from "../../services/authService";

export default function Login() {

    const navigate = useNavigate();

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

    // ==========================================
    // Super Admin
    // ==========================================

    case "SUPER_ADMIN":
        navigate("/admin/dashboard");
        break;

    // ==========================================
    // Property Admin
    // ==========================================

    case "PROPERTY_ADMIN":
        navigate("/property/dashboard");
        break;

    // ==========================================
    // Manager
    // ==========================================

    case "MANAGER":
        navigate("/manager/dashboard");
        break;

    // ==========================================
    // Resident
    // ==========================================

    case "RESIDENT":
        navigate("/resident/dashboard");
        break;

    // ==========================================
    // Default
    // ==========================================

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

        <div className="relative min-h-screen overflow-hidden">

            <AnimatedBackground />

            <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

                {/* Left Hero */}

                <LeftHero />

                {/* Right Section */}

                <div className="flex items-center justify-center p-6">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="
                            w-full
                            max-w-md
                            rounded-3xl
                            border
                            border-white/30
                            bg-white/70
                            shadow-[0_20px_80px_rgba(37,99,235,0.15)]
                            shadow-2xl
                            p-10
                        "
                    >

                        {/* Logo */}

                    <div className="flex flex-col items-center mb-8">
                        <img
                            src={logo}
                            alt="AquaTrack"
                            className="w-20 h-20 drop-shadow-lg"
                        />
                    </div>

                        {/* Heading */}

                        <div className="text-center mb-8">

                            <h1 className="text-3xl font-bold text-slate-900">
                                Welcome Back
                            </h1>

                            <p className="mt-3 text-slate-500 leading-6">
                                Sign in to access your secure AquaTrack dashboard and manage your apartment community effortlessly.
                            </p>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            <EmailInput
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            <PasswordInput
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            <div className="flex items-center justify-between">

                                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(e.target.checked)
                                        }
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />

                                    Remember Me

                                </label>

                                <Link to="/forgot-password"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                                >
                                    Forgot Password?
                                </Link>

                            </div>

                            <LoadingButton
                                loading={loading}
                                text="Login to Dashboard"
                            />

                            <div className="pt-2 text-center">

                                <p className="text-xs text-slate-500">
                                    © 2026 AquaTrack

                                    Secure • Reliable • Enterprise Ready
                                </p>

                            </div>

                        </form>

                    </motion.div>

                </div>

            </div>

        </div>

    );

}