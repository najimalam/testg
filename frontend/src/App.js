import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Ensure this is imported
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Added app-container */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="content"> {/* Added content */}
          <h1>Portfolio App</h1> {/* Moved H1 inside content for consistent padding */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div> {/* End content */}
      </div> {/* End app-container */}
    </Router>
  );
}

export default App;
