import * as multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/"); // Menyimpan file di direktori './src/uploads'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Menetapkan nama file
  },
});

const UploadFileMiddleware = multer({ storage: storage });

export default UploadFileMiddleware;