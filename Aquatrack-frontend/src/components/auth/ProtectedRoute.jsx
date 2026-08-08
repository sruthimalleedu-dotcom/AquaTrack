import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
    children,
    allowedRoles = [],
}) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // User not logged in

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Role not allowed

    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(role)
    ) {
        return <Navigate to="/login" replace />;
    }

    return children;

}