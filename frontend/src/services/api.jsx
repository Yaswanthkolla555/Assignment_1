import axios from "axios";

// API endpoint to handle the file upload
const API_URL = "http://localhost:5000/api/upload";

// Function to handle the file upload
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // Appending the file to FormData

  try {
    // Sending a POST request to the server
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Return the response data from the server
  } catch (error) {
    console.error("File upload error:", error);
    throw new Error("Failed to upload the file");
  }
};

