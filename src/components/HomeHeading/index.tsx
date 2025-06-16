import React from "react";
import "./HomeHeading.scss";
import Logo from "/images/name_logo_white.png";
import { HEADINGS } from "../../utils/constants";

const HomeHeading = () => {
  const [view, _] = React.useState("review");

  return (
    <div className="home-heading">
      <div className="main-header">
        <div>
          <img src={Logo} className="logo" />
        </div>
        <div className="options"></div>
      </div>
      <div className="home-heading-content">
        <div className="main-heading">{HEADINGS[view]}</div>
        <div className="expanded-options">
          <div className="option">NEW</div>
          <div className="option">GENRES</div>
          <div className="option selected">REVIEWS</div>
          <div className="option">DISCOVERY</div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeading;
