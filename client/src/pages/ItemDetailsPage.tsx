import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
          `http://localhost:5000/api/items/${id}`
        );

        if (!response.ok) {
          throw new Error("Item not found");
        }

        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load item"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  if (loading) {
    return <div className="item-details-state">Loading item...</div>;
  }

  if (error || !item) {
    return (
      <div className="item-details-state">
        <h2>Item not found</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="item-details-page">
      <div className="item-details-image">
        {item.images.length > 0 ? (
          <img src={item.images[0]} alt={item.title} />
        ) : (
          <div className="item-image-placeholder">No image available</div>
        )}
      </div>

      <div className="item-details-content">
        <div className="item-details-meta">
          <span>{item.category}</span>
          <span>★ {item.rating}</span>
        </div>

        <h1>{item.title}</h1>

        <p className="item-details-location">
          📍 {item.location}
        </p>

        <p className="item-details-description">
          {item.description}
        </p>

        <div className="item-details-price">
          <strong>₪{item.pricePerDay}</strong>
          <span> / day</span>
        </div>

        <div
          className={
            item.available
              ? "availability available"
              : "availability unavailable"
          }
        >
          {item.available ? "Available" : "Currently unavailable"}
        </div>

        <button className="request-rental-button">
          Request Rental
        </button>
      </div>
    </section>
  );
};

export default ItemDetailsPage;