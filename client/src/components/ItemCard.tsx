type ItemCardProps = {
  image: string;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
};

const ItemCard = ({
  image,
  title,
  category,
  location,
  price,
  rating,
}: ItemCardProps) => {
  return (
    <article className="item-card">
      <div className="item-card-image-wrapper">
        <img src={image} alt={title} className="item-card-image" />

        <button className="favorite-button" aria-label="Save item">
          ♡
        </button>
      </div>

      <div className="item-card-content">
        <div className="item-card-top">
          <span className="item-category">{category}</span>
          <span className="item-rating">★ {rating}</span>
        </div>

        <h3>{title}</h3>

        <p className="item-location">{location}</p>

        <div className="item-price">
          <strong>₪{price}</strong>
          <span> / day</span>
        </div>
      </div>
    </article>
  );
};

export default ItemCard;