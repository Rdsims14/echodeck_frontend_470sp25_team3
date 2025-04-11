import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulating a sign-up process (replace with actual API call)
        // Replace when backend is ready
        setTimeout(() => {
            setMessage("Sign-up successful!");
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", width: "100vw", display: "flex" }}>
            <div className="p-4 border rounded shadow-lg text-center bg-white"
                style={{ width: "350px" }}>
                <h2 className="mb-4">Sign Up</h2>
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
            </div>
        </div>
    );
}
