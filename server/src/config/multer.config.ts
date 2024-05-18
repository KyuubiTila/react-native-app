import * as multer from 'multer';
import * as path from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

// Define storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    // Define filename (here using current timestamp + original file extension)
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

// Define file filter function
const fileFilter = (req, file, cb) => {
  // Define allowed file types (here: jpeg, jpg, png, gif)
  const allowedTypes = /jpeg|jpg|png|gif/;
  // Check file MIME type and extension
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  if (mimetype && extname) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(
      new HttpException('Unsupported file type!', HttpStatus.BAD_REQUEST),
      false,
    );
  }
};

// Configure multer middleware
export const multerOptions: multer.Options = {
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB (optional)
  fileFilter: fileFilter,
};

export default multerOptions;
