import ai from "../config/gemini.js";

const generateItinerary = async (bookingText) => {
  const prompt = `
You are an expert travel planner.

Analyze the following travel booking.

Generate a professional travel itinerary.

Return ONLY valid JSON.

JSON Format:

{
  "destination":"",
  "travelSummary":"",
  "travelDates":{
    "start":"",
    "end":""
  },
  "flight":{
    "airline":"",
    "flightNumber":"",
    "departure":"",
    "arrival":""
  },
  "hotel":{
    "name":"",
    "checkIn":"",
    "checkOut":""
  },
  "dailyPlan":[
    {
      "day":1,
      "title":"",
      "activities":[]
    }
  ],
  "packingList":[],
  "weatherTips":[],
  "estimatedBudget":"",
  "travelTips":[]
}

Booking Details:

${bookingText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};

export default generateItinerary;