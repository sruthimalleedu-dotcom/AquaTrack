import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Building2,
  Building,
  UserCog,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardQuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Apartment",
      description: "Register a new apartment community and set up telemetry",
      icon: Building2,
      gradient: "from-blue-600 to-cyan-500 shadow-blue-500/30",
      hotkey: "Shift + A",
      onClick: () => navigate("/property/apartments/create"),
    },
    {
      title: "Create Building",
      description: "Add a new building tower to an existing apartment",
      icon: Building,
      gradient: "from-emerald-600 to-teal-500 shadow-emerald-500/30",
      hotkey: "Shift + B",
      onClick: () => navigate("/property/buildings/create"),
    },
    {
      title: "Invite Manager",
      description: "Create and invite a new property manager",
      icon: UserCog,
      gradient: "from-purple-600 to-indigo-500 shadow-purple-500/30",
      hotkey: "Shift + M",
      onClick: () => navigate("/property/managers/create"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        rounded-3xl
        border
        border-slate-200/80
        bg-white/80
        backdrop-blur-xl
        p-7
        shadow-md
        shadow-slate-900/5
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Quick Operations
            <Sparkles size={18} className="text-cyan-500 animate-pulse" />
          </h2>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Frequently used operations for Property Administrators
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-semibold border border-slate-200">
          <Plus size={13} className="text-blue-600" />
          <span>Quick Hub</span>
        </span>
      </div>

      {/* Grid */}
      <div className="grid gap-5 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              onClick={action.onClick}
              className="
                group
                relative
                flex
                flex-col
                justify-between
                rounded-2xl
                border
                border-slate-200/80
                bg-slate-50/50
                p-6
                text-left
                shadow-sm
                hover:shadow-2xl
                hover:shadow-cyan-500/10
                hover:border-cyan-400/50
                hover:bg-white
                transition-all
                duration-300
                overflow-hidden
                w-full
              "
            >
              {/* Card Ambient Glow Corner */}
              <div className="pointer-events-none absolute -right-8 -bottom-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/25 transition-all duration-500" />

              <div>
                {/* Header Row: Icon + Hotkey */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-tr
                      ${action.gradient}
                      text-white
                      shadow-md
                      group-hover:scale-110
                      group-hover:rotate-6
                      transition-transform
                      duration-300
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-white border border-slate-200 rounded-md shadow-xs group-hover:border-cyan-300 transition-colors">
                    {action.hotkey}
                  </kbd>
                </div>

                {/* Title & Description */}
                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-base">
                  {action.title}
                </h3>

                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-medium">
                  {action.description}
                </p>
              </div>

              {/* Bottom Action Pill */}
              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-600">
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Launch Action
                </span>
                
                <span className="p-1 rounded-lg bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}