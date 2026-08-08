import { useState } from "react";

import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";
import MobileTopbar from "../layout/MobileTopbar";
import MobileBottomNav from "../layout/MobileBottomNav";
import MobileDrawer from "../layout/MobileDrawer";

export default function DashboardLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Get current user role from localStorage
  const role = localStorage.getItem("role") || "SUPER_ADMIN";

  return (
    <div className="min-h-screen bg-slate-100/70">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar role={role} />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        role={role}
      />

      {/* Main Layout */}
      <div className="flex min-h-screen flex-col lg:ml-72">

        {/* Desktop Topbar */}
        <div className="hidden lg:block">
          <Topbar />
        </div>

        {/* Mobile Topbar */}
        <div className="lg:hidden">
          <MobileTopbar
            onMenuClick={() => setDrawerOpen(true)}
          />
        </div>

        {/* Page Content */}
        <main
  className="
    flex-1
    overflow-y-auto

    pt-[84px]
    px-4
    pb-24

    sm:px-6

    lg:p-8
  "
>
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <MobileBottomNav role={role} />
        </div>

      </div>

    </div>
  );
}