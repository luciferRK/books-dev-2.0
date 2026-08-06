import React from "react";
import "./HomeHeading.scss";
import { HEADINGS, MOBILE_HEADINGS } from "../../utils/constants";
import { useActivePage, useMenuOptions } from "../../store/home/useHome";
import { classNames } from "uixtra/utils";
import { useIsMobileView } from "../../store/global/useGlobal";
import { ShowIfElse } from "uixtra/components";

const HomeHeading = React.forwardRef<HTMLDivElement>((__, ref) => {
  const MenuOptions = useMenuOptions();
  const isMobileView = useIsMobileView();
  const activePage = useActivePage();

  const activeOptionIndex = React.useMemo(
    () => MenuOptions.findIndex((option) => option.isSelected),
    [MenuOptions],
  );

  const expandedOptionsStyle = {
    "--selected-option-index": Math.max(activeOptionIndex, 0),
    "--selected-option-opacity": activeOptionIndex >= 0 ? 1 : 0,
  } as React.CSSProperties;

  return (
    <div className={classNames("home-heading", activePage)} id="home-heading" ref={ref}>
      <div className="home-heading-content">
        <div className="main-heading">
          <ShowIfElse if={isMobileView}>
            <>{MOBILE_HEADINGS[activePage]}</>
            <>{HEADINGS[activePage]}</>
          </ShowIfElse>
        </div>
        <div className="expanded-options" style={expandedOptionsStyle}>
          <span className="selection-indicator" aria-hidden />
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
