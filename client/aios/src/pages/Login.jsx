// Login.jsx - Use this COMPLETE version
import { useState } from "react";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { fetchUser, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log("1. Logging in with:", { email, password });
            const response = await loginUser({ email, password });
            console.log("2. Login response:", response.data);
            
            // Store tokens
            if (response.data.data?.accessToken) {
                localStorage.setItem('token', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
                console.log("3. Tokens stored");
            }

            // Get user data from response
            const userFromResponse = response.data.data?.user;
            console.log("4. User from response:", userFromResponse);
            
            if (userFromResponse) {
                // ✅ Set user directly from response
                setUser(userFromResponse);
                console.log("5. User set in context");
                
                // ✅ Navigate after a small delay to ensure state is updated
                setTimeout(() => {
                    navigate("/chat");
                }, 100);
            } else {
                // Fallback: try to fetch user
                console.log("5. Trying to fetch user...");
                const userData = await fetchUser();
                console.log("6. Fetched user:", userData);
                
                if (userData) {
                    navigate("/chat");
                } else {
                    setError("Login successful but failed to load user data");
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
            <h1>Login</h1>

            {successMessage && (
                <div style={{ 
                    color: "green", 
                    padding: "10px", 
                    border: "1px solid green",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    backgroundColor: "#d4edda"
                }}>
                    {successMessage}
                </div>
            )}

            {error && (
                <div style={{ 
                    color: "red", 
                    padding: "10px", 
                    border: "1px solid red",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    backgroundColor: "#f8d7da"
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        width: "100%", 
                        padding: "10px",
                        backgroundColor: loading ? "#ccc" : "#007bff",
                        color: "white",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <div style={{ marginTop: "15px", textAlign: "center" }}>
                <Link to="/register">Don't have an account? Register</Link>
            </div>
        </div>
    );
};

export default Login;