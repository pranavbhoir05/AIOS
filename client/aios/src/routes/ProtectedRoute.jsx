import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "100vh" 
            }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    // Redirect to login if no user
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Render children if authenticated
    return children;
};

export default ProtectedRoute;