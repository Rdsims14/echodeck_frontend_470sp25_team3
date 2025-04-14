import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./AuthService";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // ✅ Clear previous messages
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                email,
                password,
            });

            const token = response.data;

            // Validate token format
            if (!token || token.split(".").length !== 3) {
                console.error("Invalid token received:", token);
                throw new Error("Invalid token format");
            }

            // Use AuthService to store token
            AuthService.login(token);

            setMessage("✅ Login successful! Redirecting...");
            setTimeout(() => navigate("/"), 1500); // ✅ Redirect after delay
        } catch (error) {
            // Check for specific error codes from backend
            if (error.response && error.response.status === 401) {
                setMessage("❌ Invalid username or password.");
            } else {
                setMessage("❌ Login failed. Please try again later.");
            }
            console.error("Login error:", error);
        } finally {
            setLoading(false); // ✅ Reset loading state regardless of outcome
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", width: "100vw", display: "flex" }}>
            <div className="p-4 border rounded shadow-lg text-center bg-white"
                style={{ width: "350px" }}>
                <h2 className="mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control mb-3"
                    />
                    <div className="d-flex justify-content-between">
                        <button type="submit" disabled={loading} className="btn custom-primary-button w-50 me-2">
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                        <Link to="/" className="btn btn-secondary w-50">
                            Back
                        </Link>
                    </div>
                </form>
                <p className="mt-3">{message}</p>
                <div className="mt-3">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}
