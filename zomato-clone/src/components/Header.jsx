import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaMapMarkerAlt, FaChevronDown, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Zomato</h1>

          <div className="search-box">
            <div className="location">
              <FaMapMarkerAlt className="icon location-icon" />
              <span>Hyderabad</span>
              <FaChevronDown className="icon" />
            </div>

            <div className="divider"></div>

            <div className="search">
              <FaSearch className="icon" />
              <input
                placeholder="Search for restaurant, cuisine or a dish"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/auth" className="btn login-btn">Login</Link>
                <Link to="/auth" className="btn signup-btn">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/cart" className="btn signup-btn">Cart</Link>
                <Link to="/orderHistory" className="btn signup-btn">Order History</Link>
                <button onClick={handleLogout} className="btn login-btn">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="breadcrumb">
        Home / India / <span>Hyderabad Restaurants</span>
      </div>
    </>
  );
};

export default Header;
