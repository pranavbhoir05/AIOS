/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser , logoutUser } from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            setLoading(true);
              const token = localStorage.getItem('token');
             if (!token) {
            setUser(null);
            return null;
        }

            const response = await getCurrentUser();
            setUser(response.data.data);
            return response.data.data;
        } catch (error) {
            // ✅ Handle 401 gracefully - just set user to null
            if (error.response?.status === 401) {
                console.log("No authenticated user found");
                 localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
                setUser(null);
            } else {
                console.error("Auth error:", error);
                setUser(null);
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Load user on mount
    useEffect(() => {
        const loadUser = async () => {
            await fetchUser();
        };
        loadUser();
    }, []);

  const logout = async () => {
    try {
        await logoutUser();
    } catch (error) {
        console.error(error);
    } finally {
        setUser(null);
    }
};

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                fetchUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};