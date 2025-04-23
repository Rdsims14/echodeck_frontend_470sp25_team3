import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../auth/AuthService";
import "../styles/Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = AuthService.isAuthenticated();
    const navbarCollapseRef = useRef(null);

    const handleLogout = () => {
        AuthService.logout();
        // Redirect handled in AuthService logout method
    };

    // Handle clicks outside the navbar
    useEffect(() => {
        function handleClickOutside(event) {
            if (navbarCollapseRef.current &&
                !navbarCollapseRef.current.contains(event.target) &&
                navbarCollapseRef.current.classList.contains('show')) {

                // Get the navbar toggler button and click it to close the menu
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler && !navbarToggler.contains(event.target)) {
                    navbarToggler.click();
                }
            }
        }

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
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

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                        ref={navbarCollapseRef}
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* Your nav items */}
                        </ul>

                        <div className="d-flex navbar-nav">
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/signup" className="nav-link btn btn-outline-light me-2">
                                        Sign Up
                                    </Link>
                                    <Link to="/login" className="nav-link btn btn-outline-light me-2">
                                        Login
                                    </Link>
                                </>
                            ) : (
                                <button onClick={handleLogout} className="nav-link btn btn-outline-light me-2">
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
