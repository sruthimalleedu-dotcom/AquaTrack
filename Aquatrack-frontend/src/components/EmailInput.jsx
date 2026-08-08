import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EmailInput({ value, onChange, disabled, name = "email" }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {t("auth.emailLabel")}
      </label>
      <div className="relative group">
        <Mail
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-200"
        />
        <input
          type="email"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="name@company.com"
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