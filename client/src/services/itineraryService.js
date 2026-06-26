import api from "./api";

export const getAllItineraries = () => {
  return api.get("/itinerary");
};

export const getItinerary = (id) =>
    api.get(`/itinerary/${id}`);

export const deleteItinerary = (id) => {
  return api.delete(`/itinerary/${id}`);
};