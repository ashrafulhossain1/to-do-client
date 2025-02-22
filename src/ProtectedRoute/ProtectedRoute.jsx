import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, Outlet } from "react-router";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <motion.div
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
        </div>
    );
};

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <Navigate to="/signIn" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
