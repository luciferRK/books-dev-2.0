import React from "react";
import HomeHeading from "../../components/HomeHeading";
import SideSection from "../../components/SideSection";
import "./Home.scss";

import SimilarBooksSkeleton from "../../components/SimilarBooks/SimilarBooksSkeleton";
import BookCover from "../../components/BookCover";
import useGlobalAction from "../../context/actions/GlobalAction";
import Loading from "../../components/Loading";
import HomePageContent from "../../components/HomePageContent";

const Home: React.FC = () => {
  const { state } = useGlobalAction();
  const { loading } = state;
  const homeHeadingRef = React.useRef<HTMLDivElement>(null);

  return (
    <Loading isIt={loading}>
      <div className="home">
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
