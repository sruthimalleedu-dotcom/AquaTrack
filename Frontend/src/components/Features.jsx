import { motion } from "framer-motion";
import { FaTint, FaChartLine, FaBell } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaTint />,
      title: "Real-time Tracking",
      desc: "Monitor household water usage in real-time with smart sensors and dashboards.",
    },
    {
      icon: <FaChartLine />,
      title: "Usage Analytics",
      desc: "Visualize consumption patterns and optimize water distribution efficiently.",
    },
    {
      icon: <FaBell />,
      title: "Smart Alerts",
      desc: "Get notified when usage exceeds limits or abnormal consumption is detected.",
    },
  ];

  return (
    <section
      className="
        py-24 px-6
        bg-white dark:bg-gray-900
        transition-all duration-300
      "
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="
          text-3xl md:text-4xl font-bold text-center
          text-gray-900 dark:text-white
        "
      >
        Features That Power AquaTrack
      </motion.h2>

      <p className="
        text-center mt-4 text-gray-600 dark:text-gray-300
      ">
        Everything you need to manage water efficiently
      </p>

      {/* Cards */}
      <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="
              p-6 rounded-xl shadow-md
              bg-white dark:bg-gray-800
              border border-gray-100 dark:border-gray-700
              text-center
              transition-all
            "
          >
            {/* Icon */}
            <div className="
              text-3xl text-blue-600 dark:text-blue-400
              mb-4
            ">
              {f.icon}
            </div>

            {/* Title */}
            <h3 className="
              text-xl font-semibold
              text-gray-900 dark:text-white
            ">
              {f.title}
            </h3>

            {/* Description */}
            <p className="
              mt-2 text-gray-600 dark:text-gray-300
            ">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}