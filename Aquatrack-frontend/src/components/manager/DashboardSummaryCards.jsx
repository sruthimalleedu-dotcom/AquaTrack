import { motion } from "framer-motion";
import {
  Building2,
  Home,
  Users,
  CheckCircle2,
  XCircle,
  Droplets,
  Receipt,
  Wallet,
  Clock3,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

export default function DashboardSummaryCards({ summary }) {

  const cards = [
    {
      title: "Buildings",
      value: summary?.totalBuildings ?? 0,
      icon: Building2,
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: "Households",
      value: summary?.totalHouseholds ?? 0,
      icon: Home,
      color: "from-indigo-600 to-blue-500",
    },
    {
      title: "Occupied",
      value: summary?.occupiedHouseholds ?? 0,
      icon: CheckCircle2,
      color: "from-green-600 to-emerald-500",
    },
    {
      title: "Vacant",
      value: summary?.vacantHouseholds ?? 0,
      icon: XCircle,
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Residents",
      value: summary?.totalResidents ?? 0,
      icon: Users,
      color: "from-violet-600 to-purple-500",
    },
    {
      title: "Water Usage",
      value: `${summary?.totalWaterConsumption ?? 0} KL`,
      icon: Droplets,
      color: "from-cyan-600 to-sky-500",
    },
    {
      title: "Bills",
      value: summary?.totalBills ?? 0,
      icon: Receipt,
      color: "from-orange-500 to-amber-500",
    },
    {
      title: "Paid Bills",
      value: summary?.paidBills ?? 0,
      icon: Wallet,
      color: "from-emerald-600 to-lime-500",
    },
    {
      title: "Pending Bills",
      value: summary?.pendingBills ?? 0,
      icon: Clock3,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Revenue",
      value: `₹${summary?.totalRevenueCollected ?? 0}`,
      icon: IndianRupee,
      color: "from-green-600 to-teal-500",
    },
    {
      title: "Pending Amount",
      value: `₹${summary?.pendingAmount ?? 0}`,
      icon: TrendingUp,
      color: "from-rose-500 to-red-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.35,
            }}
            whileHover={{
              y: -5,
            }}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              hover:shadow-lg
              transition-all
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">

                  {card.title}

                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">

                  {card.value}

                </h2>

              </div>

              <div
                className={`
                  h-14
                  w-14
                  rounded-xl
                  bg-gradient-to-br
                  ${card.color}
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-lg
                `}
              >

                <Icon size={26} />

              </div>

            </div>

          </motion.div>

        );

      })}

    </div>
  );
}