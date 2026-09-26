import { useEffect, useState } from "react";

type PendingRequest = {
  _id: string;
  startAt: string;
  endAt: string;
  total: number;
  status: string;
  itemId: {
    _id: string;
    title: string;
    images?: string[];
  };
  renterId: {
    _id: string;
    name: string;
    email?: string;
    rating?: number;
  };
};

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const OwnerDashboardPage = () => {
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [activeRentals, setActiveRentals] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOwnerRequests = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("circlo_token");

        if (!token) {
          throw new Error(
            "Please log in to view your owner dashboard."
          );
        }

        const response = await fetch(
          `${API_URL}/api/bookings/owner/requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load rental requests."
          );
        }

        setPendingRequests(data.pending || []);
        setActiveRentals(data.active || []);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load rental requests."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerRequests();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString();

  return (
    <main className="owner-dashboard-page">
      <div className="owner-dashboard-header">
        <div>
          <p className="dashboard-eyebrow">
            Owner dashboard
          </p>

          <h1>Manage your rentals</h1>

          <p>
            Track listings, requests, and active rentals
            from one place.
          </p>
        </div>
      </div>

      <section className="dashboard-stats">
        <article className="dashboard-stat-card">
          <span>Listings</span>
          <strong>0</strong>
        </article>

        <article className="dashboard-stat-card">
          <span>Pending requests</span>
          <strong>{pendingRequests.length}</strong>
        </article>

        <article className="dashboard-stat-card">
          <span>Active rentals</span>
          <strong>{activeRentals.length}</strong>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>Pending requests</h2>
        </div>

        {loading ? (
          <p>Loading requests...</p>
        ) : error ? (
          <p className="availability-error">
            {error}
          </p>
        ) : pendingRequests.length === 0 ? (
          <div className="dashboard-empty-state">
            <p>No pending requests yet.</p>
          </div>
        ) : (
          <div className="pending-requests-list">
            {pendingRequests.map((request) => (
              <article
                className="pending-request-card"
                key={request._id}
              >
                <div>
                  <p className="pending-request-item">
                    {request.itemId?.title || "Equipment"}
                  </p>

                  <h3>
                    {request.renterId?.name || "Renter"}
                  </h3>
                </div>

                <div className="pending-request-details">
                  <span>
                    {formatDate(request.startAt)}
                    {" → "}
                    {formatDate(request.endAt)}
                  </span>

                  <strong>
                    ₪{request.total}
                  </strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default OwnerDashboardPage;