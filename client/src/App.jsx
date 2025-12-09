import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportWaste from './pages/ReportWaste';
import Dashboard from './pages/Dashboard';

// --- NEW: Protected Route Component ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // If not logged in, redirect to Login
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* --- PROTECTED ROUTE --- */}
            {/* Users cannot access this unless logged in */}
            <Route 
              path="/report" 
              element={
                <ProtectedRoute>
                  <ReportWaste />
                </ProtectedRoute>
              } 
            />

            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;