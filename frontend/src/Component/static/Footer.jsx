import React from "react";
import { Link } from "react-router-dom";
import { FaAt, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobeAsia } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="footer-brand">
              <div className="footer-brand-name d-flex align-items-center gap-2">
                <FaGlobeAsia /> Incredible India
              </div>
              <p>Your ultimate companion for exploring the vibrant colors, rich heritage, and diverse landscapes of India. From the Himalayas to the backwaters of Kerala.</p>
            </div>
            <div className="footer-social">
              <a href="https://x.com/Dhatchana_dev" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><FaTwitter /></a>
              <a href="https://www.threads.com/@dhatchana.dev" target="_blank" rel="noopener noreferrer" aria-label="Threads"><FaAt /></a>
              <a href="https://www.instagram.com/dhatchana.dev?igsh=MTJzeXIybGFtMWF0OA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.youtube.com/@Dhatchana_dev" target="_blank" rel="noopener noreferrer" aria-label="Youtube"><FaYoutube /></a>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/package">Tour Packages</Link></li>
              <li><Link to="/India">Explore India</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/login">My Account</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="col-12 col-lg-4">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li className="d-flex align-items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <span>Salem, Tamil Nadu, India</span>
              </li>
              <li className="d-flex align-items-start gap-3">
                <FaPhoneAlt className="mt-1 text-primary" />
                <span>+91 9345813730</span>
              </li>
              <li className="d-flex align-items-start gap-3">
                <FaEnvelope className="mt-1 text-primary" />
                <span>msdhatchanamoorthy001@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mb-0">© {new Date().getFullYear()} Incredible India Explorer. Designed by DHATCHANAMOORTHY M S.</p>
          <div className="d-flex gap-4">
            <Link to="/">Sitemap</Link>
            <Link to="/">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
