import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/NavBar';
import SearchBar from './components/SearchBar';
import PGDetails from './components/PGDetails'; 

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SingUp';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/pg/:id" element={<PGDetails />} /> {/* PG Detail Route */}
      </Routes>
    </Router>
  );
}

export default App;
