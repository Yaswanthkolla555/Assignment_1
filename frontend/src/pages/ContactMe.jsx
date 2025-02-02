import React from "react";

const ContactMe = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105">
      <h2 className="text-3xl font-semibold mb-4 text-blue-600 transition-transform duration-500 ease-in-out hover:scale-105">
        Contact Me
      </h2>
      <p className="text-lg text-gray-700 mb-4">
        If you'd like to get in touch or learn more about my work, feel free to reach out to me through the following platforms:
      </p>
      
      <ul className="list-disc pl-6 mt-2 space-y-3 text-lg">
        <li className="text-gray-800 hover:text-blue-600 transition-all duration-300">
          <strong>Email:</strong> <a href="mailto:kollayaswanth555@gmail.com" className="text-blue-500 hover:underline">kollayaswanth555@gmail.com</a>
        </li>
        <li className="text-gray-800 hover:text-blue-600 transition-all duration-300">
          <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yaswanth-kolla-48a66b274/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Kolla Yaswanth</a>
        </li>
        <li className="text-gray-800 hover:text-blue-600 transition-all duration-300">
          <strong>GitHub:</strong> <a href="https://github.com/Yaswanthkolla555" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Yaswanthkolla555</a>
        </li>
      </ul>
    </div>
  );
};

export default ContactMe;
