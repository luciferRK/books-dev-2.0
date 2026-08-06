import React from "react";
import HomeHeading from "../../components/HomeHeading";
import SideSection from "../../components/SideSection";
import "./Home.scss";

import SimilarBooksSkeleton from "../../components/SimilarBooks/SimilarBooksSkeleton";
import BookCover from "../../components/BookCover";
import { useIsMobileView, useLoading } from "../../store/global/useGlobal";
import HomePageContent from "../../components/HomePageContent";
import { HOME_HEADING_HEIGHT, HOME_HEADING_HEIGHT_MOBILE } from "../../utils/constants";
import { useActivePage } from "../../store/home/useHome";
import { classNames, ifElse } from "uixtra/utils";

const HOME_HEADING_HEIGHT_CSS_VARIABLE = "--home-heading-height";

const Home: React.FC = () => {
  const loading = useLoading();
  const activePage = useActivePage();
  const isMobileView = useIsMobileView();
  const homeHeadingRef = React.useRef<HTMLDivElement>(null);
  const homePageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!loading) {
      homePageRef.current?.style.setProperty(
        HOME_HEADING_HEIGHT_CSS_VARIABLE,
        ifElse(
          isMobileView,
          HOME_HEADING_HEIGHT_MOBILE,
          HOME_HEADING_HEIGHT[activePage] as string
        )
      );
    }
  }, [activePage, isMobileView, loading])

  return (
    <div
      className={classNames("home", activePage)}
      ref={homePageRef}
    >
      <BookCover animated />
      <HomeHeading ref={homeHeadingRef} />
      <HomePageContent
        homeHeadingRef={homeHeadingRef as React.RefObject<HTMLDivElement>}
      />
      <SideSection />
      <SimilarBooksSkeleton />
    </div>
  );
};

export default Home;
