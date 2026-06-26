const extractTravelData = (text) => {

    return {

        passengerName:
            text.match(/Passenger[: ](.+)/i)?.[1] || "",

        airline:
            text.match(/Airline[: ](.+)/i)?.[1] || "",

        flightNumber:
            text.match(/Flight[: ](.+)/i)?.[1] || "",

        pnr:
            text.match(/PNR[: ](.+)/i)?.[1] || "",

        from:
            text.match(/From[: ](.+)/i)?.[1] || "",

        to:
            text.match(/To[: ](.+)/i)?.[1] || "",

        departureDate:
            text.match(/Departure[: ](.+)/i)?.[1] || "",

        hotel:
            text.match(/Hotel[: ](.+)/i)?.[1] || "",

    };

};

export default extractTravelData;