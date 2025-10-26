import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-8">
      © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
    </footer>
  );
}
