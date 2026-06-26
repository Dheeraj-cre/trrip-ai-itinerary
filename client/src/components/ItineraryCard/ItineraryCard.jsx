import { Link } from "react-router-dom";
import "./ItineraryCard.css";

export default function ItineraryCard({ itinerary, onDelete }) {
  return (
    <div className="trip-card">

      <h3>
        {itinerary.aiResponse.destination || "Unknown Destination"}
      </h3>

      <p>
        {new Date(itinerary.createdAt).toLocaleDateString()}
      </p>

      <div className="actions">

        <Link to={`/itinerary/${itinerary._id}`}>
          View
        </Link>

        <button
          onClick={() => onDelete(itinerary._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}