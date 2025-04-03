import { useState } from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
// import ViewSounds from './sounds/ViewSounds'; // Uncomment this line if you want to use the ViewSounds component


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
      <Home />


    </div>
  );
}

export default App
