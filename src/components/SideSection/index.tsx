import React from "react";
import Favourite from "../Favourite";
import "./SideSection.scss";
import useHomeAction from "../../context/actions/HomeAction";
import type { ExpandedMenuOptionValue } from "../../context/types";

const renderSideSectionComponent = (selectedSection: ExpandedMenuOptionValue) => {
  switch (selectedSection) {
    case 'chronicle':
      return
    default:
      return <Favourite />
  }
}

const SideSection: React.FC = () => {
  const { homeState } = useHomeAction();
  const {activePage } = homeState;

  return (
    <div className="side-section">
      {renderSideSectionComponent(activePage)}
    </div>
  );
};

export default SideSection;
