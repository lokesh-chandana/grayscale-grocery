
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 animate-fade-in">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-6">404</h1>
          <p className="text-xl text-black/60 mb-8">This page was not found</p>
          
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-black bg-black text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
