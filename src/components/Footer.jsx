import React from "react";
import "../footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h3>Contact</h3>
          <p>Email: info@TenderManagment.com</p>
          <p>Phone: 555-1234</p>
        </div>

        <div>
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li>
              <a href="https://facebook.com">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="https://instagram.com">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="copyright">
        Copyright &copy; {new Date().getFullYear()} Tender Managment
      </p>
    </footer>
  );
}

export default Footer;
