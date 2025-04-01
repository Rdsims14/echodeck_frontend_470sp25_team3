import React from 'react';

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Echodeck
                    </a>
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
                        <button className="btn btn-outline-light me-2" type="button">Sign Up</button>
                        <button className="btn btn-outline-light me-2" type="button">Login</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
