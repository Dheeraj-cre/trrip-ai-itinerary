import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItinerary } from "../../services/itineraryService";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Itinerary.css";

export default function Itinerary() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pdfRef = useRef();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrip();
  }, []);

  const loadTrip = async () => {
    try {
      const res = await getItinerary(id);
      setTrip(res.data.itinerary);
    } catch (error) {
      toast.error("Unable to load itinerary");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const element = pdfRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();

    const imgWidth = pageWidth;

    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      imgWidth,
      imgHeight
    );

    pdf.save("Travel-Itinerary.pdf");
  };

  const handleShare = async () => {
    const shareLink =
      `${window.location.origin}/share/${trip.shareId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Travel Itinerary",
          text: "Check out my AI generated itinerary",
          url: shareLink,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      await navigator.clipboard.writeText(shareLink);
      toast.success("Share link copied");
    }
  };

  if (loading) {
    return <h2>Loading itinerary...</h2>;
  }

  if (!trip) {
    return <h2>No itinerary found.</h2>;
  }

  const data = trip.aiResponse;

  return (
    <div className="itinerary" ref={pdfRef}>
      <h1>✈ {data.destination}</h1>

      <section>
        <h2>Travel Summary</h2>
        <p>{data.travelSummary}</p>
      </section>

      <section>
        <h2>Flight Details</h2>

        <p>
          <strong>Airline:</strong> {data.flight?.airline}
        </p>

        <p>
          <strong>Flight:</strong> {data.flight?.flightNumber}
        </p>

        <p>
          {data.flight?.departure} → {data.flight?.arrival}
        </p>
      </section>

      <section>
        <h2>Hotel Details</h2>

        <p>{data.hotel?.name}</p>

        <p>
          Check In : {data.hotel?.checkIn}
        </p>

        <p>
          Check Out : {data.hotel?.checkOut}
        </p>
      </section>

      <section>
        <h2>Daily Plan</h2>

        {data.dailyPlan?.map((day) => (
          <div key={day.day}>
            <h3>Day {day.day}</h3>

            <ul>
              {day.activities?.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Packing List</h2>

        <ul>
          {data.packingList?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Weather Tips</h2>

        <ul>
          {data.weatherTips?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Estimated Budget</h2>

        <p>{data.estimatedBudget}</p>
      </section>

      <section>
        <h2>Travel Tips</h2>

        <ul>
          {data.travelTips?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="button-group">
        <button className="primary-btn" onClick={downloadPDF}>
          Download PDF
        </button>

        <button className="primary-btn" onClick={handleShare}>
          Share
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

