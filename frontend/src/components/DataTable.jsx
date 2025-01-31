import React, { useState, useEffect } from "react";

const DataTable = ({ data = [] }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setTableData(data);
    }
  }, [data]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            {["Name", "Amount", "Date", "Verified"].map((col) => (
              <th key={col} className="border p-3 text-left">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, index) => (
              <tr key={index} className="border hover:bg-gray-100">
                <td className="p-3">{row.Name || "N/A"}</td>
                <td className="p-3">
                  {row.Amount ? row.Amount.toLocaleString("en-IN") : "N/A"}
                </td>
                <td className="p-3">
                  {row.Date ? new Date(row.Date).toLocaleDateString("en-GB") : "Invalid Date"}
                </td>
                <td className="p-3">{row.Verified ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-3 text-center text-gray-500">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
