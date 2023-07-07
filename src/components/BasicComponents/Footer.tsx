import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <h3 className="footer-title">
            <img src={"./mainlogo.png"}></img>
          </h3>
          <p className="footer-text">
            <p>
              &copy; {new Date().getFullYear()} 마음이음. All rights reserved.
            </p>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
