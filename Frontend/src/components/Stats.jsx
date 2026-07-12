import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { label: "Households", value: 120, suffix: "+" },
    { label: "Water Managed", value: 25000, suffix: "L" },
    { label: "Total Billing", value: 520000, prefix: "₹" },
    { label: "Efficiency", value: 98, suffix: "%" },
  ];

  const [counted, setCounted] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1200; // animation speed
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
    <section className="py-24 px-6 bg-sky-50 dark:bg-gray-950">

      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        System Impact
      </h2>

      <div className="mt-12 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {stats.map((item, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-xl bg-white dark:bg-gray-800 text-center shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {item.prefix || ""}
              {Math.round(counted[i])}
              {item.suffix || ""}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {item.label}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}