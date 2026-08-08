import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Shield,
  BadgeCheck,
} from "lucide-react";

export default function ProfileInfoCard() {
  // ==========================================
  // Temporary User
  // (Replace with API Later)
  // ==========================================

  const email =
    localStorage.getItem("email") ||
    "guest@aquatrack.com";

  const role =
    localStorage.getItem("role") ||
    "SUPER_ADMIN";

  const fullName = email
    .split("@")[0]
    .replaceAll(".", " ");

  const phone = "+91 XXXXX XXXXX";

  const status = "ACTIVE";

  const profileItems = [
    {
      icon: User,
      label: "Full Name",
      value: fullName,
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: phone,
    },
    {
      icon: Shield,
      label: "Role",
      value: role.replaceAll("_", " "),
    },
    {
      icon: BadgeCheck,
      label: "Status",
      value: status,
      status: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="
        rounded-3xl

        border
        border-slate-200

        bg-white

        shadow-sm
      "
    >
      {/* ======================================
          Header
      ====================================== */}

      <div className="border-b border-slate-200 px-6 py-5">

        <h3 className="text-lg font-bold text-slate-900">
          Personal Information
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Your account details and contact information.
        </p>

      </div>

      {/* ======================================
          Information
      ====================================== */}

      <div className="divide-y divide-slate-100">

        {profileItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                flex
                items-center
                justify-between

                gap-5

                px-6
                py-5

                transition-colors
                duration-200

                hover:bg-slate-50
              "
            >
              {/* Left */}

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center

                    rounded-xl

                    bg-cyan-50

                    text-cyan-600
                  "
                >
                  <Icon size={20} />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>

                  <p className="mt-1 text-sm text-slate-800 font-medium capitalize">
                    {item.value}
                  </p>

                </div>

              </div>

              {/* Status */}

              {item.status && (
                <span
                  className="
                    rounded-full

                    bg-emerald-100

                    px-3
                    py-1

                    text-xs
                    font-semibold

                    text-emerald-700
                  "
                >
                  ● Active
                </span>
              )}

            </div>
          );
        })}

      </div>

    </motion.div>
  );
}