// Import necessary modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js"; 
import fileUploadRoutes from "./src/routes/fileUploadRoutes.js"; 
import importRoute from "./src/routes/dataImportRoutes.js"

dotenv.config();


connectDB();


const app = express();


app.use(cors()); 
app.use(express.json()); 

app.use("/api", fileUploadRoutes);
app.use('/api', importRoute);
// in this route we have 2 other connections one to post data and other to get data

// Error handling middleware for unexpected errors
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({
    message: "An unexpected error occurred. Please try again later.",
    error: err.message,
  });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
