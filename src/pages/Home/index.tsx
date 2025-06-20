
import React from "react";
import HomeHeading from "../../components/HomeHeading";
import MostRecent from "../../components/MostRecent";
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
  const bookListRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (homeHeadingRef.current && bookListRef.current) {
      const windowHeight = window.innerHeight;
      const bookList = bookListRef.current;
      const homeHeading = homeHeadingRef.current;
      console.log(
        "scrolling",
        homeHeading.clientHeight,
        bookList.clientHeight,
        (bookList.clientHeight / windowHeight) * 100,
      );
    }
  };

  return (
    <Loading isIt={loading}>
      <div className="home">
        <BookCover animated />
        <HomeHeading ref={homeHeadingRef as React.RefObject<HTMLDivElement>} />
        <BookList
          ref={bookListRef as React.RefObject<HTMLDivElement>}
          onScroll={() => {}}
        />
        <MostRecent />
        <SimilarBooksSkeleton />
      </div>
    </Loading>
  );
};

export default Home;
