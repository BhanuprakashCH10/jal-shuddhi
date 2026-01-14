import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReportWaste = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    category: 'General',
    location: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Image, setBase64Image] = useState(""); // Store the image string here
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW: Convert Image to Base64 String ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 1. Show Preview
      setImagePreview(URL.createObjectURL(file));

      // 2. Convert to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64Image(reader.result); // This result is a long string representing the image
      };
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          location: `${position.coords.latitude}, ${position.coords.longitude}`
        }));
        setLoadingLocation(false);
      },
      (error) => {
        alert("Unable to retrieve location");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login first!");
      navigate('/login');
      return;
    }

    if (!base64Image) {
      alert("Please upload a photo of the waste.");
      return;
    }

    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem('userId') || "guest"; 
      
      const payload = {
        ...formData,
        userId,
        imageUrl: base64Image // Send the actual image string
      };

      await axios.post('https://jal-shuddhi-api.vercel.app/api/reports', payload);

      alert("Report Submitted Successfully!");
      navigate('/dashboard'); // Go to dashboard to see the image

    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Image might be too large.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Report Waste</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                  <p className="text-xs text-gray-500">JPG, PNG (Max 5MB)</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Waste Type</label>
            <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
              <option>General Waste</option>
              <option>Plastic</option>
              <option>Organic/Food</option>
              <option>Hazardous/Chemical</option>
              <option>Construction Debris</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <div className="flex mt-1">
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm" required />
              <button type="button" onClick={handleGetLocation} className="bg-gray-200 px-4 py-2 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300 text-sm">
                {loadingLocation ? "..." : "📍 Detect"}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400">
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportWaste;