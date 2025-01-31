import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/api";

const UploadFile = ({ onUploadSuccess }) => {
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"] },
    maxSize: 2 * 1024 * 1024, // 2MB
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        setError("Invalid file. Please upload a .xlsx file under 2MB.");
        return;
      }

      try {
        const response = await uploadFile(acceptedFiles[0]);
        onUploadSuccess(response);
      } catch (err) {
        setError("Failed to upload file.");
      }
    },
  });

  return (
    <div className="p-6 text-center">
      <div
        {...getRootProps()}
        className="cursor-pointer border-2 border-dashed border-gray-400 p-6"
      >
        <input {...getInputProps()} />
        <p>Drag & drop an Excel file here, or click to select one.</p>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default UploadFile;

