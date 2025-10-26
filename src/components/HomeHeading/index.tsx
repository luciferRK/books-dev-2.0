import React from "react";
import "./HomeHeading.scss";
import { HEADINGS, MOBILE_HEADINGS } from "../../utils/constants";
import useHomeAction from "../../context/actions/HomeAction";
import { classNames } from "uixtra/utils";
import useGlobalAction from "../../context/actions/GlobalAction";
import { ShowIfElse } from "uixtra/components";

const HomeHeading = React.forwardRef<HTMLDivElement>((__, ref) => {
  const { homeState, MenuOptions } = useHomeAction();
  const { state } = useGlobalAction();
  const { isMobileView } = state;
  const { activePage } = homeState;

  return (
    <div className="home-heading" id="home-heading" ref={ref}>
      <div className="home-heading-content">
        <div className="main-heading">
          <ShowIfElse if={isMobileView}>
            <>{MOBILE_HEADINGS[activePage]}</>
            <>{HEADINGS[activePage]}</>
          </ShowIfElse>
        </div>
        <div className="expanded-options">
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
});

export default HomeHeading;
