import React from "react";
import HomeHeading from "../../components/HomeHeading";
import MostRecent from "../../components/MostRecent";
import "./Home.scss";
import BookList from "../../components/BookList";
import SimilarBooksSkeleton from "../../components/SimilarBooks/SimilarBooksSkeleton";
import BookCover from "../../components/BookCover";

const Home: React.FC = () => {
  return (
    <div className="home">
      <BookCover animated />
      <HomeHeading />
      <BookList />
      <MostRecent />
      <SimilarBooksSkeleton />
    </div>
  );
};

export default Home;
