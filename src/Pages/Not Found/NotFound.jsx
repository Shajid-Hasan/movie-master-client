import React from "react";
import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white text-center">
            <h1 className="text-6xl font-extrabold text-red-600">404</h1>
            <p className="text-xl mt-4 mb-6">Oops! The page you're looking for doesn’t exist.</p>
            <Link
                to="/"
                className="px-6 py-3 bg-red-700 rounded-lg hover:bg-red-800 transition-colors"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
