import { useEffect, useState } from "react";

import {
  getAllItineraries,
  deleteItinerary,
} from "../../services/itineraryService";

import ItineraryCard from "../../components/ItineraryCard/ItineraryCard";

import { toast } from "react-toastify";

export default function History() {

  const [trips, setTrips] = useState([]);

  const loadTrips = async () => {

    try {

      const res = await getAllItineraries();

      setTrips(res.data.itineraries);

    } catch {

      toast.error("Unable to load itineraries");

    }

  };

  useEffect(() => {

    loadTrips();

  }, []);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete itinerary?")) return;

    await deleteItinerary(id);

    toast.success("Deleted");

    loadTrips();

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>My Trips</h1>

      {trips.length === 0 ? (

        <p>No itineraries found.</p>

      ) : (

        trips.map((trip) => (

          <ItineraryCard
            key={trip._id}
            itinerary={trip}
            onDelete={handleDelete}
          />

        ))

      )}

    </div>

  );

}