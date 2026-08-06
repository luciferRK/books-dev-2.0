import React from "react";
import "./HomePageContent.scss";
import BookList from "../BookList";
import { useActivePage } from "../../store/home/useHome";
import ChronicleBookList from "../Chronicle";
import Discovery from "../Discovery";

interface HomePageContentProps {
  homeHeadingRef: React.RefObject<HTMLDivElement>;
}

const HomePageContent: React.FC<HomePageContentProps> = (props) => {
  const { homeHeadingRef } = props;
  const activePage = useActivePage();

  switch (activePage) {
    case 'discovery':
      return <Discovery />
    case 'chronicle':
      return <ChronicleBookList />
    default:
      return <BookList homeHeadingRef={homeHeadingRef} />
  }
};

export default HomePageContent;
