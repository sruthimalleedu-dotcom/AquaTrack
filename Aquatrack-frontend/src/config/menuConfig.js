// import { title } from "framer-motion/client";
// import {
//     LayoutDashboard,
//     Building2,
//     Building,
//     Layers3,
//     Users,
//     UserCog,
//     Home,
//     CalendarDays,
//     Droplets,
//     CreditCard,
//     ReceiptIndianRupee,
//     LogOut,
// } from "lucide-react";
// import { GiPayMoney } from "react-icons/gi";
// import { PiPaypalLogo } from "react-icons/pi";

// export const menuConfig = {

//     // ==========================================
//     // SUPER ADMIN
//     // ==========================================

//     SUPER_ADMIN: [

//         {
//             title: "Dashboard",
//             icon: LayoutDashboard,
//             path: "/admin/dashboard",
//         },

//         {
//             title: "Property Registrations",
//             icon: Building2,
//             path: "/admin/registrations",
//         },

//         {
//             title: "Property Admins",
//             icon: Users,
//             path: "/admin/property-admins",
//         },

//         {
//             title: "Logout",
//             icon: LogOut,
//             path: "/logout",
//         },

//     ],

//     // ==========================================
//     // PROPERTY ADMIN
//     // ==========================================

//     PROPERTY_ADMIN: [

//         {
//             title: "Dashboard",
//             icon: LayoutDashboard,
//             path: "/property/dashboard",
//         },

//         {
//             title: "Apartments",
//             icon: Building2,
//             path: "/property/apartments",
//         },

//         {
//             title: "Buildings",
//             icon: Building,
//             path: "/property/buildings",
//         },

//         {
//             title: "Floors",
//             icon: Layers3,
//             path: "/property/floors",
//         },

//         {
//             title: "Managers",
//             icon: UserCog,
//             path: "/property/managers",
//         },

//         {
//             title: "Logout",
//             icon: LogOut,
//             path: "/logout",
//         },

//     ],


//     // ==========================================
//     // MANAGER
//     // ==========================================

// MANAGER: [

//     {
//         title: "Dashboard",
//         icon: LayoutDashboard,
//         path: "/manager/dashboard",
//     },

//     {
//         title: "Households",
//         icon: Home,
//         path: "/manager/households",
//     },

//     {
//         title: "Residents",
//         icon: Users,
//         path: "/manager/residents",
//     },

//     {
//         title: "Billing Cycles",
//         icon: CalendarDays,
//         path: "/manager/billing-cycles",
//     },

//     {
//         title: "Water Usage",
//         icon: Droplets,
//         path: "/manager/water-usage",
//     },

//     {
//         title: "Bulk Water Purchases",
//         icon: CreditCard,
//         path: "/manager/bulk-water-purchases",
//     },

//     {
//         title: "Consumption Distribution",
//         icon: CreditCard,
//         path: "/manager/consumption-distribution",
//     },

//     {
//         title: "Water Bills",
//         icon: ReceiptIndianRupee,
//         path: "/manager/water-bills",
//     },

//     {
//     title: "Payments",
//     icon: PiPaypalLogo,
//     path: "/manager/payments",
//     },

//     {
//         title: "Logout",
//         icon: LogOut,
//         path: "/logout",
//     },

// ],

//     // ==========================================
//     // RESIDENT
//     // ==========================================

//     RESIDENT: [

//         {
//             title: "Dashboard",
//             icon: LayoutDashboard,
//             path: "/resident/dashboard",
//         },

//         {
//             title: "My Household",
//             icon: Home,
//             path: "/resident/my-household",
//         },

//         {
//             title: "My Water Usage",
//             icon: Droplets,
//             path: "/resident/water-usage",
//         },

//         {
//             title: "My Water Bills",
//             icon: ReceiptIndianRupee,
//             path: "/resident/water-bills",
//         },

//         {
//             title: "My Payments",
//             icon: GiPayMoney,
//             path: "/resident/my-payments",
//         },
        
//         {
//             title: "Logout",
//             icon: LogOut,
//             path: "/logout",
//         },

//     ],

// };

import {
  LayoutDashboard,
  Building2,
  Building,
  Layers3,
  Users,
  UserCog,
  Home,
  CalendarDays,
  Droplets,
  ReceiptIndianRupee,
  LogOut,
  UserCircle2,
  Settings,
  Wallet,
  ArrowLeftRight,
} from "lucide-react";

import { GiPayMoney } from "react-icons/gi";
import { PiPaypalLogo } from "react-icons/pi";

// ==========================================
// Menu Configuration
// ==========================================

export const menuConfig = {

  // ==========================================
  // SUPER ADMIN
  // ==========================================

  SUPER_ADMIN: {

    // ==========================
    // Desktop Sidebar
    // ==========================

    sidebar: [

      {
        title: "menu.dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },

      {
        title: "menu.propertyRegistrations",
        icon: Building2,
        path: "/admin/registrations",
      },

      {
        title: "menu.propertyAdmins",
        icon: Users,
        path: "/admin/property-admins",
      },

      {
        title: "menu.profile",
        icon: UserCircle2,
        path: "/admin/profile",
      },

      {
        title: "menu.logout",
        icon: LogOut,
        path: "/logout",
      },

    ],

    // ==========================
    // Mobile Bottom Navigation
    // ==========================

    bottomNav: [

      {
        title: "menu.dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },

      {
        title: "menu.registrations",
        icon: Building2,
        path: "/admin/registrations",
      },

      {
        title: "menu.admins",
        icon: Users,
        path: "/admin/property-admins",
      },

      {
        title: "menu.profile",
        icon: UserCircle2,
        path: "/admin/profile",
      },

    ],

    // ==========================
    // Mobile Drawer
    // ==========================

    drawer: [

      {
        title: "menu.dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },

      {
        title: "menu.propertyRegistrations",
        icon: Building2,
        path: "/admin/registrations",
      },

      {
        title: "menu.propertyAdmins",
        icon: Users,
        path: "/admin/property-admins",
      },

      {
        title: "menu.settings",
        icon: Settings,
        path: "/admin/settings",
      },

      {
        title: "menu.logout",
        icon: LogOut,
        path: "/logout",
      },

    ],

  },

    // ==========================================
  // PROPERTY ADMIN
  // ==========================================

  PROPERTY_ADMIN: {

    // ==========================
    // Desktop Sidebar
    // ==========================

    sidebar: [

      {
        title: "menu.dashboard",
        icon: LayoutDashboard,
        path: "/property/dashboard",
      },

      {
        title: "menu.apartments",
        icon: Building2,
        path: "/property/apartments",
      },

      {
        title: "menu.buildings",
        icon: Building,
        path: "/property/buildings",
      },

      {
        title: "menu.floors",
        icon: Layers3,
        path: "/property/floors",
      },

      {
        title: "menu.managers",
        icon: UserCog,
        path: "/property/managers",
      },

      {
        title: "menu.profile",
        icon: UserCircle2,
        path: "/property/profile",
      },

    ],

    // ==========================
    // Mobile Bottom Navigation
    // ==========================

    bottomNav: [

      {
        title: "menu.dashboard",
        icon: LayoutDashboard,
        path: "/property/dashboard",
      },

      {
        title: "menu.apartments",
        icon: Building2,
        path: "/property/apartments",
      },

      {
        title: "menu.managers",
        icon: UserCog,
        path: "/property/managers",
      },

      {
        title: "menu.profile",
        icon: UserCircle2,
        path: "/property/profile",
      },

    ],

    // ==========================
    // Mobile Drawer
    // ==========================

    drawer: [

      {
        title: "menu.dashboard",
        icon: LayoutDashboard,
        path: "/property/dashboard",
      },

      {
        title: "menu.buildings",
        icon: Building,
        path: "/property/buildings",
      },

      {
        title: "menu.floors",
        icon: Layers3,
        path: "/property/floors",
      },

    ],

  },

    // ==========================================
  // MANAGER
  // ==========================================

  MANAGER: {

    // ==========================
    // Desktop Sidebar
    // ==========================

    sidebar: [

      {
        title: "menu.dashboard",
        icon: LayoutDashboard,
        path: "/manager/dashboard",
      },

      {
        title: "menu.households",
        icon: Home,
        path: "/manager/households",
      },

      {
        title: "menu.residents",
        icon: Users,
        path: "/manager/residents",
      },

      {
        title: "menu.billingCycles",
        icon: CalendarDays,
        path: "/manager/billing-cycles",
      },

      {
        title: "menu.waterUsage",
        icon: Droplets,
        path: "/manager/water-usage",
      },

      {
        title: "menu.bulkWaterPurchases",
        icon: Wallet,
        path: "/manager/bulk-water-purchases",
      },

      {
        title: "menu.consumptionDistribution",
        icon: ArrowLeftRight,
        path: "/manager/consumption-distribution",
      },

      {
        title: "menu.waterBills",
        icon: ReceiptIndianRupee,
        path: "/manager/water-bills",
      },

      {
        title: "menu.payments",
        icon: PiPaypalLogo,
        path: "/manager/payments",
      },

      {
        title: "menu.profile",
        icon: UserCircle2,
        path: "/manager/profile",
      },
    ],

    // ==========================
    // Mobile Bottom Navigation
    // ==========================

    bottomNav: [

      {
        title: "menu.dashboard",
        icon: LayoutDashboard,
        path: "/manager/dashboard",
      },

      {
        title: "menu.households",
        icon: Home,
        path: "/manager/households",
      },

      {
        title: "menu.residents",
        icon: Users,
        path: "/manager/residents",
      },

      {
        title: "menu.profile",
        icon: UserCircle2,
        path: "/manager/profile",
      },

    ],

    // ==========================
    // Mobile Drawer
    // ==========================

    drawer: [

      {
        title: "menu.billingCycles",
        icon: CalendarDays,
        path: "/manager/billing-cycles",
      },

      {
        title: "menu.waterUsage",
        icon: Droplets,
        path: "/manager/water-usage",
      },

      {
        title: "menu.bulkWaterPurchases",
        icon: Wallet,
        path: "/manager/bulk-water-purchases",
      },

      {
        title: "menu.consumptionDistribution",
        icon: ArrowLeftRight,
        path: "/manager/consumption-distribution",
      },

      {
        title: "menu.waterBills",
        icon: ReceiptIndianRupee,
        path: "/manager/water-bills",
      },

      {
        title: "menu.payments",
        icon: PiPaypalLogo,
        path: "/manager/payments",
      },

    ],

  },

  // ==========================================
  // RESIDENT
  // ==========================================

  RESIDENT: {

    // ==========================
    // Desktop Sidebar
    // ==========================

    sidebar: [

      {
        title: "menu.dashboard",
        icon: LayoutDashboard,
        path: "/resident/dashboard",
      },

      {
        title: "menu.myHousehold",
        icon: Home,
        path: "/resident/my-household",
      },

      {
        title: "menu.myWaterUsage",
        icon: Droplets,
        path: "/resident/water-usage",
      },

      {
        title: "menu.myWaterBills",
        icon: ReceiptIndianRupee,
        path: "/resident/water-bills",
      },

      {
        title: "menu.myPayments",
        icon: GiPayMoney,
        path: "/resident/my-payments",
      },

    ],

    // ==========================
    // Mobile Bottom Navigation
    // ==========================

    bottomNav: [

      {
        title: "menu.dashboard",
        icon: LayoutDashboard,
        path: "/resident/dashboard",
      },

      {
        title: "menu.usage",
        icon: Droplets,
        path: "/resident/water-usage",
      },

      {
        title: "menu.payments",
        icon: GiPayMoney,
        path: "/resident/my-payments",
      },

      {
        title: "menu.profile",
        icon: UserCircle2,
        path: "/resident/profile",
      },

    ],

    // ==========================
    // Mobile Drawer
    // ==========================

    drawer: [

      {
        title: "menu.myHousehold",
        icon: Home,
        path: "/resident/my-household",
      },

      {
        title: "menu.myWaterBills",
        icon: ReceiptIndianRupee,
        path: "/resident/water-bills",
      },

      {
        title: "menu.settings",
        icon: Settings,
        path: "/resident/settings",
      },

      {
        title: "menu.helpSupport",
        icon: Users,
        path: "/resident/support",
      },

    ],

  },

};