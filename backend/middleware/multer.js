import multer from "multer";

const storage = multer.memoryStorage(); // store file in RAM as buffer

const uploadFile = multer({ storage }).single("file"); // expecting 1 file with field name "file"

export default uploadFile;
