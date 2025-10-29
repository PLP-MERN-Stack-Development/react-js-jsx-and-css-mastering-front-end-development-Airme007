// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">PLP Task Manager</h1>
        <ul className="flex gap-6">
          <li className="hover:text-gray-200 cursor-pointer">Home</li>
          <li className="hover:text-gray-200 cursor-pointer">Tasks</li>
          <li className="hover:text-gray-200 cursor-pointer">About</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
