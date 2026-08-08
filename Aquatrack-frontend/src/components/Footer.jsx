import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Droplets, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <footer className="relative bg-[#020617] text-[#F8FAFC] pt-20 pb-12 px-6 overflow-hidden border-t border-[#334155]/80">
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[35rem] h-[35rem] bg-[#06B6D4]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-[#0EA5E9]/10 rounded-full blur-[100px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="grid md:grid-cols-12 gap-10 pb-16 border-b border-[#334155]/80">
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0EA5E9] via-[#06B6D4] to-[#10B981] text-white shadow-lg shadow-[#0EA5E9]/30">
                <Droplets size={22} />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#F8FAFC] via-[#CBD5E1] to-[#22D3EE] bg-clip-text text-transparent">
                AquaTrack
              </h2>
            </div>

            <p className="text-[#CBD5E1] text-sm leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F172A] border border-[#334155] text-[#CBD5E1] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <ShieldCheck size={13} className="text-[#34D399]" />
              <span>{t("footer.security")}</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F8FAFC]">
              {t("footer.quickNav")}
            </h3>

            <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
              <li>
                <Link to="/" className="hover:text-[#22D3EE] transition-colors inline-flex items-center gap-1 group">
                  <span className="transition-transform group-hover:translate-x-1">{t("common.home")}</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#22D3EE] transition-colors inline-flex items-center gap-1 group">
                  <span className="transition-transform group-hover:translate-x-1">{t("common.features")}</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#22D3EE] transition-colors inline-flex items-center gap-1 group">
                  <span className="transition-transform group-hover:translate-x-1">{t("footer.portalLogin")}</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F8FAFC]">
              {t("footer.connect")}
            </h3>
            <p className="text-xs text-[#CBD5E1]">
              {t("footer.connectText")}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#334155] text-[#CBD5E1] hover:text-[#22D3EE] hover:border-[#06B6D4]/40 hover:bg-[#1E293B] transition-all flex items-center justify-center text-lg active:scale-95 shadow-sm" title="GitHub">
                <FaGithub />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#334155] text-[#CBD5E1] hover:text-[#22D3EE] hover:border-[#06B6D4]/40 hover:bg-[#1E293B] transition-all flex items-center justify-center text-lg active:scale-95 shadow-sm" title="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#334155] text-[#CBD5E1] hover:text-[#22D3EE] hover:border-[#06B6D4]/40 hover:bg-[#1E293B] transition-all flex items-center justify-center text-lg active:scale-95 shadow-sm" title="Twitter">
                <FaTwitter />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AquaTrack Platform. {t("footer.rights")}</p>

          <div className="flex items-center gap-1 text-[#CBD5E1]/60">
            <span>{t("footer.builtBy")}</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}