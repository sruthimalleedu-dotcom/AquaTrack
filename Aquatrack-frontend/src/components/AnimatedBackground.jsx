import { motion } from "framer-motion";

export default function AnimatedBackground() {
  // Floating bubble parameters
  const bubbles = [
    { size: 28, left: "8%", duration: 14, delay: 0 },
    { size: 16, left: "22%", duration: 18, delay: 2 },
    { size: 36, left: "35%", duration: 15, delay: 5 },
    { size: 20, left: "48%", duration: 20, delay: 1 },
    { size: 44, left: "62%", duration: 16, delay: 4 },
    { size: 24, left: "76%", duration: 19, delay: 3 },
    { size: 32, left: "88%", duration: 13, delay: 6 },
    { size: 18, left: "94%", duration: 17, delay: 7 },
  ];

  // Concentric water drop impact points
  const ripples = [
    { top: "25%", left: "30%", delay: 0 },
    { top: "65%", left: "75%", delay: 3.5 },
    { top: "45%", left: "45%", delay: 7 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none select-none">
      
      {/* 1. Deep Obsidian Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#020617]" />

      {/* 2. Electric Cyan Shimmer Ray */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
        className="absolute -top-1/2 left-0 w-96 h-[200%] bg-gradient-to-r from-transparent via-[#22D3EE]/12 to-transparent transform -rotate-45 blur-2xl"
      />

      {/* 3. Glowing Neon Blob 1 (Top Left - Electric Cyan) */}
      <motion.div
        animate={{
          x: [0, 90, -40, 0],
          y: [0, 60, 30, 0],
          scale: [1, 1.3, 0.9, 1],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-16 -left-16 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-[#06B6D4]/25 via-[#0EA5E9]/30 to-[#10B981]/20 blur-3xl shadow-[0_0_80px_rgba(6,182,212,0.3)]"
      />

      {/* 4. Glowing Neon Blob 2 (Bottom Right - Indigo Sapphire) */}
      <motion.div
        animate={{
          x: [0, -100, 30, 0],
          y: [0, -80, -30, 0],
          scale: [1, 1.35, 0.85, 1],
          rotate: [360, 240, 120, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-24 -right-24 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-[#0EA5E9]/25 via-[#06B6D4]/20 to-[#38BDF8]/15 blur-3xl shadow-[0_0_90px_rgba(14,165,233,0.25)]"
      />

      {/* 5. Center Pulsing Glow Orb */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.25, 0.55, 0.25],
          x: [-30, 40, -30],
          y: [-40, 30, -40],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#0EA5E9]/18 via-[#06B6D4]/22 to-[#34D399]/15 blur-3xl"
      />

      {/* 6. Glowing Neon Water Ripples */}
      {ripples.map((ripple, idx) => (
        <div
          key={idx}
          style={{ top: ripple.top, left: ripple.left }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{
              scale: [0.1, 2.8],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              delay: ripple.delay,
              ease: "easeOut",
            }}
            className="w-32 h-32 rounded-full border-2 border-[#22D3EE]/60 shadow-[0_0_15px_rgba(34,211,238,0.4)] blur-[0.5px]"
          />
        </div>
      ))}

      {/* 7. Dark Glassmorphic Glowing Bubbles */}
      {bubbles.map((b, idx) => (
        <motion.div
          key={idx}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            x: [0, 25, -25, 10, 0],
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.8, 1.15, 0.9, 1],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
          }}
          className="
            absolute 
            rounded-full 
            bg-[#06B6D4]/10 
            backdrop-blur-md 
            border 
            border-[#22D3EE]/40 
            shadow-[0_0_12px_rgba(6,182,212,0.3)]
          "
        >
          {/* Specular Glow Dot */}
          <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-[#38BDF8]/90 blur-[0.5px]" />
        </motion.div>
      ))}

    </div>
  );
}