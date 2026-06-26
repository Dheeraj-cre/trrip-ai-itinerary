import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFile: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    travelData: {
      type: Object,
      default: {},
    },

    aiResponse: {
      type: Object,
      required: true,
    },

    shareId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Itinerary", itinerarySchema);