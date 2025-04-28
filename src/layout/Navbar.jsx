import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthService from "../auth/AuthService";
import "../styles/Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = AuthService.isAuthenticated();
    const navbarCollapseRef = useRef(null);
    const navbarTogglerRef = useRef(null);

    const handleLogout = () => {
        AuthService.logout();
    };

    // Helper function to close the navbar
    const closeNavbar = () => {
        if (navbarCollapseRef.current && navbarCollapseRef.current.classList.contains('show')) {
            // For Bootstrap 5, we need to use bootstrap's collapse instance
            if (window.bootstrap && window.bootstrap.Collapse) {
                const bsCollapse = new window.bootstrap.Collapse(navbarCollapseRef.current);
                bsCollapse.hide();
            } else {
                // Fallback to click method
                navbarTogglerRef.current.click();
            }
        }
    };

    // Close navbar when location changes
    useEffect(() => {
        closeNavbar();
    }, [location]);

    // Handle clicks outside the navbar
    useEffect(() => {
        function handleOutsideClick(event) {
            if (navbarCollapseRef.current &&
                !navbarCollapseRef.current.contains(event.target) &&
                !navbarTogglerRef.current.contains(event.target) &&
                navbarCollapseRef.current.classList.contains('show')) {

                closeNavbar();
            }
        }

        // Add both mouse and touch events for better mobile support
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, []);

    // Ensure the navbar toggler button toggles the menu properly
    useEffect(() => {
        const navbarToggler = navbarTogglerRef.current;

        function handleToggle() {
            if (navbarCollapseRef.current) {
                navbarCollapseRef.current.classList.toggle('show');
            }
        }

        if (navbarToggler) {
            navbarToggler.addEventListener('click', handleToggle);
        }

        return () => {
            if (navbarToggler) {
                navbarToggler.removeEventListener('click', handleToggle);
            }
        };
    }, []);

    // Add click handlers to nav links to close menu on mobile
    const handleNavLinkClick = () => {
        if (window.innerWidth < 992) { // Bootstrap's lg breakpoint
            closeNavbar();
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" onClick={handleNavLinkClick}>
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
                        ref={navbarTogglerRef}
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
                                    <Link to="/signup" className="nav-link btn btn-outline-light me-2" onClick={handleNavLinkClick}>
                                        Sign Up
                                    </Link>
                                    <Link to="/login" className="nav-link btn btn-outline-light me-2" onClick={handleNavLinkClick}>
                                        Login
                                    </Link>
                                </>
                            ) : (
                                <button onClick={() => { handleLogout(); handleNavLinkClick(); }} className="nav-link btn btn-outline-light me-2">
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