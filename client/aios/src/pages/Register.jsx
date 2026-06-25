import { useState } from "react";
import { registerUser } from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

// Register.jsx - Update your handleSubmit
const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        console.log("📤 Sending registration data:", form);
        
        const response = await registerUser(form);
        console.log("✅ Registration response:", response);
        console.log("✅ Response data:", response.data);
        
        navigate("/", { 
            state: { message: "✅ Registration successful! Please login." } 
        });
    } catch (error) {
        console.log("❌ ERROR OBJECT:", error);
        console.log("❌ Error response:", error.response);
        console.log("❌ Error data:", error.response?.data);
        console.log("❌ Error status:", error.response?.status);
        console.log("❌ Error message:", error.message);
        
        // Show specific error
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error ||
                           error.message || 
                           "Registration failed. Please try again.";
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
};
    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
            <h1>Register</h1>

            {error && (
                <div style={{ color: "red", marginBottom: "10px", padding: "10px", border: "1px solid red" }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        name="fullName"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
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
                        backgroundColor: loading ? "#ccc" : "#28a745",
                        color: "white",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <div style={{ marginTop: "15px", textAlign: "center" }}>
                <Link to="/">Already have an account? Login</Link>
            </div>
        </div>
    );
};

export default Register;