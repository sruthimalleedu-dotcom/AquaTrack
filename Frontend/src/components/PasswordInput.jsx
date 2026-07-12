import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordInput({
    label = "Password",
    name,
    value,
    onChange,
    placeholder = "Enter your password",
    disabled = false,
    required = true,
}) {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div>

            {/* Label */}

            <label className="block mb-2 text-sm font-semibold text-slate-700">

                {label}

            </label>

            {/* Input Container */}

            <div className="relative">

                {/* Lock Icon */}

                <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                {/* Password Input */}

                <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        bg-white/70
                        backdrop-blur-md
                        py-3
                        pl-11
                        pr-12
                        text-slate-800
                        placeholder:text-slate-400
                        outline-none
                        transition-all
                        duration-300
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                        disabled:bg-slate-100
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                    "
                />

                {/* Show / Hide Password */}

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={disabled}
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-500
                        hover:text-blue-600
                        transition
                        disabled:cursor-not-allowed
                    "
                >

                    {showPassword ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}

                </button>

            </div>

        </div>

    );

}