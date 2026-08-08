import { motion } from "framer-motion";
import { FaTint, FaChartLine, FaBell } from "react-icons/fa";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaTint size={26} />,
      title: t("features.card1Title"),
      tag: t("features.card1Tag"),
      desc: t("features.card1Desc"),
    },
    {
      icon: <FaChartLine size={26} />,
      title: t("features.card2Title"),
      tag: t("features.card2Tag"),
      desc: t("features.card2Desc"),
    },
    {
      icon: <FaBell size={26} />,
      title: t("features.card3Title"),
      tag: t("features.card3Tag"),
      desc: t("features.card3Desc"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative py-28 px-6 bg-[#020617] text-[#F8FAFC] overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-[#06B6D4]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 -left-20 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06B6D4]/10 text-[#22D3EE] border border-[#06B6D4]/20 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles size={14} className="text-[#22D3EE]" />
            <span>{t("features.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            {t("features.heading")}{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#22D3EE] to-[#34D399] bg-clip-text text-transparent">
              AquaTrack
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-[#CBD5E1] leading-relaxed"
          >
            {t("features.subtitle")}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="
                group
                relative
                p-8
                rounded-3xl
                bg-[#0F172A]/80
                backdrop-blur-xl
                border
                border-[#334155]
                hover:border-[#0EA5E9]/40
                shadow-xl
                hover:shadow-2xl
                hover:shadow-[#0EA5E9]/10
                transition-all
                duration-500
                overflow-hidden
                flex
                flex-col
                justify-between
              "
            >
              <div className="pointer-events-none absolute -right-12 -bottom-12 w-36 h-36 bg-[#06B6D4]/10 rounded-full blur-2xl group-hover:bg-[#0EA5E9]/20 transition-colors duration-500" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0EA5E9] to-[#06B6D4] text-white shadow-lg shadow-[#0EA5E9]/25 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {f.icon}
                  </div>

                  <span className="p-2 rounded-xl bg-[#1E293B]/80 text-[#CBD5E1] group-hover:text-[#22D3EE] group-hover:bg-[#1E293B] transition-colors">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <span className="inline-block text-[11px] font-mono font-semibold text-[#22D3EE] uppercase tracking-wider mb-1">
                  {f.tag}
                </span>

                <h3 className="text-2xl font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                  {f.title}
                </h3>

                <p className="mt-3 text-sm text-[#CBD5E1] leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#334155]/60 flex items-center justify-between text-xs text-[#CBD5E1]/60">
                <span>{t("features.engine")}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] group-hover:animate-ping" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}