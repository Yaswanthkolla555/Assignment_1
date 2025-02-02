import express from 'express';
import { importData, getSkippedRows } from '../controllers/dataImportController.js';

const router = express.Router();

// Route for importing data
router.post('/import-data', async (req, res) => {
  try {
    console.log("Received POST request with data:", req.body); // Debugging
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: "Invalid input format. Expected an array." });
    }

    const result = await importData(req.body);
    res.status(200).json({
      success: true,
      validRows: result.validRows,
      skippedRows: result.skippedRows,  // Include skippedRows in the response
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to fetch skipped rows separately
router.get('/skipped-rows', getSkippedRows);

export default router;
