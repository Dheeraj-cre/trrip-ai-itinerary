import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCard from "../../components/DashboardCard/DashboardCard";

import { getDashboard } from "../../services/dashboardService";

import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();
      setStats(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="cards">
          <DashboardCard
            title="Total Trips"
            value={stats?.totalTrips || 0}
          />

          <DashboardCard
            title="Recent Trips"
            value={stats?.recentTrips?.length || 0}
          />

          <DashboardCard
            title="Shared Trips"
            value={stats?.recentTrips?.filter(
              (trip) => trip.shareId
            ).length || 0}
          />
        </div>

        <div className="recent-section">
          <h2>Recent Itineraries</h2>

          {stats?.recentTrips?.length === 0 ? (
            <div className="empty-state">
              <h3>No Trips Yet</h3>

              <p>
                Upload your first travel booking to generate
                an AI itinerary.
              </p>

              <Link to="/upload" className="upload-btn">
                Upload Document
              </Link>
            </div>
          ) : (
            <div className="recent-list">
              {stats.recentTrips.map((trip) => (
                <div
                  key={trip._id}
                  className="trip-item"
                >
                  <div>
                    <h3>
                      {trip.aiResponse?.destination ||
                        "Unknown Destination"}
                    </h3>

                    <p>
                      {trip.aiResponse?.travelSummary}
                    </p>

                    <small>
                      {new Date(
                        trip.createdAt
                      ).toLocaleDateString()}
                    </small>
                  </div>

                  <Link
                    to={`/itinerary/${trip._id}`}
                    className="view-btn"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

