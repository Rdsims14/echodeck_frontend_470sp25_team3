import React from 'react';
import { Link } from 'react-router-dom';

export default function LogoutSuccess() {
    return (
        <div className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", width: "100vw", display: "flex" }}>
            <div className="p-4 border rounded shadow-lg text-center bg-white"
                style={{ width: "350px" }}>
                <h2 className="mb-4">Logged Out Successfully</h2>
                <p>You have been successfully logged out.</p>
                <div className="mt-4">
                    <Link to="/login" className="btn custom-primary-button me-3">
                        Log In Again
                    </Link>
                    <Link to="/" className="btn btn-secondary">
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}