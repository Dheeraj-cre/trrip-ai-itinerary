import asyncHandler from "../middleware/asyncHandler.js";
import Itinerary from "../models/Itinerary.js";

export const dashboardStats = asyncHandler(async (req, res) => {

  const trips = await Itinerary.find({
    user: req.user._id
  }).sort({ createdAt: -1 });

  res.json({
    success: true,
    totalTrips: trips.length,
    recentTrips: trips.slice(0, 5)
  });

});