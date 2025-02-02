import React, { useState } from 'react';

const ErrorModal = ({ skippedRows, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 2;

  const displayedRows = skippedRows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);
  const totalPages = Math.ceil(skippedRows.length / rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="modal-content bg-white p-6 rounded-lg shadow-xl mx-auto max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Skipped Rows</h2>
      
      <div className="overflow-y-auto max-h-60 mb-4"> 
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-4 py-2 text-sm sm:text-base">Name</th>
              <th className="border px-4 py-2 text-sm sm:text-base">Amount</th>
              <th className="border px-4 py-2 text-sm sm:text-base">Date</th>
              <th className="border px-4 py-2 text-sm sm:text-base">Verified</th>
              <th className="border px-4 py-2 text-sm sm:text-base">Error Cause</th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.length > 0 ? (
              displayedRows.map((errorItem, index) => {
               
                return (
                  <tr key={index} className="border hover:bg-gray-100">
                    <td className="border px-4 py-2 text-sm sm:text-base">{errorItem.row.Name || 'N/A'}</td>
                    <td className="border px-4 py-2 text-sm sm:text-base">{errorItem.row.Amount || 'N/A'}</td>
                    <td className="border px-4 py-2 text-sm sm:text-base">{errorItem.row.Date ? new Date(errorItem.row.Date).toLocaleDateString("en-GB") : 'N/A'}</td>
                    <td className="border px-4 py-2 text-sm sm:text-base">{errorItem.row.Verified ? '✅ Yes' : '❌ No'}</td>
                    <td className="border px-4 py-2 text-sm sm:text-base">{errorItem.errors.errors || "Unknown"}</td> 
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-2 text-sm sm:text-base">No skipped rows</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

 
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 space-x-2 sm:space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm sm:text-base"
          >
            Previous
          </button>
          <span className="text-sm sm:text-base">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm sm:text-base"
          >
            Next
          </button>
        </div>
      )}
      

      <div className="mt-4 flex justify-center">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 text-sm sm:text-base"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
