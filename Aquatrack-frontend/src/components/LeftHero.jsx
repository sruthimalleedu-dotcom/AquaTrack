import { motion } from "framer-motion";
import {
  Building2,
  Droplets,
  ShieldCheck,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function LeftHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hidden md:flex flex-col justify-center h-full px-12 xl:px-16 relative z-10"
    >
      {/* 1. Logo & Badge */}
      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
        <div className="relative group">
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 bg-cyan-400 rounded-2xl blur-md opacity-50 group-hover:opacity-90 transition-opacity duration-300 animate-pulse" />
          
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-600 to-teal-500 shadow-lg shadow-cyan-500/30 text-white transform group-hover:scale-105 transition-transform duration-300">
            <Droplets size={30} />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              AquaTrack
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              <Sparkles size={12} className="text-cyan-400 animate-pulse" />
              Smart Water
            </span>
          </div>
          <p className="text-sm font-medium text-slate-400 mt-0.5">
            Smart Apartment Water Management
          </p>
        </div>
      </motion.div>

      {/* 2. Headline with Gradient Accent */}
      <motion.h2
        variants={itemVariants}
        className="text-5xl xl:text-6xl font-black leading-tight text-white tracking-tight"
      >
        Manage Apartments
        <br />
        <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
          Smarter.
        </span>
      </motion.h2>

      {/* 3. Subheading Description */}
      <motion.p
        variants={itemVariants}
        className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl"
      >
        AquaTrack helps apartment communities manage buildings, managers, residents,
        water usage, billing, and real-time analytics from one secure platform.
      </motion.p>

      {/* 4. Interactive Dark Glass Feature Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-5 mt-10 max-w-xl"
      >
        <FeatureCard
          icon={<Building2 size={24} />}
          title="Apartments"
          subtitle="Multi-building hub"
        />

        <FeatureCard
          icon={<BarChart3 size={24} />}
          title="Analytics"
          subtitle="Real-time usage"
        />

        <FeatureCard
          icon={<Droplets size={24} />}
          title="Water Tracking"
          subtitle="Smart meter sync"
        />

        <FeatureCard
          icon={<ShieldCheck size={24} />}
          title="Secure Access"
          subtitle="Role-based portal"
        />
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, subtitle }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        group 
        relative 
        p-5 
        rounded-2xl 
        bg-slate-900/80 
        backdrop-blur-2xl 
        border 
        border-slate-800/90 
        shadow-xl 
        hover:shadow-2xl 
        hover:shadow-cyan-500/15 
        hover:border-cyan-400/50 
        transition-all 
        duration-300 
        overflow-hidden
      "
    >
      {/* Card Glow Corner Effect */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all duration-500" />

      {/* Icon Wrapper */}
      <div
        className="
          w-11 
          h-11 
          rounded-xl 
          bg-cyan-500/10 
          border 
          border-cyan-500/20 
          text-cyan-400 
          flex 
          items-center 
          justify-center 
          mb-3.5 
          group-hover:bg-gradient-to-tr 
          group-hover:from-blue-600 
          group-hover:to-cyan-500 
          group-hover:text-white 
          group-hover:border-transparent 
          group-hover:shadow-md 
          group-hover:shadow-cyan-500/30 
          transition-all 
          duration-300
        "
      >
        {icon}
      </div>

      <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}