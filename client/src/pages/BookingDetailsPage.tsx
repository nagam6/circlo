import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Booking = {
  _id: string;
  startAt: string;
  endAt: string;
  status: string;
  subtotal: number;
  serviceFee: number;
  deposit: number;
  total: number;

  itemId: {
    _id: string;
    title: string;
    description?: string;
    images?: string[];
    location?: string;
    category?: string;
    pricePerDay?: number;
  };

  ownerId: {
    _id: string;
    name: string;
    email?: string;
    rating?: number;
  };
};

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const BookingDetailsPage = () => {
  const { id } = useParams();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("circlo_token");

        const response = await fetch(
          `${API_URL}/api/bookings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load booking."
          );
        }

        setBooking(data.booking);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load booking."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return <p>Loading booking...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!booking) {
    return <p>Booking not found.</p>;
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString();

  const bookingSteps = [
  "pending",
  "accepted",
  "ready_for_pickup",
  "active",
  "returned",
  "inspection",
  "completed",
];

const currentStepIndex = bookingSteps.indexOf(
  booking.status
);

  return (
    <main className="booking-details-page">
      <div className="booking-details-header">
        <div>
          <p>Booking details</p>
          <h1>{booking.itemId?.title}</h1>
        </div>

        <span className="booking-status">
          {booking.status.replaceAll("_", " ")}
        </span>
      </div>

      {booking.itemId?.images?.[0] && (
        <img
          className="booking-details-image"
          src={booking.itemId.images[0]}
          alt={booking.itemId.title}
        />
      )}

      <section className="booking-details-card">
        <h2>Rental</h2>

        <p>
          <strong>From:</strong>{" "}
          {formatDate(booking.startAt)}
        </p>

        <p>
          <strong>To:</strong>{" "}
          {formatDate(booking.endAt)}
        </p>

        <p>
          <strong>Owner:</strong>{" "}
          {booking.ownerId?.name}
        </p>

        {booking.itemId?.location && (
          <p>
            <strong>Location:</strong>{" "}
            {booking.itemId.location}
          </p>
        )}
      </section>

        <section className="booking-timeline-card">
  <h2>Rental progress</h2>

  <div className="booking-timeline">
    {bookingSteps.map((step, index) => {
      const isCompleted =
        currentStepIndex >= index;

      const isCurrent =
        booking.status === step;

      return (
        <div
          className="timeline-step"
          key={step}
        >
          <div
            className={`timeline-dot ${
              isCompleted ? "completed" : ""
            } ${isCurrent ? "current" : ""}`}
          />

          {index < bookingSteps.length - 1 && (
            <div
              className={`timeline-line ${
                currentStepIndex > index
                  ? "completed"
                  : ""
              }`}
            />
          )}

          <span
            className={
              isCurrent
                ? "timeline-label current"
                : "timeline-label"
            }
          >
            {step.replaceAll("_", " ")}
          </span>
        </div>
      );
    })}
  </div>
</section>

      <section className="booking-details-card">
        <h2>Price summary</h2>

        <div>
          <span>Subtotal</span>
          <strong>₪{booking.subtotal}</strong>
        </div>

        <div>
          <span>Service fee</span>
          <strong>₪{booking.serviceFee}</strong>
        </div>

        <div>
          <span>Deposit</span>
          <strong>₪{booking.deposit}</strong>
        </div>

        <div className="booking-total">
          <span>Total</span>
          <strong>₪{booking.total}</strong>
        </div>
      </section>

    </main>
  );
};

export default BookingDetailsPage;