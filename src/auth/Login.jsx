import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthService from "./AuthService";
import { API_BASE_URL } from '../api';

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
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
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
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-form">
                    <h2 className="mb-4 text-center">Login</h2>
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
        </div>
    );
}
