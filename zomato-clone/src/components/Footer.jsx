import "./Footer.css";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>Company</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Blog</p>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <p>Help Center</p>
          <p>Contact Us</p>
          <p>Privacy Policy</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <FaTwitter />
            <FaFacebookF />
            <FaInstagram />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        2026 © Zomato™ Ltd. All rights reserved.
       
      </div>
    </footer>
  );
};

export default Footer;
