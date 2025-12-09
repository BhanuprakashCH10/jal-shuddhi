import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-[80vh]">
      
      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 bg-green-50 rounded-lg mt-4">
        <h1 className="text-5xl font-bold text-green-800 mb-6">
          Clean India, Green India
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          Jal Shuddhi is a community-driven platform to identify, report, and clean up waste in your local area. Together, we can make a difference.
        </p>
        
        <div className="space-x-4">
          <Link to="/report">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-md">
              Report Waste Now
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition shadow-sm">
              Join as Volunteer
            </button>
          </Link>
        </div>
      </div>

      {/* Feature Section (Simple Grid) */}
      <div className="grid md:grid-cols-3 gap-8 mt-12 px-4">
        <div className="p-6 bg-white rounded-xl shadow-md text-center border border-gray-100">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="text-xl font-bold mb-2">Snap a Photo</h3>
          <p className="text-gray-500">Take a picture of the waste or garbage dump you spot.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md text-center border border-gray-100">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="text-xl font-bold mb-2">Geo-Tag Location</h3>
          <p className="text-gray-500">Your location is automatically marked on our live map.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md text-center border border-gray-100">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-bold mb-2">Get it Cleaned</h3>
          <p className="text-gray-500">Authorities and volunteers are notified to take action.</p>
        </div>
      </div>

    </div>
  );
};

export default Home;