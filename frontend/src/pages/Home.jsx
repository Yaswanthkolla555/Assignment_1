import React, { useState, useEffect } from "react";
import UploadFile from "../components/UploadFile";
import ErrorModal from "../components/ErrorModal";
import DataTable from "../components/DataTable";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]); // To store the valid data
  const [errors, setErrors] = useState([]); // To store the errors (if any)
  const [skippedRows, setSkippedRows] = useState([]); // To store the skipped rows

  // Fetch skipped rows on component mount
  useEffect(() => {
    
    const fetchSkippedRows = async () => {
      try {
        const response = await axios.get('/api/skipped-rows'); // Adjust to your actual endpoint
        if (response.data.success && Array.isArray(response.data.skippedRows)) {
          setSkippedRows(response.data.skippedRows); // Store skipped rows
        }
      } catch (error) {
        console.error('Error fetching skipped rows:', error);
      }
    };
    console.log(skippedRows,"Hello");
    
    fetchSkippedRows(); // Call function on mount
  }, []);

  // Handle file upload success
  const handleUploadSuccess = (response) => {
    console.log(response.preview);

    // Check if there are errors in the response, otherwise set valid data
    if (response.errors) {
      setErrors(response.errors); // Set errors if any
    } else {
      setData(response.preview); // Set the valid data
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Excel Data Importer</h1>

      {/* Upload component */}
      <UploadFile onUploadSuccess={handleUploadSuccess} />

      {/* Display ErrorModal if skippedRows exist
      {skippedRows.length > 0 && (
        <ErrorModal skippedRows={skippedRows} onClose={() => setSkippedRows([])} />
      )} */}

      {/* Display DataTable if data is available */}
      {data.length > 0 && <DataTable data={data} />}
    </div>
  );
};

export default Home;
