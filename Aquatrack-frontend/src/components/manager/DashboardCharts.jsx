import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Droplets,
  Building2,
  CreditCard,
  Receipt,
  IndianRupee,
} from "lucide-react";

// ==========================================
// Colors
// ==========================================

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
];

const ChartCard = ({ title, icon: Icon, children }) => (
  <section className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
        <Icon size={20} className="text-blue-600" />
      </div>

      <h2 className="text-lg font-semibold text-slate-800">
        {title}
      </h2>
    </div>

    <div className="p-5 h-96">
      {children}
    </div>
  </section>
);

export default function DashboardCharts({

  monthlyConsumption = [],

  buildingUsage = [],

  paymentStatus,

  billStatus,

  revenueTrend = [],

}) {

  const paymentData = [

    {
      name: "Paid",
      value: paymentStatus?.paidBills ?? 0,
    },

    {
      name: "Pending",
      value: paymentStatus?.pendingBills ?? 0,
    },

  ];

  const billData = [

    {
      name: "Paid",
      value: billStatus?.paid ?? 0,
    },

    {
      name: "Pending",
      value: billStatus?.pending ?? 0,
    },

    {
      name: "Overdue",
      value: billStatus?.overdue ?? 0,
    },

  ];

  return (

    <div className="space-y-6">

      {/* ========================================== */}
      {/* Monthly Water Consumption */}
      {/* ========================================== */}

      <ChartCard
        title="Monthly Water Consumption"
        icon={Droplets}
      >

        <ResponsiveContainer>

          <LineChart data={monthlyConsumption}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="totalConsumption"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </ChartCard>

      {/* ========================================== */}
      {/* Building Usage + Payment */}
      {/* ========================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        <ChartCard
          title="Building Water Usage"
          icon={Building2}
        >

          <ResponsiveContainer>

            <BarChart data={buildingUsage}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="buildingName"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="totalConsumption"
                radius={[10, 10, 0, 0]}
                fill="#10B981"
              />

            </BarChart>

          </ResponsiveContainer>

        </ChartCard>

        <ChartCard
          title="Payment Status"
          icon={CreditCard}
        >

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={paymentData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
              >

                {paymentData.map((entry, index) => (

                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </ChartCard>

      </div>

      {/* ========================================== */}
      {/* Bill Status + Revenue */}
      {/* ========================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        <ChartCard
          title="Bill Status"
          icon={Receipt}
        >

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={billData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
              >

                {billData.map((entry, index) => (

                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </ChartCard>

        <ChartCard
          title="Revenue Trend"
          icon={IndianRupee}
        >

          <ResponsiveContainer>

            <AreaChart data={revenueTrend}>

              <defs>

                <linearGradient
                  id="revenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#2563EB"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563EB"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#revenue)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </ChartCard>

      </div>

    </div>

  );

}