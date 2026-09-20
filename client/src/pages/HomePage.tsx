import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">Peer-to-Peer Creative Equipment Rental</p>

          <h1>
            Rent what you need.
            <br />
            Earn from what you own.
          </h1>

          <p className="hero-text">
            Find cameras, lighting, and audio equipment for your next project
            without paying the full purchase price.
          </p>

          <div className="hero-actions">
            <Link to="/explore" className="primary-btn">
              Explore Equipment
            </Link>

            <Link to="/items/new" className="secondary-btn">
              List Your Equipment
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <span>Featured categories</span>

          <div className="category-preview">
            <div>📷 Cameras</div>
            <div>💡 Lighting</div>
            <div>🎙️ Audio</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;