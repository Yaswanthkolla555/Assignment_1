import React, { useState } from "react";
import Home from "./pages/Home";
import AboutMe from "./pages/About"; 
import ContactMe from "./pages/ContactMe"; 
import AboutProject from "./pages/AboutProject"; 
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home"); 

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false); 
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-0 bg-blue-800 text-white p-6 md:w-64 transition-transform duration-500 ease-in-out z-50 md:static md:translate-x-0`}
      >
        <h2 className="text-2xl font-semibold mb-6 transition-all ease-in-out duration-300 hover:text-yellow-400">
          Dashboard
        </h2>
        <ul>
          <li
            className="mb-4 p-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            onClick={() => handlePageChange("Home")}
          >
            Home
          </li>
          <li
            className="mb-4 p-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            onClick={() => handlePageChange("AboutProject")}
          >
            About Project
          </li>

          <li
            className="mb-4 p-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            onClick={() => handlePageChange("AboutMe")}
          >
            About Me
          </li>

          <li
            className="mb-4 p-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            onClick={() => handlePageChange("ContactMe")}
          >
            Contact Me
          </li>

        </ul>
      </div>

      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden`}
        onClick={toggleSidebar}
      ></div>

      <div className="flex-1 p-6">

        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 bg-blue-500 text-white rounded-lg mb-6 transition-all duration-300 ease-in-out hover:bg-blue-700"
        >
          Toggle Sidebar
        </button>

        {activePage === "Home" && <Home />}
        {activePage === "AboutMe" && <AboutMe />}
        {activePage === "ContactMe" && <ContactMe />}
        {activePage === "AboutProject" && <AboutProject />} 
      </div>
    </div>
  );
};

export default App;
