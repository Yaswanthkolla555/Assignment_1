import mongoose from 'mongoose';
import moment from 'moment';
import MyModel from '../models/ImportedData.js';

// To store skipped rows globally
let skippedRows = []; 

// Function to validate data
const validateRow = (row, rowIndex, sheetName) => {
  const errors = [];

  if (!row || typeof row !== "object") {
    return [{ sheet: sheetName, row: rowIndex, error: "Invalid row format." }];
  }

  if (!row.Name || typeof row.Name !== "string" || row.Name.trim() === "") {
    errors.push("Name is required.");
  }

  if (!row.Amount || isNaN(row.Amount) || row.Amount <= 0) {
    errors.push("Amount must be a positive number.");
  }

  // Check if Date is an Excel serial number and convert it to a valid date
  let date = row.Date;
  if (typeof date === "number" && !isNaN(date)) {
    // If it's a number, convert it to a date
    date = moment().startOf('year').add(date - 2, 'days').format("DD-MM-YYYY");
  }

  // Validate date format as DD-MM-YYYY
  if (!date || !moment(date, "DD-MM-YYYY", true).isValid()) {
    errors.push("Date must be in valid format (DD-MM-YYYY).");
  }

  if (row.Verified && !["Yes", "No"].includes(row.Verified)) {
    errors.push("Verified must be 'Yes' or 'No'.");
  }

  return errors.length ? { sheet: sheetName, row: rowIndex, errors } : null;
};

// Function to import data
const importData = async (data) => {
  console.log("Received data:", data); // Debug log

  if (!Array.isArray(data)) {
    console.error("Error: Expected an array but got", typeof data);
    return { success: false, message: "Invalid data format. Expected an array." };
  }

  const validRows = [];
  skippedRows = []; // Clear skippedRows at the start of each import

  for (const row of data) {
    const errors = validateRow(row);
    if (!errors) {
      try {
        const newRow = new MyModel(row);
        await newRow.save();
        validRows.push(row);
      } catch (error) {
        console.error('Error saving row:', row, error);
        skippedRows.push({ row, error: error.message });
      }
    } else {
      skippedRows.push({ row, errors });
    }
  }

  return { success: true, validRows, skippedRows };
};

// Function to get skipped rows
const getSkippedRows = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      skippedRows: skippedRows,
    });
  } catch (error) {
    console.error("Server error while fetching skipped rows:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getSkippedRows, importData };
