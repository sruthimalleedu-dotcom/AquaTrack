import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Stats() {
  const { t } = useTranslation();

  const stats = [
    { label: t("landing.statsHouseholds"), value: 120, suffix: "+" },
    { label: t("landing.statsWaterManaged"), value: 25000, suffix: "L" },
    { label: t("landing.statsBilling"), value: 520000, prefix: "₹" },
    { label: t("landing.statsEfficiency"), value: 98, suffix: "%" },
  ];

  const [counted, setCounted] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1200;
    const steps = 60;

    const intervals = stats.map((stat, i) => {
      const increment = stat.value / steps;

      return setInterval(() => {
        setCounted((prev) => {
          const updated = [...prev];
          if (updated[i] < stat.value) {
            updated[i] = Math.min(updated[i] + increment, stat.value);
          }
          return updated;
        });
      }, duration / steps);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="py-24 px-6 bg-[#F8FAFC] dark:bg-[#020617]">
      <h2 className="text-3xl font-bold text-center text-[#0F172A] dark:text-[#F8FAFC]">
        {t("landing.statsTitle")}
      </h2>

      <div className="mt-12 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-xl bg-[#FFFFFF] dark:bg-[#1E293B] text-center shadow-md border border-[#E2E8F0] dark:border-[#334155]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold text-[#0EA5E9] dark:text-[#38BDF8]">
              {item.prefix || ""}
              {Math.round(counted[i])}
              {item.suffix || ""}
            </h3>

            <p className="text-[#475569] dark:text-[#CBD5E1] mt-2">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}