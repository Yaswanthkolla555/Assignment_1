import React, { useState } from "react";
import Home from "./pages/Home";
import AboutMe from "./pages/About"; // Add an AboutMe component
import ContactMe from "./pages/ContactMe"; // Add a ContactMe component
import AboutProject from "./pages/AboutProject"; // Import AboutProject component

const App = () => {
  // State for handling sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home"); // Track active page

  // Function to toggle sidebar visibility
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Handle page change
  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false); // Close sidebar on page change
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-0 bg-blue-800 text-white p-6 md:w-64 transition-transform duration-500 ease-in-out z-50 md:static md:translate-x-0`}
      >
        <h2 className="text-2xl font-semibold mb-6 transition-all ease-in-out duration-300 hover:text-yellow-400">
          Dashboard
        </h2>
        <ul>
          {/* Home Link */}
          <li
            className="mb-4 p-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            onClick={() => handlePageChange("Home")}
          >
            Home
          </li>
          {/* About Project Link */}
          <li
            className="mb-4 p-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            onClick={() => handlePageChange("AboutProject")}
          >
            About Project
          </li>

          {/* About Me Link */}
          <li
            className="mb-4 p-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            onClick={() => handlePageChange("AboutMe")}
          >
            About Me
          </li>

          {/* Contact Me Link */}
          <li
            className="mb-4 p-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            onClick={() => handlePageChange("ContactMe")}
          >
            Contact Me
          </li>

        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden`}
        onClick={toggleSidebar}
      ></div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Button to toggle sidebar on smaller screens */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 bg-blue-500 text-white rounded-lg mb-6 transition-all duration-300 ease-in-out hover:bg-blue-700"
        >
          Toggle Sidebar
        </button>

        {/* Render active page */}
        {activePage === "Home" && <Home />}
        {activePage === "AboutMe" && <AboutMe />}
        {activePage === "ContactMe" && <ContactMe />}
        {activePage === "AboutProject" && <AboutProject />} {/* AboutProject Page */}
      </div>
    </div>
  );
};

export default App;
