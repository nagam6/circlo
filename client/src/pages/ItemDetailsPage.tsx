import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AvailabilityPicker from "../components/AvailabilityPicker";

type Item = {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  pricePerDay: number;
  images: string[];
  rating: number;
  available: boolean;
};

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const ItemDetailsPage = () => {
  const { id } = useParams();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/items/${id}`
        );

        if (response.status === 404) {
          throw new Error(
            "This equipment item could not be found."
          );
        }

        if (!response.ok) {
          throw new Error(
            "Something went wrong while loading this item."
          );
        }

        const data: Item = await response.json();

        setItem(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load item."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    } else {
      setError("Invalid item.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <section className="item-details-state">
        <div className="state-card">
          <div className="loading-spinner" />

          <h2>Loading equipment...</h2>

          <p>
            Please wait while we get the latest item information.
          </p>
        </div>
      </section>
    );
  }

  if (error || !item) {
    return (
      <section className="item-details-state">
        <div className="state-card">
          <div className="state-icon">📷</div>

          <h2>Item not found</h2>

          <p>
            {error ||
              "The equipment you are looking for is unavailable."}
          </p>

          <Link
            to="/explore"
            className="state-back-button"
          >
            Back to Explore
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="item-details-wrapper">
      <Link
        to="/explore"
        className="back-to-explore"
      >
        ← Back to Explore
      </Link>

      <div className="item-details-page">
        <div className="item-details-image">
          {item.images?.length > 0 ? (
            <img
              src={item.images[0]}
              alt={item.title}
            />
          ) : (
            <div className="item-image-placeholder">
              No image available
            </div>
          )}
        </div>

        <div className="item-details-content">
          <div className="item-details-meta">
            <span>{item.category}</span>

            <span>
              ★ {item.rating || "New"}
            </span>
          </div>

          <h1>{item.title}</h1>

          <p className="item-details-location">
            📍 {item.location}
          </p>

          <p className="item-details-description">
            {item.description}
          </p>

          <div className="item-details-price">
            <strong>
              ₪{item.pricePerDay}
            </strong>

            <span> / day</span>
          </div>

          <div
            className={
              item.available
                ? "availability available"
                : "availability unavailable"
            }
          >
            {item.available
              ? "Available for rent"
              : "Currently unavailable"}
          </div>

          <AvailabilityPicker
            itemId={item._id}
          />

          <button
            className="request-rental-button"
            disabled={!item.available}
          >
            {item.available
              ? "Request Rental"
              : "Unavailable"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ItemDetailsPage;