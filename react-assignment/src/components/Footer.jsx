import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 text-center py-4 mt-auto">
      <p>© {new Date().getFullYear()} PLP Task Manager. All rights reserved.</p>
    </footer>
  );
};

export default Footer;