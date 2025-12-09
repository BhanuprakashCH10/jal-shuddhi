import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in by looking for the token in memory
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    // 1. Clear the data from memory
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');

    // 2. Alert and redirect to login
    alert("Logged out successfully");
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-600 flex items-center">
              <span>🌱 Jal Shuddhi</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            
            {/* Common Link: Report Waste is always visible */}
            <Link to="/report" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">
              Report Waste
            </Link>

            {/* CONDITIONAL RENDERING: Check if User is Logged In */}
            {token ? (
              // --- IF LOGGED IN ---
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">
                  Community Feed
                </Link>
                
                <div className="flex items-center space-x-4 ml-4">
                  <span className="text-green-800 bg-green-100 px-3 py-1 rounded-full text-sm font-semibold">
                    Hello, {userName}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              // --- IF LOGGED OUT ---
              <>
                <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition duration-300">
                  Home
                </Link>
                <Link to="/login">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 shadow-md">
                    Login / Signup
                  </button>
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button (Simple) */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;