import React from 'react';
import { Link } from 'react-router-dom';

export default function LogoutSuccess() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-form text-center">
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
        </div>
    );
}