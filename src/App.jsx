import { useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import UploadSounds from './sounds/UploadSounds'; // Import the AddSounds component
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import ViewSounds from "./sounds/ViewSounds";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploadsounds" element={<UploadSounds />} /> {/* Updated route */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/viewsound/:id" element={<ViewSounds />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;