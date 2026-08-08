import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function DashboardPreview() {
  const { t } = useTranslation();

  return (
    <section
      className="
        py-24 px-6
        bg-sky-50 dark:bg-gray-950
        transition-all duration-300
      "
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="
          text-3xl md:text-4xl font-bold text-center
          text-gray-900 dark:text-white
        "
      >
        {t("landing.previewTitle")}
      </motion.h2>

      <p className="
        text-center mt-4 text-gray-600 dark:text-gray-300
      ">
        {t("landing.previewSubtitle")}
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
          mt-12 max-w-5xl mx-auto
          rounded-2xl overflow-hidden
          shadow-2xl
          bg-white dark:bg-gray-900
          border border-gray-100 dark:border-gray-800
        "
      >
        <div className="
          flex items-center justify-between
          px-6 py-4
          bg-gray-100 dark:bg-gray-800
        ">
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            AquaTrack Dashboard
          </p>
        </div>

        <div className="p-8 grid md:grid-cols-3 gap-6">
          <div className="
            p-6 rounded-xl
            bg-gray-50 dark:bg-gray-800
          ">
            <h3 className="text-gray-600 dark:text-gray-300">
              {t("landing.previewCard1Title")}
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              24,500 L
            </p>
          </div>

          <div className="
            p-6 rounded-xl
            bg-gray-50 dark:bg-gray-800
          ">
            <h3 className="text-gray-600 dark:text-gray-300">
              {t("landing.previewCard2Title")}
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              128
            </p>
          </div>

          <div className="
            p-6 rounded-xl
            bg-gray-50 dark:bg-gray-800
          ">
            <h3 className="text-gray-600 dark:text-gray-300">
              {t("landing.previewCard3Title")}
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              ₹52,000
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}