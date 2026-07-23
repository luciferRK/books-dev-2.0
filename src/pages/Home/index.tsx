import React from "react";
import HomeHeading from "../../components/HomeHeading";
import SideSection from "../../components/SideSection";
import "./Home.scss";

import SimilarBooksSkeleton from "../../components/SimilarBooks/SimilarBooksSkeleton";
import BookCover from "../../components/BookCover";
import useGlobalAction from "../../context/actions/GlobalAction";
import Loading from "../../components/Loading";
import HomePageContent from "../../components/HomePageContent";
import { HOME_HEADING_HEIGHT } from "../../utils/constants";
import useHomeAction from "../../context/actions/HomeAction";

const HOME_HEADING_HEIGHT_CSS_VARIABLE = "--home-heading-height";

const Home: React.FC = () => {
  const { state } = useGlobalAction();
  const { homeState } = useHomeAction();
  const { loading } = state;
  const { activePage } = homeState;
  const homeHeadingRef = React.useRef<HTMLDivElement>(null);
  const homePageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!loading) {
      homePageRef.current?.style.setProperty(
        HOME_HEADING_HEIGHT_CSS_VARIABLE,
        HOME_HEADING_HEIGHT[activePage] as string
      );
    }
  }, [activePage, loading])

  return (
    <Loading isIt={loading}>
      <div
        className="home"
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
    </Loading>
  );
};

export default Home;
