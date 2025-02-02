// ErrorModal.jsx

import React from 'react';

const ErrorModal = ({ skippedRows, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Skipped Rows</h2>
        <ul>
          {skippedRows.map((row, index) => (
            <li key={index}>
              <div>
                <strong>Name:</strong> {row.Name || 'N/A'}
              </div>
              <div>
                <strong>Amount:</strong> {row.Amount || 'N/A'}
              </div>
              <div>
                <strong>Date:</strong> {row.Date ? new Date(row.Date).toLocaleDateString("en-GB") : 'N/A'}
              </div>
              <div>
                <strong>Verified:</strong> {row.Verified ? '✅ Yes' : '❌ No'}
              </div>
              <hr />
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;
