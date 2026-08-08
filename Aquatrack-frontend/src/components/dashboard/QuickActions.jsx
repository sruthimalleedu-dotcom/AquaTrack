import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Users,
  Building2,
  BarChart3,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const actions = [
  {
    title: "Property Registrations",
    description: "Review pending registration requests",
    icon: ClipboardList,
    color: "from-blue-600 to-cyan-500 shadow-blue-500/30",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
    link: "/admin/registrations",
  },
  {
    title: "Property Admins",
    description: "Manage all property admins",
    icon: Users,
    color: "from-emerald-600 to-teal-500 shadow-emerald-500/30",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    link: "/admin/property-admins",
  },
  {
    title: "Register Property",
    description: "Create a new apartment property",
    icon: Building2,
    color: "from-purple-600 to-indigo-500 shadow-purple-500/30",
    badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
    link: "/register-apartment",
  },
  {
    title: "Analytics",
    description: "Real-time consumption reports",
    icon: BarChart3,
    color: "from-amber-500 to-orange-500 shadow-amber-500/30",
    badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
    isComingSoon: true,
    link: "#",
  },
];

export default function QuickActions() {
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="space-y-5">
      {/* Title with Badge */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Quick Actions
          <Sparkles size={18} className="text-blue-500 animate-pulse" />
        </h2>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.div key={action.title} variants={cardVariants}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                <Link
                  to={action.link}
                  className="
                    group
                    relative
                    block
                    h-full
                    rounded-3xl
                    border
                    border-slate-200/80
                    bg-white/80
                    backdrop-blur-xl
                    p-6
                    shadow-sm
                    hover:shadow-2xl
                    hover:shadow-blue-500/10
                    hover:border-blue-300/80
                    transition-all
                    duration-300
                    overflow-hidden
                  "
                >
                  {/* Glowing Corner Aura Effect */}
                  <div className="pointer-events-none absolute -right-10 -bottom-10 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all duration-500" />

                  {/* Header Row: Icon + Arrow/Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-tr
                        ${action.color}
                        text-white
                        shadow-lg
                        group-hover:scale-110
                        group-hover:rotate-6
                        transition-transform
                        duration-300
                      `}
                    >
                      <Icon size={26} />
                    </div>

                    {action.isComingSoon ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-200/80 shadow-xs">
                        Soon
                      </span>
                    ) : (
                      <span className="p-2 rounded-xl bg-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight">
                    {action.title}
                  </h3>

                  <p className="mt-1.5 text-xs font-medium text-slate-500 leading-relaxed">
                    {action.description}
                  </p>
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}