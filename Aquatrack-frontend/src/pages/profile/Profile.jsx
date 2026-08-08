import { motion } from "framer-motion";

import DashboardLayout from "../../components/ui/DashboardLayout";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import ProfileInfoCard from "../../components/profile/ProfileInfoCard";

export default function Profile() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="
          mx-auto
          max-w-6xl

          space-y-6
        "
      >
        {/* ======================================
            Profile Header
        ====================================== */}

        <ProfileHeader />

        {/* ======================================
            Profile Content
        ====================================== */}

        <div
          className="
            grid
            gap-6

            lg:grid-cols-[340px_1fr]
          "
        >
          {/* Left Side */}

          <ProfileAvatar />

          {/* Right Side */}

          <ProfileInfoCard />

        </div>

      </motion.div>
    </DashboardLayout>
  );
}