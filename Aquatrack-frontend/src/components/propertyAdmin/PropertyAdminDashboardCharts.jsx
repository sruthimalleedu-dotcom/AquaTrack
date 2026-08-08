import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const chartColors = ["#0ea5e9", "#22c55e", "#f97316", "#8b5cf6", "#ec4899", "#64748b"];

export default function PropertyAdminDashboardCharts({ summary }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const consumptionTrendData =
    summary?.monthlyConsumptionTrend?.length > 0
      ? summary.monthlyConsumptionTrend
      : months.map((month, index) => ({
          month,
          water: [42, 48, 55, 62, 67, 74][index],
        }));

  const monthlyCostData =
    summary?.monthlyWaterCost?.length > 0
      ? summary.monthlyWaterCost
      : months.map((month, index) => ({
          month,
          cost: [52000, 47000, 59000, 62000, 56000, 64000][index],
        }));

  const buildingConsumptionData =
    summary?.buildingConsumption?.length > 0
      ? summary.buildingConsumption
      : [
          { building: "Building A", value: 112 },
          { building: "Building B", value: 96 },
          { building: "Building C", value: 81 },
          { building: "Building D", value: 68 },
        ];

  const occupancyData =
    summary?.householdStatus?.length > 0
      ? summary.householdStatus
      : [
          { name: "Occupied", value: 82 },
          { name: "Vacant", value: 18 },
        ];

  const residentDistributionData =
    summary?.residentDistribution?.length > 0
      ? summary.residentDistribution
      : [
          { name: "Building A", value: 170 },
          { name: "Building B", value: 133 },
          { name: "Building C", value: 97 },
        ];

  const sourceDistributionData =
    summary?.waterSourceDistribution?.length > 0
      ? summary.waterSourceDistribution
      : [
          { name: "Municipal", value: 56 },
          { name: "Borewell", value: 28 },
          { name: "Tanker", value: 10 },
          { name: "Rainwater", value: 6 },
        ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Water Consumption Trend
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Monthly Usage (KL)
              </h2>
            </div>
            <span className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              Last 6 months
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={consumptionTrendData} margin={{ top: 8, right: 18, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
                <Tooltip cursor={{ stroke: "#cbd5e1", strokeWidth: 1 }} />
                <Legend verticalAlign="top" height={24} />
                <Line type="monotone" dataKey="water" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Monthly Water Cost
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Purchase Cost (₹)
              </h2>
            </div>
            <span className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              Estimated spend
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyCostData} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
                <Tooltip cursor={{ fill: "rgba(15, 23, 42, 0.06)" }} formatter={(value) => [`₹${value.toLocaleString()}`, "Cost"]} />
                <Bar dataKey="cost" fill="#22c55e" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Building Consumption
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Consumption by Building
              </h2>
            </div>
            <span className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              Top consumers
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={buildingConsumptionData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis type="category" dataKey="building" tickLine={false} axisLine={false} tick={{ fill: "#475569", fontSize: 12 }} width={100} />
                <Tooltip cursor={{ fill: "rgba(15, 23, 42, 0.06)" }} formatter={(value) => [`${value} KL`, "Usage"]} />
                <Bar dataKey="value" fill="#f97316" radius={[12, 0, 0, 12]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Household Occupancy
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Occupied vs Vacant
              </h2>
            </div>
            <span className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              Floor status
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={occupancyData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={54} outerRadius={90} paddingAngle={4} stroke="transparent">
                  {occupancyData.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3 px-2 text-sm text-slate-600">
              {occupancyData.map((entry, index) => (
                <div key={entry.name} className="rounded-2xl bg-slate-50 border border-slate-200 p-3">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                    <span>{entry.name}</span>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{entry.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Resident Distribution
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Residents by Building
              </h2>
            </div>
            <span className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              Building spread
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={residentDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} paddingAngle={4} stroke="transparent">
                  {residentDistributionData.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Residents"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Water Source Mix
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Source Distribution
              </h2>
            </div>
            <span className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              Purchase composition
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={88} paddingAngle={4} stroke="transparent">
                  {sourceDistributionData.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Source"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
