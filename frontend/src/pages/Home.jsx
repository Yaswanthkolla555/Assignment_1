import React, { useState } from "react";
import UploadFile from "../components/UploadFile";
import ErrorModal from "../components/ErrorModal";
import DataTable from "../components/DataTable";

const Home = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

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
      {errors.length > 0 && <ErrorModal errors={errors} onClose={() => setErrors([])} />}
      {data.length > 0 && <DataTable data={data} />}
    </div>
  );
};

export default Home;
