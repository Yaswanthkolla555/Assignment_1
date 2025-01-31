import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import path from 'path';

const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');  // Ensure we are using the correct root directory
    cb(null, uploadDir);  // Path to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique filename
  },
});

const upload = multer({ storage });

// Route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Process the uploaded Excel file
  try {
    const filePath = path.join(process.cwd(), 'uploads', req.file.filename); // Use correct path from cwd
    const workbook = xlsx.readFile(filePath);

    // Get sheet names and parse the first sheet
    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]]; // Taking the first sheet for demo purposes
    const data = xlsx.utils.sheet_to_json(sheet);

    // Send back a preview of the data (you can modify this to send specific data based on your needs)
    res.json({
      message: 'File uploaded successfully',
      preview: data, // Parsed data from the first sheet
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the file.');
  }
});

export default router;
