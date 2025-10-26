import React from "react";
import Logo from "/assets/images/name_logo_white.png";
import "./Header.scss";
import useHomeAction from "../../context/actions/HomeAction";
import { classNames } from "uixtra/utils";

const Header: React.FC = () => {
  const { MenuOptions } = useHomeAction();

  return (
    <div className="main-header">
      <div>
        <img src={Logo} className="logo" />
      </div>
      <div className="options"></div>
      <div className="phone-expanded-options">
        <div className="icon">
          <div className="bar bar-1" />
          <div className="bar bar-2" />
          <div className="bar bar-3" />
        </div>
        <div className="options">
          {MenuOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              className={classNames("option", { selected: option.isSelected })}
              onClick={option.onClick}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
