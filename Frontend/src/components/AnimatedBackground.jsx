import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* Background Gradient */}

      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-100" />

      {/* Blob 1 */}

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-16 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl"
      />

      {/* Blob 2 */}

      <motion.div
        animate={{
          x: [0, -70, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl"
      />

      {/* Blob 3 */}

      <motion.div
        animate={{
          y: [0, -60, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300/20 blur-3xl"
      />

    </div>
  );
}