import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { resetPassword } from "../../services/authService";
import AnimatedBackground from "../../components/AnimatedBackground";
import LeftHero from "../../components/LeftHero";
import PasswordInput from "../../components/PasswordInput";
import LoadingButton from "../../components/LoadingButton";

export default function ResetPassword() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        try {

    setLoading(true);

    const response = await resetPassword(

        token,

        formData.newPassword,

        formData.confirmPassword

    );

    alert(response.message);

    navigate("/login");

} catch (error) {

    console.error(error);

    alert(

        error.response?.data?.message ||

        "Failed to reset password."

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
                        className="w-full max-w-md rounded-3xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-[0_20px_80px_rgba(37,99,235,0.15)] ring-1 ring-white/40 p-10"
                    >

                        <div className="text-center mb-8">

                            <h1 className="text-3xl font-bold text-slate-900">
                                Reset Password
                            </h1>

                            <p className="mt-3 text-slate-500">
                                Create a new password for your AquaTrack account.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            <PasswordInput
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="New Password"
                            />

                            <PasswordInput
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                            />

                            <LoadingButton
                                loading={loading}
                                text="Reset Password"
                                loadingText="Updating..."
                            />

                            <div className="text-center">

                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
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