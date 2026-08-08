import { Routes, Route } from "react-router-dom";

// ==========================================
// Public Pages
// ==========================================

import LandingPage from "./pages/LandingPage";
import RegisterApartment from "./pages/RegisterApartment";


import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// ==========================================
// Dashboard Pages
// ==========================================

import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";
import PropertyDashboard from "./pages/dashboard/PropertyAdminDashboard";
import ManagerDashboard from "./pages/dashboard/ManagerDashboard";
import ResidentDashboard from "./pages/dashboard/ResidentDashboard";

// ==========================================
//  Property Admin Pages
// ==========================================

import ApartmentList from "./pages/property/ApartmentList";
import BuildingList from "./pages/property/BuildingList";
import ManagerList from "./pages/property/ManagerList";
import FloorList from "./pages/property/FloorList";



// ==========================================
//  Manager Pages
// ==========================================

import HouseholdList from "./pages/manager/HouseholdList";
import ResidentList from "./pages/manager/ResidentList";
import BillingCycleList from "./pages/manager/BillingCycleList";
import WaterUsageList from "./pages/manager/WaterUsageList";
import BulkWaterPurchaseList from "./pages/manager/BulkWaterPurchaseList";
import ConsumptionDistributionList from "./pages/manager/ConsumptionDistributionList";
import WaterBillList from "./pages/manager/WaterBillList";
import ManagerPaymentList from "./pages/manager/ManagerPaymentList";

// ==========================================
// Admin Pages
// ==========================================

import PropertyRegistrations from "./pages/admin/PropertyRegistrations";
import PropertyAdminActivation from "./pages/auth/PropertyAdminActivation";
import PropertyAdmins from "./pages/admin/PropertyAdmins";
import ManagerActivation from "./pages/auth/ManagerActivation";


// ==========================================
// Resident Pages
// ==========================================
import ResidentActivation from "./pages/auth/ResidentActivation";
import MyHouseholdList from "./pages/resident/MyHouseholdList";
import MyWaterUsageList from "./pages/resident/MyWaterUsageList";
import MyWaterBillsList from "./pages/resident/MyWaterBillsList";
import MyPaymentsList from "./pages/resident/MyPaymentsList";

// ==========================================
// Route Protection
// ==========================================

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { i } from "framer-motion/client";


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
                        <SuperAdminDashboard />
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

            <Route
                path="/admin/profile"
                element={
                    <ProtectedRoute
                        allowedRoles={["SUPER_ADMIN"]}
                    >
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* ==========================================
                PROPERTY_ADMIN Routes
            ========================================== */}

            <Route
                path="/property-admin/activate"
                element={<PropertyAdminActivation />}
            />

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

            <Route
                path="/property/apartments"
                element={
                    <ProtectedRoute
                        allowedRoles={["PROPERTY_ADMIN"]}
                    >
                        <ApartmentList />
                    </ProtectedRoute>
                }
            />


            <Route
                path="/property/buildings"
                element={
                    <ProtectedRoute allowedRoles={["PROPERTY_ADMIN"]}>
                        <BuildingList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/property/managers"
                element={
                    <ProtectedRoute allowedRoles={["PROPERTY_ADMIN"]}>
                        <ManagerList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/property/floors"
                element={
                    <ProtectedRoute allowedRoles={["PROPERTY_ADMIN"]}>
                        <FloorList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/property/profile"
                element={
                    <ProtectedRoute allowedRoles={["PROPERTY_ADMIN"]}>
                        <Profile />
                    </ProtectedRoute>
                }
            />  



            {/* ==========================================
                MANAGER Routes
            ========================================== */}
            <Route
                path="/manager/activate"
                element={<ManagerActivation />}
            />
            
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

            <Route
                path="/manager/households"
                element={
                    <ProtectedRoute
                        allowedRoles={["MANAGER"]}
                    >
                        <HouseholdList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/manager/residents"
                element={
                    <ProtectedRoute
                        allowedRoles={["MANAGER"]}
                    >
                        <ResidentList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/manager/billing-cycles"
                element={
                    <ProtectedRoute allowedRoles={["MANAGER"]}>
                        <BillingCycleList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/manager/water-usage"
                element={
                    <ProtectedRoute allowedRoles={["MANAGER"]}>
                        <WaterUsageList />
                    </ProtectedRoute>
                }
             />

            <Route
                path="/manager/bulk-water-purchases"
                element={
                    <ProtectedRoute allowedRoles={["MANAGER"]}>
                        <BulkWaterPurchaseList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/manager/consumption-distribution"
                element={
                    <ProtectedRoute allowedRoles={["MANAGER"]}>
                        <ConsumptionDistributionList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/manager/water-bills"
                element={
                    <ProtectedRoute allowedRoles={["MANAGER"]}>
                        <WaterBillList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/manager/payments"
                element={
                    <ProtectedRoute allowedRoles={["MANAGER"]}>
                        <ManagerPaymentList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/manager/profile"
                element={
                    <ProtectedRoute allowedRoles={["MANAGER"]}>
                        <Profile />
                    </ProtectedRoute>
                }
            />


            {/* ==========================================
                RESIDENT Routes
            ========================================== */}

            <Route
                path="/resident/activate"
                element={<ResidentActivation />}
            />

            
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

            <Route
                path="/resident/my-household"
                element={
                    <ProtectedRoute
                        allowedRoles={["RESIDENT"]}
                    >
                        <MyHouseholdList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/resident/water-usage"
                element={
                    <ProtectedRoute
                        allowedRoles={["RESIDENT"]}
                    >
                        <MyWaterUsageList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/resident/water-bills"
                element={
                    <ProtectedRoute
                        allowedRoles={["RESIDENT"]}
                    >
                        <MyWaterBillsList />        
                    </ProtectedRoute>
                }
            />

            <Route
                path="/resident/my-payments"
                element={
                    <ProtectedRoute
                        allowedRoles={["RESIDENT"]}
                    >
                        <MyPaymentsList />        
                    </ProtectedRoute>
                }
            />

            <Route
                path="/resident/profile"
                element={
                    <ProtectedRoute
                        allowedRoles={["RESIDENT"]}
                    >
                        <Profile />
                    </ProtectedRoute>
                }
            />
           

        </Routes>

    );

}