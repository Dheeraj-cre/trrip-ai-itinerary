import asyncHandler from "../middleware/asyncHandler.js";
import Itinerary from "../models/Itinerary.js";

// GET /api/itinerary
export const getAllItineraries = asyncHandler(async (req, res) => {
  const itineraries = await Itinerary.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    itineraries,
  });
});

// GET /api/itinerary/:id
export const getItineraryById = asyncHandler(async (req, res) => {
  const itinerary = await Itinerary.findById(req.params.id);

  if (!itinerary) {
    res.status(404);
    throw new Error("Itinerary not found");
  }

  if (itinerary.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Access denied");
  }

  res.status(200).json({
    success: true,
    itinerary,
  });
});

// DELETE /api/itinerary/:id
export const deleteItinerary = asyncHandler(async (req, res) => {
  const itinerary = await Itinerary.findById(req.params.id);

  if (!itinerary) {
    res.status(404);
    throw new Error("Itinerary not found");
  }

  if (itinerary.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Access denied");
  }

  await itinerary.deleteOne();

  res.json({
    success: true,
    message: "Itinerary deleted successfully",
  });
});
