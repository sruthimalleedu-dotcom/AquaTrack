import { Routes, Route } from "react-router-dom";

// ==========================================
// Public Pages
// ==========================================

import LandingPage from "./pages/LandingPage";
import RegisterApartment from "./pages/RegisterApartment";

import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// ==========================================
// Dashboard Pages
// ==========================================

import AdminDashboard from "./pages/dashboard/AdminDashboard";
import PropertyDashboard from "./pages/dashboard/AdminDashboard";

// ==========================================
// Admin Pages
// ==========================================

import PropertyRegistrations from "./pages/admin/PropertyRegistrations";
import PropertyAdmins from "./pages/admin/PropertyAdmins";

// ==========================================
// Route Protection
// ==========================================

import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {

    return (

        <Routes>

            {/* ==========================================
                Public Routes
            ========================================== */}

            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                path="/register-apartment"
                element={<RegisterApartment />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/reset-password"
                element={<ResetPassword />}
            />

            {/* ==========================================
                SUPER_ADMIN Routes
            ========================================== */}

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["SUPER_ADMIN"]}
                    >
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/registrations"
                element={
                    <ProtectedRoute
                        allowedRoles={["SUPER_ADMIN"]}
                    >
                        <PropertyRegistrations />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/property-admins"
                element={
                    <ProtectedRoute
                        allowedRoles={["SUPER_ADMIN"]}
                    >
                        <PropertyAdmins />
                    </ProtectedRoute>
                }
            />

            {/* ==========================================
                PROPERTY_ADMIN Routes
            ========================================== */}

            <Route
                path="/property/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["PROPERTY_ADMIN"]}
                    >
                        <PropertyDashboard />
                    </ProtectedRoute>
                }
            />

            {/* ==========================================
                MANAGER Routes
            ========================================== */}

            {/*
            <Route
                path="/manager/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["MANAGER"]}
                    >
                        <ManagerDashboard />
                    </ProtectedRoute>
                }
            />
            */}

            {/* ==========================================
                RESIDENT Routes
            ========================================== */}

            {/*
            <Route
                path="/resident/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["RESIDENT"]}
                    >
                        <ResidentDashboard />
                    </ProtectedRoute>
                }
            />
            */}

        </Routes>

    );

}