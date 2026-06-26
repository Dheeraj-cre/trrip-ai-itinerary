import Tesseract from "tesseract.js";

const extractImageText = async (filePath) => {

  const result = await Tesseract.recognize(
    filePath,
    "eng"
  );

  return result.data.text;

};

export default extractImageText;