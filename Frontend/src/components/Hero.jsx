import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 80,
    damping: 30,
    mass: 1.5,
  });

  const y = useSpring(mouseY, {
    stiffness: 80,
    damping: 30,
    mass: 1.5,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="
        relative
        min-h-screen
        overflow-hidden
        flex
        items-center
        justify-center
        px-6
        bg-gradient-to-b
        from-sky-50
        via-white
        to-sky-100
        dark:from-slate-950
        dark:via-slate-900
        dark:to-black
      "
    >
      {/* Animated Background Gradient */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 -z-30 opacity-60"
        style={{
          background:
            "linear-gradient(120deg,#dbeafe,#ffffff,#e0f2fe,#ffffff,#dbeafe)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* Apple Mouse Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
      >
        <motion.div
          style={{
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="
            absolute
            w-[900px]
            h-[900px]
            rounded-full
            bg-cyan-300/40
            dark:bg-cyan-400/20
            blur-[220px]
          "
        />
      </motion.div>

      {/* Floating Glow Blob 1 */}
      <motion.div
        animate={{
          y: [0, -35, 0],
          x: [0, 20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-12
          left-20
          w-52
          h-52
          rounded-full
          bg-sky-300/30
          blur-3xl
          -z-10
        "
      />

      {/* Floating Glow Blob 2 */}
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-10
          right-12
          w-64
          h-64
          rounded-full
          bg-cyan-300/25
          blur-3xl
          -z-10
        "
      />

      {/* Floating Bubble 1 */}
      <motion.div
        animate={{
          y: [0, -250],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/4 bottom-0 w-4 h-4 rounded-full bg-sky-300/60"
      />

      {/* Floating Bubble 2 */}
      <motion.div
        animate={{
          y: [0, -300],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          delay: 2,
          ease: "linear",
        }}
        className="absolute right-1/3 bottom-0 w-6 h-6 rounded-full bg-cyan-300/50"
      />

      {/* Floating Bubble 3 */}
      <motion.div
        animate={{
          y: [0, -220],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: 4,
          ease: "linear",
        }}
        className="absolute left-2/3 bottom-0 w-3 h-3 rounded-full bg-blue-300/60"
      />

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight text-slate-900 dark:text-white"
        >
          Smart Water Management
          <br />
          <span className="text-blue-600">for Modern Apartments</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mt-8 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
        >
          Track water consumption, automate billing, monitor usage,
          and reduce wastage with real-time analytics.
        </motion.p>

        {/* CTA Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-10 text-center"
      >
        <p className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 mb-6">
          Book <span className="font-bold text-blue-600">AquaTrack</span> for your property and become the
          <span className="font-semibold text-blue-600"> Property Admin</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          <Link to="/register-apartment">
            <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xl transition-all duration-300 hover:scale-105">
              Register Your Property
            </button>
          </Link>

          <button className="px-8 py-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-white/60 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
      </motion.div>
    </div>

      {/* Animated Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <motion.svg
          animate={{ x: [0, -40, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative block w-[120%] h-32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,110 900,0 1200,90 L1200,120 L0,120 Z"
            className="fill-sky-200 dark:fill-slate-800"
          />
        </motion.svg>
      </div>
    </section>
  );
}