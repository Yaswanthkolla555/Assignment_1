import React, { useState, useEffect } from "react";

const DataTable = ({ data = [], sheetNames = [], onSheetChange }) => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    if (Array.isArray(data)) {
      setTableData(data);
    }
  }, [data]);

  // Format date to DD-MM-YYYY
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString("en-GB") : "Invalid Date";
  };

  // Format number in Indian system
  const formatNumber = (num) => {
    return num ? Number(num).toLocaleString("en-IN", { minimumFractionDigits: 2 }) : "N/A";
  };

  // Handle row deletion
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      setTableData((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="overflow-x-auto">
      {/* Sheet Selection Dropdown */}
      {sheetNames.length > 0 && (
        <div className="mb-4">
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

      {/* Table */}
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200">
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
                <td className="p-3">{row.Verified ? "Yes" : "No"}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ❌
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => (indexOfLastRow < tableData.length ? prev + 1 : prev))}
          disabled={indexOfLastRow >= tableData.length}
          className="p-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
