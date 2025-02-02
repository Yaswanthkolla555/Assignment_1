import React from "react";

const AboutMe = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105">
      <h2 className="text-3xl font-semibold mb-4 text-blue-600 transition-transform duration-500 ease-in-out hover:scale-105">
        About Me
      </h2>
      <p className="text-lg text-gray-700 mb-4">
        I'm Kolla Yaswanth, a passionate software developer skilled in web development and machine learning. I've built full-stack applications and am always working on enhancing my skills. My expertise spans across React, Node.js, Express, MongoDB, and more. I thrive on solving complex problems and enjoy learning new technologies.
      </p>
      
      <h3 className="text-2xl font-semibold mt-6 text-blue-500">Projects</h3>
      <ul className="list-disc pl-6 mt-2 space-y-2 text-lg">
        <li className="text-gray-800 hover:text-blue-600 transition-all duration-300">
          <strong>Food Delivery Website:</strong> A complete food delivery platform with user authentication, order management, and payment integration.
        </li>
        <li className="text-gray-800 hover:text-blue-600 transition-all duration-300">
          <strong>Plant Disease Recognition:</strong> A machine learning project that detects plant diseases using a trained CNN model.
        </li>
        <li className="text-gray-800 hover:text-blue-600 transition-all duration-300">
          <strong>Face Mask Detection:</strong> A computer vision project that detects if people are wearing face masks.
        </li>
      </ul>
    </div>
  );
};

export default AboutMe;
