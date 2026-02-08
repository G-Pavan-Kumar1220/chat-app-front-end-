import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue-600">404</h1>
        <p className="text-xl text-gray-700 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mt-2 mb-6">
          The route you are trying to access does not exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
