import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import "../Header/Header.css";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    closeMenu();
    navigate("/contact");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/" onClick={closeMenu} style={{ display: "flex", color: "white", textDecoration: "none" }}>
            <img src={logo} alt="TNC CRYPTO" />
            <h2 style={{ marginTop: "8px" }}>SAIGE AI</h2>
          </Link>
        </div>

        <div className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/coins" onClick={closeMenu}>Market  </Link></li>
            <li><Link to="/predict" onClick={closeMenu}>Predict</Link></li>
            <li><Link to="/portfolio" onClick={closeMenu}>Portfolio</Link></li>
            <li className="no-wrap"><Link to="/gopro" onClick={closeMenu}>Go Premium</Link></li>
            <li><Link to="/info" onClick={closeMenu}>Info</Link></li> {/* ✅ Fixed FAQ Link */}
            <li><Link to="/signup" onClick={closeMenu}>Signup</Link></li>
          </ul>

          <button className="contact-btn" onClick={handleContactClick}>
            Contact Us
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
