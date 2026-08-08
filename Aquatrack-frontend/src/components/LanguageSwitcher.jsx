import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "ml", label: "മലയാളം" },
];

export default function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
    localStorage.setItem("appLanguage", language);
    document.documentElement.lang = language;
  };

  return (
    <label className={`flex items-center gap-2 ${className}`.trim()}>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        {"language"}
      </span>
      <select
        value={i18n.language}
        onChange={changeLanguage}
        className="rounded-lg border border-slate-300 bg-white/90 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
