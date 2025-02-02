import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import path from 'path';

const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads'); 
    cb(null, uploadDir);  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  
  },
});

const upload = multer({ storage });

// Route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const filePath = path.join(process.cwd(), 'uploads', req.file.filename); 
    const workbook = xlsx.readFile(filePath);

    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]]; 
    const data = xlsx.utils.sheet_to_json(sheet);

    
    res.json({
      message: 'File uploaded successfully',
      preview: data, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the file.');
  }
});

export default router;
