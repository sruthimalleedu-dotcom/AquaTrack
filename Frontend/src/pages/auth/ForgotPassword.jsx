import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { forgotPassword } from "../../services/authService";
import logo from "../../assets/logo.png";
import AnimatedBackground from "../../components/AnimatedBackground";
import LeftHero from "../../components/LeftHero";
import EmailInput from "../../components/EmailInput";
import LoadingButton from "../../components/LoadingButton";

export default function ForgotPassword() {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
    });

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

    };

    const handleSubmit = async (event) => {

    event.preventDefault();

    try {

        setLoading(true);

        const response = await forgotPassword(
            formData.email
        );

        alert(response.message);

        setFormData({
            email: "",
        });

    } catch (error) {

        alert(

            error.response?.data?.message ||

            "Failed to send password reset link."

        );

    } finally {

        setLoading(false);

    }

};
    return (

        <div className="relative min-h-screen overflow-hidden">

            <AnimatedBackground />

            <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

                <LeftHero />

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
                            backdrop-blur-xl
                            shadow-[0_20px_80px_rgba(37,99,235,0.15)]
                            ring-1
                            ring-white/40
                            p-10
                        "
                    >

                        <div className="flex flex-col items-center mb-8">

                            <img
                                src={logo}
                                alt="AquaTrack"
                                className="w-20 h-20"
                            />

                        </div>

                        <div className="text-center mb-8">

                            <h1 className="text-3xl font-bold text-slate-900">
                                Forgot Password?
                            </h1>

                            <p className="mt-3 text-slate-500 leading-6">
                                Enter your registered email address and we'll
                                send you a secure password reset link.
                            </p>

                        </div>

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

                            <LoadingButton
                                loading={loading}
                                text="Send Reset Link"
                                loadingText="Sending..."
                            />

                            <div className="text-center">

                                <Link
                                    to="/login"
                                    className="
                                        text-blue-600
                                        hover:text-blue-700
                                        font-medium
                                    "
                                >
                                    ← Back to Login
                                </Link>

                            </div>

                        </form>

                    </motion.div>

                </div>

            </div>

        </div>

    );

}