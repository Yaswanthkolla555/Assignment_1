import axios from "axios";

const API_URL = "http://localhost:5000/api/upload";


export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file); 

  try {
   
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("File upload error:", error);
    throw new Error("Failed to upload the file");
  }
};

