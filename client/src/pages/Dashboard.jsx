import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports');
        setReports(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleMarkCleaned = async (id) => {
    // Security Check: If not logged in, redirect to login
    if (!isLoggedIn) {
      alert("Please login to verify cleanups!");
      navigate('/login');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/reports/${id}/status`, { status: 'Cleaned' });
      setReports(reports.map(report => report._id === id ? { ...report, status: 'Cleaned' } : report));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 mb-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Community Reports</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) => (
          <div key={report._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
            
            <div className="h-48 bg-gray-200 overflow-hidden relative">
              <img src={report.imageUrl} alt="Waste" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full text-white ${report.status === 'Cleaned' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {report.status}
                </span>
              </div>
            </div>

            <div className="p-6 flex-grow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded-full">
                  {report.category}
                </span>
                {/* --- SHOW USER NAME --- */}
                <span className="text-xs text-gray-500 font-medium">
                  By: {report.userId ? report.userId.name : "Anonymous"}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{report.description}</p>
              <div className="text-sm text-gray-500">📍 {report.location}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(report.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* --- ONLY SHOW BUTTON IF NOT CLEANED --- */}
            {report.status !== 'Cleaned' && (
              <div className="p-4 bg-gray-50 border-t">
                <button 
                  onClick={() => handleMarkCleaned(report._id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
                >
                  {isLoggedIn ? "✅ Mark as Cleaned" : "🔒 Login to Update"}
                </button>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;