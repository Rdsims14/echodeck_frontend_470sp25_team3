import { useState } from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Rounter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addSounds" element={<AddSounds />} />
        <Route path="/viewSounds/:id" element={<ViewSounds />} />
        {/* Add other routes as needed */}
      </Routes>
      <Home />
      </Rounter>
    </div>
  );
}

export default App
