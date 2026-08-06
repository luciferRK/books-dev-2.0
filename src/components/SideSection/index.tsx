import React from "react";
import Favourite from "../Favourite";
import "./SideSection.scss";
import { useActivePage } from "../../store/home/useHome";
import type { ExpandedMenuOptionValue } from "../../store/types";
import Genres from "./Genres";
import { classNames } from "uixtra/utils";
import CurrentlyReading from "./CurrentlyReading";
import ReaderDNA from "./ReaderDNA";

const renderSideSectionComponent = (selectedSection: ExpandedMenuOptionValue) => {
  switch (selectedSection) {
    case 'chronicle':
      return <CurrentlyReading />
    case 'genres':
      return <Genres />
    case 'discovery':
      return <ReaderDNA />
    default:
      return <Favourite />
  }
}

const SideSection: React.FC = () => {
  const activePage = useActivePage();

  return (
    <div className={classNames("side-section", activePage)}>
      <div className="side-section-content" key={activePage}>
        {renderSideSectionComponent(activePage)}
      </div>
    </div>
  );
};

export default SideSection;
