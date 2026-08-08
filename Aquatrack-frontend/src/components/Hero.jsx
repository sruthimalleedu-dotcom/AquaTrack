import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
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
        from-[#F8FAFC]
        via-[#FFFFFF]
        to-[#F8FAFC]
        dark:from-[#020617]
        dark:via-[#0F172A]
        dark:to-[#020617]
      "
    >
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
            "linear-gradient(120deg,#e0f7fe,#ffffff,#e0f2fe,#ffffff,#e0f7fe)",
          backgroundSize: "300% 300%",
        }}
      />

      <motion.div className="absolute inset-0 pointer-events-none z-0">
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
            bg-[#06B6D4]/25
            dark:bg-[#38BDF8]/15
            blur-[220px]
          "
        />
      </motion.div>

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
          bg-[#0EA5E9]/20
          blur-3xl
          -z-10
        "
      />

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
          bg-[#06B6D4]/20
          blur-3xl
          -z-10
        "
      />

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
        className="absolute left-1/4 bottom-0 w-4 h-4 rounded-full bg-[#0EA5E9]/50"
      />

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
        className="absolute right-1/3 bottom-0 w-6 h-6 rounded-full bg-[#06B6D4]/40"
      />

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
        className="absolute left-2/3 bottom-0 w-3 h-3 rounded-full bg-[#0EA5E9]/50"
      />

      <div className="relative z-20 text-center max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight text-[#0F172A] dark:text-[#F8FAFC]"
        >
          {t("landing.heroTitle")}
          <br />
          <span className="text-[#0EA5E9]">{t("landing.heroTitleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mt-8 text-xl text-[#475569] dark:text-[#CBD5E1] max-w-3xl mx-auto"
        >
          {t("landing.heroSubtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-lg md:text-xl font-medium text-[#475569] dark:text-[#CBD5E1] mb-6">
            {t("landing.heroCta")}
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/register-apartment">
              <button className="px-8 py-4 rounded-xl bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold shadow-xl shadow-[#0EA5E9]/25 transition-all duration-300 hover:scale-105">
                {t("landing.registerButton")}
              </button>
            </Link>

            <button className="px-8 py-4 rounded-xl border border-[#E2E8F0] dark:border-[#334155] dark:text-[#F8FAFC] hover:bg-[#F8FAFC]/60 dark:hover:bg-[#1E293B] transition-all duration-300 hover:scale-105">
              {t("landing.learnMore")}
            </button>
          </div>
        </motion.div>
      </div>

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
            className="fill-[#E0F7FE] dark:fill-[#1E293B]"
          />
        </motion.svg>
      </div>
    </section>
  );
}