import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "./AuthService";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    // ✅ Ensure AuthService is correctly imported and configured
    const handleSignUp = async (e) => {
        e.preventDefault();
        setMessage(""); // ✅ Clear previous messages
        setLoading(true);
        // ✅ Validate email format
        try {
            await AuthService.register(email, password);
            setMessage("✅ Registration successful! Redirecting to login...");

            // Redirect to login page after successful registration (with brief delay)
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            // Check for specific error codes
            if (error.response && error.response.status === 409) {
                setMessage("❌ Email already in use. Please try another.");
            } else {
                setMessage("❌ Registration failed. Please try again later.");
            }
        } finally {
            setLoading(false); // ✅ Reset loading state regardless of outcome
        }
    };
    // ✅ Ensure the component is styled correctly
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-form">
                    <h2 className="mb-4 text-center">Sign Up</h2>
                    <form onSubmit={handleSignUp}>
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
                                {loading ? "Signing Up..." : "Sign Up"}
                            </button>
                            <Link to="/" className="btn btn-secondary w-50">
                                Back
                            </Link>
                        </div>
                    </form>
                    <p className="mt-3">{message}</p>
                    <div className="mt-3">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
