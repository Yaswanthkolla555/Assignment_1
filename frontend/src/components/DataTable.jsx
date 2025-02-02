import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorModal from "../components/ErrorModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const DataTable = ({ data = [], sheetNames = [], onSheetChange }) => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState([]);
  const [skippedRows, setSkippedRows] = useState([]); // For skipped rows
  const rowsPerPage = 5;

  useEffect(() => {
    if (Array.isArray(data)) {
      setTableData(data);
    }
  }, [data]);

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString("en-GB") : "Invalid Date";
  };

  const formatNumber = (num) => {
    return num ? Number(num).toLocaleString("en-IN", { minimumFractionDigits: 2 }) : "N/A";
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      setTableData((prev) => {
        const updatedData = prev.filter((_, i) => i !== index);
        if (updatedData.length === prev.length - 1) {
          toast.success("Row deleted successfully!"); // Success Toast for delete
        }
        return updatedData;
      });
    }
  };

  const handleImport = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/import-data", tableData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Import Success:", response.data);
      setErrors([]); // Reset errors

      // Set skipped rows after successful import
      if (response.data.skippedRows) {
        setSkippedRows(response.data.skippedRows);
      }

      // Show success message using Toastify
      toast.success("Data successfully imported into the database!");
    } catch (error) {
      console.error("Import Error:", error);
      setErrors([...(error.response?.data?.errors || ["An unknown error occurred"])]); // Show errors if any

      // Show error message using Toastify
      toast.error("Import failed. Please try again!");
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg overflow-x-auto">
      {sheetNames.length > 0 && (
        <div className="mb-4 flex items-center">
          <label className="font-semibold mr-2">Select Sheet:</label>
          <select
            onChange={(e) => onSheetChange(e.target.value)}
            className="p-2 border rounded"
          >
            {sheetNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleImport}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
      >
        📥 Import Data
      </button>

      <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            {["Name", "Amount", "Date", "Verified", "Actions"].map((col) => (
              <th key={col} className="border p-3 text-left">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((row, index) => (
              <tr key={index} className="border hover:bg-gray-100">
                <td className="p-3">{row.Name || "N/A"}</td>
                <td className="p-3">{formatNumber(row.Amount)}</td>
                <td className="p-3">{formatDate(row.Date)}</td>
                <td className="p-3">{row.Verified ? "✅ Yes" : "❌ No"}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-3 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border rounded disabled:opacity-50 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          ⬅ Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => (indexOfLastRow < tableData.length ? prev + 1 : prev))}
          disabled={indexOfLastRow >= tableData.length}
          className="p-2 border rounded disabled:opacity-50 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          Next ➡
        </button>
      </div>

      {errors.length > 0 && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="font-semibold">Import Errors</h2>
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display ErrorModal if skippedRows exist */}
      {skippedRows.length > 0 && (
        <ErrorModal skippedRows={skippedRows} onClose={() => setSkippedRows([])} />
      )}

      {/* ToastContainer to show toast messages */}
      <ToastContainer />
    </div>
  );
};

export default DataTable;
