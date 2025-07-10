import React from "react";
import HomeHeading from "../../components/HomeHeading";
import Favourite from "../../components/Favourite";
import "./Home.scss";
import BookList from "../../components/BookList";
import SimilarBooksSkeleton from "../../components/SimilarBooks/SimilarBooksSkeleton";
import BookCover from "../../components/BookCover";
import useGlobalAction from "../../context/actions/GlobalAction";
import Loading from "../../components/Loading";

const Home: React.FC = () => {
  const { state } = useGlobalAction();
  const { loading } = state;
  const homeHeadingRef = React.useRef<HTMLDivElement>(null);

  return (
    <Loading isIt={loading}>
      <div className="home">
        <BookCover animated />
        <HomeHeading ref={homeHeadingRef} />
        <BookList
          homeHeadingRef={homeHeadingRef as React.RefObject<HTMLDivElement>}
        />
        <Favourite />
        <SimilarBooksSkeleton />
      </div>
    </Loading>
  );
};

export default Home;
