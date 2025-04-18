import { useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import UploadSounds from './sounds/UploadSounds';
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import ViewSounds from "./sounds/ViewSounds";
import LogoutSuccess from "./auth/LogoutSuccess"; // ✅ Import new logout page
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthService from "./auth/AuthService";

// Simple ProtectedRoute - only checks authentication, not roles
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout-success" element={<LogoutSuccess />} /> {/* ✅ New route */}
          <Route path="/viewsound/:id" element={<ViewSounds />} /> {/* Make this public */}

          {/* Protected Routes - require authentication */}
          <Route
            path="/uploadsounds"
            element={
              <ProtectedRoute element={<UploadSounds />} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;