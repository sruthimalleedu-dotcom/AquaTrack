import { Loader2, ArrowRight } from "lucide-react";

export default function LoadingButton({
  loading = false,
  text = "Continue",
  loadingText = "Please wait...",
  type = "submit",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className={`
        w-full
        h-14
        rounded-xl
        flex
        items-center
        justify-center
        gap-3
        font-semibold
        text-white
        transition-all
        duration-300
        shadow-lg

        ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
        }
      `}
    >
      {loading ? (
        <>
          <Loader2
            className="animate-spin"
            size={20}
          />

          {loadingText}
        </>
      ) : (
        <>
          {text}

          <ArrowRight size={18} />
        </>
      )}
    </button>
  );
}