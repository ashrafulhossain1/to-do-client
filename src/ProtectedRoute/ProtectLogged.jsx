import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, Outlet } from 'react-router';

const ProtectLogged = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // Show loading spinner while Firebase is checking auth state
        return <h3>loading</h3>
    }

    if (user) {
        // If there is no user (not authenticated), redirect to login page
        return <Navigate to="/" />;
    }
    return <Outlet></Outlet>

};

export default ProtectLogged;