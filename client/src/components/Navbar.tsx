import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Circlo
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/my-rentals">My Rentals</Link>
        <Link to="/my-listings">My Listings</Link>
      </div>

      <div className="nav-actions">
        <Link to="/login">Login</Link>
        <Link to="/register" className="primary-btn">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;