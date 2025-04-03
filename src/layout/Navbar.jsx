import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Echodeck</Link>
                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="ms-auto">
                    <Link className="btn btn-outline-light me-2" to="/signup">Sign Up</Link>
                    <button className="btn btn-outline-light me-2" type="button">Login</button>
                </div>
            </div>
        </nav>
    );
}
