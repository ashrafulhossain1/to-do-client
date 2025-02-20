// ProtectedRoute.js
// import { useContext } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
// import { Outlet, Navigate } from "react-router-dom";
// import Loading from "../components/shared/Loading/Loading";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // Show loading spinner while Firebase is checking auth state
        return <h3>Login now</h3>
    }

    if (!user) {
        // If there is no user (not authenticated), redirect to login page
        return <Navigate to="/signIn" />;
    }

    // If the user is authenticated, render the protected route
    return <Outlet />;
};

export default ProtectedRoute;
