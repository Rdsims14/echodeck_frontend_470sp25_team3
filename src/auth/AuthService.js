import axios from "axios";
import { API_BASE_URL } from '../api';

const API_URL = `${API_BASE_URL}/auth`;

const AuthService = {
    // ✅ Register a new user with hidden USER role
    register: async (email, password) => {
        try {
            // Always include USER role in the request without showing it to user
            const response = await axios.post(`${API_URL}/register`, {
                email,
                password,
                role: "USER" // Changed from PRIVILEGED_USER to USER
            });
            return response.data;
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error;
        }
    },

    // ✅ Store only the token, not email
    login: (token) => {
        if (!token || token.split(".").length !== 3) {
            console.error("Invalid token received:", token);
            return;
        }
        localStorage.setItem("token", token);
    },

    // ✅ Logout with confirmation & redirect
    logout: () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?"); // ✅ Confirm before logging out
        if (!confirmLogout) return;

        // Remove authentication token
        localStorage.removeItem("token");

        // Clear the sounds from session storage
        sessionStorage.removeItem('sounds');

        window.location.href = "/logout-success"; // ✅ Redirect to logout confirmation page
    },

    // ✅ Check if a token exists and is valid
    isAuthenticated: () => {
        const token = localStorage.getItem("token");
        if (!token || token.split(".").length !== 3) return false;

        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
            const expiryTime = payload.exp * 1000;
            if (Date.now() >= expiryTime) {
                localStorage.removeItem("token"); // Just remove token without confirmation if expired
                return false;
            }
            return true;
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem("token"); // Just remove token without confirmation if invalid
            return false;
        }
    },

    // ✅ Retrieve token for debugging purposes
    getToken: () => {
        return localStorage.getItem("token");
    },

    // ✅ Manually clear the token (for debugging purposes)
    clearToken: () => {
        localStorage.removeItem("token");
    },

    // ✅ Attach token to API requests
    getAuthHeader: () => {
        const token = localStorage.getItem("token");
        return token && token.split(".").length === 3 ? { Authorization: `Bearer ${token}` } : {};
    },
};

export default AuthService;