import express from 'express';
import importData from '../controllers/dataImportController.js';

const router = express.Router();

router.post('/import-data', async (req, res) => {
  try {
    console.log("Received POST request with data:", req.body); // Debugging
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: "Invalid input format. Expected an array." });
    }

    const result = await importData(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
