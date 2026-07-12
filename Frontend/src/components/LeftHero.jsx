import { motion } from "framer-motion";
import {
  Building2,
  Droplets,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export default function LeftHero() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="hidden lg:flex flex-col justify-center h-full px-16"
    >
      {/* Logo */}

      <div className="flex items-center gap-3 mb-8">

        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg">

          <Droplets
            className="text-white"
            size={30}
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            AquaTrack
          </h1>

          <p className="text-slate-500">
            Smart Apartment Water Management
          </p>

        </div>

      </div>

      {/* Heading */}

      <h2 className="text-5xl font-bold leading-tight text-slate-900">

        Manage Apartments

        <br />

        Smarter.

      </h2>

      <p className="mt-6 text-lg text-slate-600 leading-8 max-w-xl">

        AquaTrack helps apartment communities manage
        buildings, managers, residents, water usage,
        billing and reports from one secure platform.

      </p>

      {/* Feature Cards */}

      <div className="grid grid-cols-2 gap-5 mt-12 max-w-xl">

        <FeatureCard
          icon={<Building2 size={24} />}
          title="Apartments"
        />

        <FeatureCard
          icon={<BarChart3 size={24} />}
          title="Analytics"
        />

        <FeatureCard
          icon={<Droplets size={24} />}
          title="Water Tracking"
        />

        <FeatureCard
          icon={<ShieldCheck size={24} />}
          title="Secure Access"
        />

      </div>

    </motion.div>
  );
}

function FeatureCard({ icon, title }) {

  return (

    <motion.div

      whileHover={{
        y: -5,
        scale: 1.02,
      }}

      className="bg-white/60 backdrop-blur-lg border border-white rounded-2xl p-5 shadow-md"

    >

      <div className="text-blue-600 mb-3">

        {icon}

      </div>

      <h3 className="font-semibold text-slate-800">

        {title}

      </h3>

    </motion.div>

  );

}