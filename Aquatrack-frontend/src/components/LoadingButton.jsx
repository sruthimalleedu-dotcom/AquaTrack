import { ArrowRight, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LoadingButton({ loading, text = "Submit" }) {
  const { t } = useTranslation();

  return (
    <button
      type="submit"
      disabled={loading}
      className="
        group
        relative
        w-full
        flex
        items-center
        justify-center
        gap-2
        py-3.5
        px-6
        rounded-xl
        font-semibold
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
          <span>{t("auth.loggingIn")}</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </>
      )}
    </button>
  );
}