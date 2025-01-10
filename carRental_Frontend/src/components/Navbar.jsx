import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "/src/pages/auth/AuthContext"; // Import the custom hook
import { Link as ScrollLink } from "react-scroll"; // Import ScrollLink for smooth scrolling

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Consume authentication context
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  // Function to handle scroll event and update the active link
  const handleScroll = () => {
    const sections = ["home", "about", "services", "clients", "pricing", "booking"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
          setActiveLink(section);
        }
      }
    });
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to set active link manually when clicked
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-lg ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className={`text-white text-3xl font-extrabold cursor-pointer transition duration-300 `}
          onClick={() => handleLinkClick("home")}
        >
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text">Car Rental</span>
        </ScrollLink>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-8">
          {["home", "about", "services", "clients", "pricing", "booking"].map((link) => (
            <ScrollLink
              key={link}
              to={link}
              smooth={true}
              duration={500}
              className={`text-gray-300 cursor-pointer transition duration-300 relative overflow-hidden hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg ${activeLink === link ? "bg-blue-500 text-white font-semibold" : ""}`}
              onClick={() => handleLinkClick(link)} // Set active link on click
            >
              {link.charAt(0).toUpperCase() + link.slice(1)} {/* Capitalize first letter */}
            </ScrollLink>
          ))}
        </div>

        {/* Authentication or User Info */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <div className="text-white flex items-center space-x-4">
              <span className="font-semibold">{user?.name}</span> {/* Display user name */}
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 hover:scale-105 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth/signin"
                className="text-white border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-gray-900 hover:scale-105 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:scale-105 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          {["home", "about", "services", "pricing", "booking", "clients"].map((link) => (
            <ScrollLink
              key={link}
              to={link}
              smooth={true}
              duration={500}
              className={`block text-gray-300 cursor-pointer transition duration-300 relative overflow-hidden hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg ${activeLink === link ? "bg-blue-500 text-white font-semibold" : ""}`}
              onClick={() => {
                handleLinkClick(link);
                setMenuOpen(false); // Close menu on click
              }}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)} {/* Capitalize first letter */}
            </ScrollLink>
          ))}
          <div className="border-t border-gray-700 my-2"></div>
          {isAuthenticated ? (
            <div className="block text-white text-center px-4 py-2">
              <span className="font-semibold">{user?.name}</span> {/* Display user name */}
              <button
                onClick={logout}
                className="block bg-red-600 text-white w-full text-left px-4 py-2 hover:bg-red-500 hover:scale-105 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth/signin"
                className="block text-white border border-blue-500 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-gray-900 hover:scale-105 transition duration-300"
                onClick={() => {
                  setMenuOpen(false); // Close menu on click
                }}
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="block bg-blue-600 text-white w-full text-left px-4 py-2 rounded-lg hover:bg-blue-500 hover:scale-105 transition duration-300"
                onClick={() => {
                  setMenuOpen(false); // Close menu on click
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
