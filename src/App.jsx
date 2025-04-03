import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import AddSounds from './sounds/AddSounds'; // Import the AddSounds component

function App() {
  return (
    <div className="App"> {/* Properly opened <div> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-sound" element={<AddSounds />} /> {/* Add this route */}
        </Routes>
        
      </Router>
    </div> 
  );
}

export default App;