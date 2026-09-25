import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Item = {
  _id: string;
  title: string;
  images?: string[];
  location?: string;
  category?: string;
  pricePerDay?: number;
};

type Owner = {
  _id: string;
  name: string;
  email?: string;
  rating?: number;
};

type Booking = {
  _id: string;
  itemId: Item;
  ownerId: Owner;
  startAt: string;
  endAt: string;
  status: string;
  subtotal: number;
  serviceFee: number;
  deposit: number;
  total: number;
  createdAt: string;
};

type RentalsResponse = {
  current: Booking[];
  past: Booking[];
  total: number;
};

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyRentalsPage = () => {
  const [currentRentals, setCurrentRentals] = useState<Booking[]>([]);
  const [pastRentals, setPastRentals] = useState<Booking[]>([]);

  const [activeTab, setActiveTab] = useState<"current" | "past">(
    "current"
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("circlo_token");

        if (!token) {
          throw new Error(
            "Please log in to view your rentals."
          );
        }

        const response = await fetch(
          `${API_URL}/api/bookings/my-rentals`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data: RentalsResponse & {
          message?: string;
        } = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load rentals."
          );
        }

        setCurrentRentals(data.current || []);
        setPastRentals(data.past || []);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load rentals."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  const rentals =
    activeTab === "current"
      ? currentRentals
      : pastRentals;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <section className="rentals-state">
        <div className="loading-spinner" />
        <p>Loading your rentals...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rentals-state">
        <h2>Couldn't load your rentals</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="my-rentals-page">
      <div className="my-rentals-header">
        <div>
          <p className="rentals-eyebrow">
            Your rentals
          </p>

          <h1>My Rentals</h1>

          <p>
            Keep track of your current and previous
            rental requests.
          </p>
        </div>
      </div>

      <div className="rentals-tabs">
        <button
          type="button"
          className={
            activeTab === "current"
              ? "rentals-tab active"
              : "rentals-tab"
          }
          onClick={() => setActiveTab("current")}
        >
          Current ({currentRentals.length})
        </button>

        <button
          type="button"
          className={
            activeTab === "past"
              ? "rentals-tab active"
              : "rentals-tab"
          }
          onClick={() => setActiveTab("past")}
        >
          Past ({pastRentals.length})
        </button>
      </div>

      {rentals.length === 0 ? (
        <div className="rentals-empty">
          <h2>
            {activeTab === "current"
              ? "No active rentals yet"
              : "No past rentals yet"}
          </h2>

          <p>
            {activeTab === "current"
              ? "Your rental requests will appear here."
              : "Completed and cancelled rentals will appear here."}
          </p>
        </div>
      ) : (
        <div className="rentals-list">
          {rentals.map((booking) => (
            <Link to={`/bookings/${booking._id}`}
  className="rental-card-link"
>
            <article
              className="rental-card"
              key={booking._id}
            >
              <div className="rental-card-image">
                {booking.itemId?.images?.[0] ? (
                  <img
                    src={booking.itemId.images[0]}
                    alt={booking.itemId.title}
                  />
                ) : (
                  <div className="rental-image-placeholder">
                    No image
                  </div>
                )}
              </div>

              <div className="rental-card-content">
                <div className="rental-card-top">
                  <div>
                    <p className="rental-category">
                      {booking.itemId?.category}
                    </p>

                    <h2>
                      {booking.itemId?.title ||
                        "Equipment"}
                    </h2>
                  </div>

                  <span
                    className={`rental-status status-${booking.status}`}
                  >
                    {booking.status.replaceAll(
                      "_",
                      " "
                    )}
                  </span>
                </div>

                <div className="rental-card-details">
                  <div>
                    <span>Rental period</span>
                    <strong>
                      {formatDate(booking.startAt)}
                      {" → "}
                      {formatDate(booking.endAt)}
                    </strong>
                  </div>

                  <div>
                    <span>Owner</span>
                    <strong>
                      {booking.ownerId?.name ||
                        "Owner"}
                    </strong>
                  </div>

                  <div>
                    <span>Amount</span>
                    <strong>
                      ₪{booking.total}
                    </strong>
                  </div>
                </div>
              </div>
            </article>
</Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyRentalsPage;