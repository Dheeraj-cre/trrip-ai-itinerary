import asyncHandler from "../middleware/asyncHandler.js";
import extractPdfText from "../services/pdfService.js";
import extractImageText from "../services/ocrService.js";
import extractTravelData from "../services/extractTravelData.js";
import generateItinerary from "../services/aiService.js";
import parseGeminiResponse from "../utils/parseGeminiResponse.js";
import Itinerary from "../models/Itinerary.js";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  let text = "";

  if (req.file.mimetype === "application/pdf") {
    text = await extractPdfText(req.file.path);
  } else {
    text = await extractImageText(req.file.path);
  }

  // Extract travel data
  const travelData = extractTravelData(text);

  // Generate AI itinerary
  const aiText = await generateItinerary(text);

  // Clean Gemini response
  const cleanedResponse = parseGeminiResponse(aiText);

  let itinerary;

  try {
    itinerary = JSON.parse(cleanedResponse);
  } catch (error) {
    res.status(500);
    throw new Error("Gemini returned invalid JSON");
  }

  // Save in MongoDB
  const savedItinerary = await Itinerary.create({
    user: req.user._id,
    originalFile: req.file.filename,
    extractedText: text,
    travelData,
    aiResponse: itinerary,
    shareId: uuidv4(),
  });

  res.status(201).json({
    success: true,
    message: "Itinerary generated successfully",
    itinerary: savedItinerary,
  });
});