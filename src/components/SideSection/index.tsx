import React from "react";
import Favourite from "../Favourite";
import "./SideSection.scss";
import useHomeAction from "../../context/actions/HomeAction";
import type { ExpandedMenuOptionValue } from "../../context/types";
import Genres from "./Genres";
import { classNames } from "uixtra/utils";

const renderSideSectionComponent = (selectedSection: ExpandedMenuOptionValue) => {
  switch (selectedSection) {
    case 'chronicle':
      return
    case 'genres':
      return <Genres />
    default:
      return <Favourite />
  }
}

const SideSection: React.FC = () => {
  const { homeState } = useHomeAction();
  const {activePage } = homeState;

  return (
    <div className={classNames("side-section", activePage)}>
      {renderSideSectionComponent(activePage)}
    </div>
  );
};

export default SideSection;
