import { motion } from "framer-motion";

const defaultActivities = [
  {
    title: "Building Added",
    details: "Skyline Residence, Tower B",
    time: "12m ago",
    status: "New",
  },
  {
    title: "Manager Assigned",
    details: "Rohit Sharma to Building C",
    time: "42m ago",
    status: "Assigned",
  },
  {
    title: "Resident Invited",
    details: "Nisha Kapoor (Unit 304)",
    time: "1h ago",
    status: "Invited",
  },
  {
    title: "Billing Cycle Created",
    details: "June 2026 cycle for Tower A",
    time: "2h ago",
    status: "Running",
  },
  {
    title: "Water Usage Uploaded",
    details: "Meter reads uploaded for Tower D",
    time: "3h ago",
    status: "Updated",
  },
];

export default function PropertyAdminRecentActivities({ activities = [] }) {
  const activityList = activities.length > 0 ? activities : defaultActivities;

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-200/50">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Recent Activities</h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest actions for buildings, managers, residents, billing, and water uploads.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
          Live feed
        </span>
      </div>

      <div className="space-y-4">
        {activityList.map((item, index) => (
          <motion.div
            key={`${item.title}-${index}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="rounded-3xl border border-slate-200/70 bg-slate-50/80 p-4 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.details}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span>{item.time}</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 border border-slate-200">
                  {item.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
