import { Mail } from "lucide-react";

export default function EmailInput({
    label = "Email",
    name,
    value,
    onChange,
    placeholder = "Enter your email",
    disabled = false,
    required = true,
}) {

    return (

        <div>

            {/* Label */}

            <label className="block mb-2 text-sm font-semibold text-slate-700">

                {label}

            </label>

            {/* Input Container */}

            <div className="relative">

                {/* Mail Icon */}

                <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                {/* Email Input */}

                <input
                    type="email"
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
                        pr-4
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

            </div>

        </div>

    );

}