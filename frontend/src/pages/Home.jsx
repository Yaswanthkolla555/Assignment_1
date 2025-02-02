import React, { useState, useEffect } from "react";
import UploadFile from "../components/UploadFile";
// import ErrorModal from "../components/ErrorModal";
import DataTable from "../components/DataTable";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]); 
  const [errors, setErrors] = useState([]); 
  const [skippedRows, setSkippedRows] = useState([]); 

  useEffect(() => {
    
    const fetchSkippedRows = async () => {
      try {
        const response = await axios.get('/api/skipped-rows'); 
        if (response.data.success && Array.isArray(response.data.skippedRows)) {
          setSkippedRows(response.data.skippedRows); 
        }
      } catch (error) {
        console.error('Error fetching skipped rows:', error);
      }
    };
    console.log(skippedRows,"Hello");
    
    fetchSkippedRows(); 
  }, []);

  const handleUploadSuccess = (response) => {
    console.log(response.preview);

    if (response.errors) {
      setErrors(response.errors); 
    } else {
      setData(response.preview); 
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Excel Data Importer</h1>

      <UploadFile onUploadSuccess={handleUploadSuccess} />



     
      {data.length > 0 && <DataTable data={data} />}
    </div>
  );
};

export default Home;
