import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getAllItineraries,
  getItineraryById,
  deleteItinerary,
} from "../controllers/itineraryController.js";

const router = express.Router();

router.get("/", protect, getAllItineraries);
router.get("/:id", protect, getItineraryById);
router.delete("/:id", protect, deleteItinerary);

export default router;