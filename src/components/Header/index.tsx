import React from "react";
import Logo from "/images/name_logo_white.png";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <div className="main-header">
      <div>
        <img src={Logo} className="logo" />
      </div>
      <div className="options"></div>
    </div>
  );
};

export default Header;
