import React from "react";
import HomeHeading from "../../components/HomeHeading";
import MostRecent from "../../components/MostRecent";
import "./Home.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
      <HomeHeading />
      <MostRecent />
    </div>
  );
};

export default Home;
