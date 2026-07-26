import React from "react";
import "./HomePageContent.scss";
import BookList from "../BookList";
import useHomeAction from "../../context/actions/HomeAction";
import ChronicleBookList from "../Chronicle";

interface HomePageContentProps {
  homeHeadingRef: React.RefObject<HTMLDivElement>;
}

const HomePageContent: React.FC<HomePageContentProps> = (props) => {
  const { homeHeadingRef } = props;
  const { homeState } = useHomeAction();
  const { activePage } = homeState;

  if (homeState.activePage === 'discovery') {
    return <div className="discovery-content" />
  }

  switch (activePage) {
    case 'discovery':
      return <div className="discovery-content" />
    case 'chronicle':
      return <ChronicleBookList />
    default:
      return <BookList homeHeadingRef={homeHeadingRef} />
  }
};

export default HomePageContent;
