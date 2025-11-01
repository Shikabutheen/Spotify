import DataURIParser from "datauri/parser.js";
import path from "path";

// Converts uploaded file into a Base64 URL (Data URI)
const getDataUrl = (file) => {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString(); // ex: .jpg , .png
  return parser.format(extName, file.buffer); // returns { content: 'data:image/png;base64,......' }
};

export default getDataUrl;
