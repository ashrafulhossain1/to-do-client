import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, Outlet } from 'react-router';
import { motion } from 'framer-motion';

const ProtectLogged = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // Show loading spinner while Firebase is checking auth state
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <motion.div
                    className="relative w-16 h-16 flex justify-center items-center"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                >
                    {/* Outer Glowing Ring */}
                    <motion.div
                        className="absolute w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />

                    {/* Middle Ring with Gradient */}
                    <motion.div
                        className="absolute w-12 h-12 border-4 border-transparent border-t-cyan-400 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />

                    {/* Inner Pulsating Dot */}
                    <motion.div
                        className="w-4 h-4 bg-blue-500 rounded-full shadow-lg"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity
                        }}
                    />
                </motion.div>
            </div>
        )
    }

    if (user) {
        // If there is no user (not authenticated), redirect to login page
        return <Navigate to="/" />;
    }
    return <Outlet></Outlet>

};

export default ProtectLogged;