import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email: string;
};

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("circlo_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const savedUser = localStorage.getItem("circlo_user");

      setUser(
        savedUser ? JSON.parse(savedUser) : null
      );
    };

    window.addEventListener(
      "circlo-auth-change",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "circlo-auth-change",
        handleAuthChange
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("circlo_token");
    localStorage.removeItem("circlo_user");

    setUser(null);

    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Circlo
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>

        {user && (
          <>
            <Link to="/my-rentals">
              My Rentals
            </Link>

            <Link to="/my-listings">
              My Listings
            </Link>

            <Link to="/owner">
              Owner Dashboard
            </Link>
          </>
        )}
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="nav-user">
              Hi, {user.name}
            </span>

            <button
              type="button"
              className="nav-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link
              to="/register"
              className="primary-btn"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;