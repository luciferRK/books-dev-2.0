import React from "react";
import "./HomePageContent.scss";
import BookList from "../BookList";
import useHomeAction from "../../context/actions/HomeAction";

interface HomePageContentProps {
  homeHeadingRef: React.RefObject<HTMLDivElement>;
}

const HomePageContent: React.FC<HomePageContentProps> = (props) => {
  const { homeHeadingRef } = props;
  const { homeState } = useHomeAction();

  if (homeState.activePage === 'discovery') {
    return <div className="discovery-content" />
  }

  return <BookList homeHeadingRef={homeHeadingRef} />
};

export default HomePageContent;
