import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
      {/* Card */}
      <div className="w-full max-w-md sm:max-w-lg bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Welcome to Dashboard
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm sm:text-base mb-8">
          Manage your activities and start conversations instantly.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/login")}
          className="w-full sm:w-auto px-8 py-4 rounded-xl
                     bg-linear-to-r from-blue-600 to-indigo-600
                     text-white font-semibold text-lg
                     hover:scale-105 hover:shadow-xl
                     active:scale-95 transition-all duration-300"
        >
          Go to Chat
        </button>

        {/* Footer text */}
        <p className="mt-6 text-xs text-gray-500">
          Optimized for all devices • Secure • Fast
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
