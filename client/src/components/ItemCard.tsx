import { Link } from "react-router-dom";

type ItemCardProps = {
  itemId?: string;
  image: string;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
};

const ItemCard = ({
  itemId,
  image,
  title,
  category,
  location,
  price,
  rating,
}: ItemCardProps) => {
  const cardContent = (
    <>
      <div className="item-card-top">
        <span className="item-category">{category}</span>
        <span className="item-rating">★ {rating}</span>
      </div>

      <h3>{title}</h3>

      <p className="item-location">📍 {location}</p>

      <div className="item-price">
        <strong>₪{price}</strong>
        <span> / day</span>
      </div>
    </>
  );

  return (
    <article className="item-card">
      <div className="item-card-image-wrapper">
        {itemId ? (
          <Link to={`/items/${itemId}`}>
            <img src={image} alt={title} className="item-card-image" />
          </Link>
        ) : (
          <img src={image} alt={title} className="item-card-image" />
        )}

        <button
          className="favorite-button"
          aria-label={`Save ${title}`}
          type="button"
        >
          ♡
        </button>
      </div>

      {itemId ? (
        <Link
          to={`/items/${itemId}`}
          className="item-card-content item-card-link"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="item-card-content">
          {cardContent}
        </div>
      )}
    </article>
  );
};

export default ItemCard;