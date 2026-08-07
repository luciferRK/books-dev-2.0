import React from "react";
import Logo from "/assets/images/name_logo_white.png";
import "./Header.scss";
import { useMenuOptions } from "../../store/home/useHome";
import { and, classNames } from "uixtra/utils";
import { useIsMobileView } from "../../store/global/useGlobal";
import { useNavigate } from "react-router-dom";
import Img from "../Img";

const Header: React.FC = () => {
  const MenuOptions = useMenuOptions();
  const isMobileView = useIsMobileView();
  const navigate = useNavigate();
  const menuBackground = React.useRef<HTMLDivElement>(null);

  const [showPhoneMenu, setShowPhoneMenu] = React.useState(false);

  const handleMenuOptionClick = (optionClick: () => void) => {
    optionClick();
    (menuBackground.current as HTMLDivElement)
      .classList.replace("fullscreen", "minimize");
    setShowPhoneMenu(false);
    navigate('/');
  }

  return (
    <div
      className={classNames("main-header", {
        "is-open": and(isMobileView, showPhoneMenu),
      })}
    >
      <div className="logo-container">
        <Img src={Logo} className="logo" />
      </div>
      <div className="phone-expanded-options">
        <button
          type="button"
          title="menu"
          className="icon"
          onClick={() => {
            const menuBackgroundDiv = menuBackground.current as HTMLDivElement;
            if (!showPhoneMenu) {
              if (menuBackgroundDiv.classList.contains("minimize")) {
                menuBackgroundDiv.classList.replace("minimize", "fullscreen");
              } else {
                menuBackgroundDiv.classList.add("fullscreen");
              }
            } else {
              menuBackgroundDiv.classList.replace("fullscreen", "minimize");
            }
            setShowPhoneMenu((prev) => !prev);
          }}
        >
          <div ref={menuBackground} className={"menu-background"} />
          <div className="bar bar-1" />
          <div className="bar bar-2" />
          <div className="bar bar-3" />
        </button>
        <div className="options">
          {MenuOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              className={classNames("option", { selected: option.isSelected })}
              onClick={() => handleMenuOptionClick(option.onClick)}
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
