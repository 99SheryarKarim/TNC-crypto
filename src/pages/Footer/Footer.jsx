import "./Footer.css";
import logo from "../../assets/logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faPinterest,
  faWhatsapp,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo and Description */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="TNC CRYPTO" className="logo" />
          </div>
          <p className="footer-description">
            Embrace the world of digital currency and redefine your investment strategies with us.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <i className="icon-location"></i>
              <span>4X17 Washington Ave. Manchester, Kentucky 394XX</span>
            </div>
            <div className="contact-item">
              <i className="icon-phone"></i>
              <span>(406) 55X-01XX</span>
            </div>
            <div className="contact-item">
              <i className="icon-email"></i>
              <span>supportX@tnccrypto.com</span>
            </div>
          </div>
        </div>

        {/* Explore Links */}
        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/why-choose">Why Choose</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/licensing">Licensing</a></li>
          </ul>
        </div>

        {/* Services Links */}
        <div className="footer-links">
          <h3>Services</h3>
          <ul>
            <li><a href="/trading">Crypto Trading</a></li>
            <li><a href="/education">Education Resources</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/news">Crypto News</a></li>
          </ul>
        </div>

        {/* Newsletter & Social Links */}
        <div className="footer-newsletter">
          <h3>TNC Crypto Newsletter</h3>
          <p>Subscribe to our newsletter for weekly updates, market insights, and special offers.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email Here" />
            <button type="submit">Subscribe</button>
          </div>
          {/* Social Media Icons */}
          <div className="social-links">
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faPinterest} /></a>
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faYoutube} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>Copyright © {currentYear} TNC Crypto | Designed by ThemeNCode LLC - Powered by Webflow.com</p>
      </div>
    </footer>
  );
}

export default Footer;
