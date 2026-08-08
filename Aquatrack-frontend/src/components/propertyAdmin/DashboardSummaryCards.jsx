import { motion } from "framer-motion";
import {
  Building2,
  Building,
  Home,
  UserCog,
  Users,
} from "lucide-react";

import StatCard from "../dashboard/StatCard";

export default function DashboardSummaryCards({ summary }) {
  if (!summary) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        grid
        gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      <motion.div variants={itemVariants}>
        <StatCard
          title="Buildings"
          value={summary.totalBuildings ?? 0}
          icon={Building}
          color="green"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Floors"
          value={summary.totalFloors ?? 0}
          icon={Building2}
          color="blue"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Households"
          value={summary.totalHouseholds ?? 0}
          icon={Home}
          color="yellow"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Managers"
          value={summary.totalManagers ?? 0}
          icon={UserCog}
          color="purple"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Residents"
          value={summary.totalResidents ?? 0}
          icon={Users}
          color="red"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Water Usage"
          value={summary.totalWaterUsage ?? 0}
          icon={Building2}
          color="indigo"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Water Cost"
          value={summary.totalWaterCost ? `₹${summary.totalWaterCost.toLocaleString()}` : 0}
          icon={Building2}
          color="cyan"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Active Billing Cycles"
          value={summary.activeBillingCycleCount ?? summary.activeBillingCycles ?? 0}
          icon={Building2}
          color="slate"
        />
      </motion.div>
    </motion.div>
  );
}