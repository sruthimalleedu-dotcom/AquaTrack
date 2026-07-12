import {
    LayoutDashboard,
    Building2,
    Building,
    Users,
    UserCog,
    Droplets,
    CreditCard,
    Settings,
    LogOut,
} from "lucide-react";

export const menuConfig = {

    // ==========================================
    // SUPER ADMIN
    // ==========================================

    SUPER_ADMIN: [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/admin/dashboard",
        },

        {
            title: "Property Registrations",
            icon: Building2,
            path: "/admin/registrations",
        },

        {
            title: "Property Admins",
            icon: Users,
            path: "/admin/property-admins",
        },

        {
            title: "Settings",
            icon: Settings,
            path: "/admin/settings",
        },

        {
            title: "Logout",
            icon: LogOut,
            path: "/logout",
        },

    ],

    // ==========================================
    // PROPERTY ADMIN
    // ==========================================

    PROPERTY_ADMIN: [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/property/dashboard",
        },

        {
            title: "Apartments",
            icon: Building2,
            path: "/property/apartments",
        },

        {
            title: "Buildings",
            icon: Building,
            path: "/property/buildings",
        },

        {
            title: "Managers",
            icon: UserCog,
            path: "/property/managers",
        },

        {
            title: "Settings",
            icon: Settings,
            path: "/property/settings",
        },

        {
            title: "Logout",
            icon: LogOut,
            path: "/logout",
        },

    ],

    // ==========================================
    // MANAGER
    // ==========================================

    MANAGER: [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/manager/dashboard",
        },

        {
            title: "Residents",
            icon: Users,
            path: "/manager/residents",
        },

        {
            title: "Water Usage",
            icon: Droplets,
            path: "/manager/water-usage",
        },

        {
            title: "Settings",
            icon: Settings,
            path: "/manager/settings",
        },

        {
            title: "Logout",
            icon: LogOut,
            path: "/logout",
        },

    ],

    // ==========================================
    // RESIDENT
    // ==========================================

    RESIDENT: [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/resident/dashboard",
        },

        {
            title: "Water Usage",
            icon: Droplets,
            path: "/resident/water-usage",
        },

        {
            title: "Bills",
            icon: CreditCard,
            path: "/resident/bills",
        },

        {
            title: "Settings",
            icon: Settings,
            path: "/resident/settings",
        },

        {
            title: "Logout",
            icon: LogOut,
            path: "/logout",
        },

    ],

};