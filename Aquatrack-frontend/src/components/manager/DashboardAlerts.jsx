import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
} from "lucide-react";

export default function DashboardAlerts({

  alerts = [],

  loading = false,

}) {

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="space-y-4">

          {[1,2,3].map((i)=>(

            <div
              key={i}
              className="h-20 rounded-xl bg-slate-100 animate-pulse"
            />

          ))}

        </div>

      </div>

    );

  }

  // ==========================================
  // Empty State
  // ==========================================

  if (!alerts.length) {

    return (

      <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">

        <CheckCircle2
          size={56}
          className="mx-auto text-green-500"
        />

        <h3 className="mt-5 text-xl font-bold text-slate-800">

          Everything Looks Good

        </h3>

        <p className="mt-2 text-slate-500">

          There are currently no alerts for your assigned buildings.

        </p>

      </div>

    );

  }

  // ==========================================
  // Severity Styles
  // ==========================================

  const severityConfig = {

    INFO: {

      icon: Info,

      border: "border-blue-200",

      background: "bg-blue-50",

      iconBg: "bg-blue-100",

      iconColor: "text-blue-600",

      badge: "bg-blue-100 text-blue-700",

    },

    WARNING: {

      icon: AlertTriangle,

      border: "border-yellow-200",

      background: "bg-yellow-50",

      iconBg: "bg-yellow-100",

      iconColor: "text-yellow-600",

      badge: "bg-yellow-100 text-yellow-700",

    },

    CRITICAL: {

      icon: AlertCircle,

      border: "border-red-200",

      background: "bg-red-50",

      iconBg: "bg-red-100",

      iconColor: "text-red-600",

      badge: "bg-red-100 text-red-700",

    },

  };

  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-bold text-slate-800">

          Dashboard Alerts

        </h2>

        <p className="mt-1 text-sm text-slate-500">

          Important notifications for your managed buildings.

        </p>

      </div>

      {/* Alerts */}

      <div className="divide-y divide-slate-100">

        {alerts.map((alert, index) => {

          const config =
            severityConfig[alert.severity] ||
            severityConfig.INFO;

          const Icon = config.icon;

          return (

            <div
              key={index}
              className={`
                flex
                items-start
                gap-4
                px-6
                py-5
                transition
                hover:bg-slate-50
              `}
            >

              {/* Icon */}

              <div
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  ${config.iconBg}
                `}
              >

                <Icon
                  size={22}
                  className={config.iconColor}
                />

              </div>

              {/* Content */}

              <div className="flex-1">

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="font-semibold text-slate-800">

                    {alert.title}

                  </h3>

                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-semibold
                      ${config.badge}
                    `}
                  >

                    {alert.severity}

                  </span>

                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">

                  {alert.message}

                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}