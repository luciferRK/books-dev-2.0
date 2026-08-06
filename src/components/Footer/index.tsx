import type React from "react";
import "./Footer.scss";
import InstaIcon from "../Icon/Insta";

// This is a footer component which will show in Mobile view only
const Footer: React.FC = () => {
  const handleInsta = () => {
    window.open("https://instagram.com/lucifer_rk_", "_blank");
  };

  return (
    <div className="footer">
      <div className="copyright">
        <span>Likhith R Kulal</span> &copy; Copyright 2026
      </div>
      <div className="social">
        <div className="icon-wrapper">
          <InstaIcon onClick={handleInsta} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
