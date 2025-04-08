import React from "react";
import { Link } from "react-router-dom";  // Make sure to import Link for navigation

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Echodeck
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="ms-auto">
                        <Link to="/signup" className="btn btn-outline-light me-2">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-outline-light me-2">
                            Login
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}
