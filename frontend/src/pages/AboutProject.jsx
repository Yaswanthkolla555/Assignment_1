import React from "react";

const AboutProject = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4 text-blue-600 transition-transform duration-500 ease-in-out hover:scale-105">
        About Excel Data Importer Project
      </h2>
      <p className="text-lg mb-4">
        The "Excel Data Importer" helps import Excel data into web apps, automating parsing, preview, and import processes. It’s perfect for managing large datasets efficiently.
      </p>

      <h3 className="text-2xl font-semibold mt-4 text-blue-500">Features:</h3>
      <ul className="list-disc pl-6 mt-2 space-y-1 text-lg">
        <li>Supports XLS/XLSX formats</li>
        <li>Real-time data preview</li>
        <li>Auto-maps columns to fields</li>
        <li>Error handling & validation</li>
        <li>Drag-and-drop upload</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-4 text-blue-500">Tech Stack:</h3>
      <ul className="list-disc pl-6 mt-2 space-y-1 text-lg">
        <li>React.js (Frontend)</li>
        <li>Node.js + Express (Backend)</li>
        <li>"xlsx" or "sheetjs" (Excel Parsing)</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-4 text-blue-500">How It Works:</h3>
      <p className="text-lg mt-2">
        Upload and preview Excel files, map and validate data, then import directly into the database.
      </p>

      <h3 className="text-2xl font-semibold mt-4 text-blue-500">Use Cases:</h3>
      <ul className="list-disc pl-6 mt-2 space-y-1 text-lg">
        <li>Importing large datasets</li>
        <li>Automating data entry tasks</li>
        <li>Data migration and review</li>
      </ul>
    </div>
  );
};

export default AboutProject;
