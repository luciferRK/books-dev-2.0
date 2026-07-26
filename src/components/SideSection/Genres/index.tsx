import React from "react";
import useHomeAction from "../../../context/actions/HomeAction";
import FullStar from "../../Icon/FullStar";
import useGlobalAction from "../../../context/actions/GlobalAction";
import { getProperty } from "uixtra/utils";
import BookItem from "../../BookItem";
import type { Book } from "../../../context/types";
import { shuffle } from "../../../utils";
import "./Genres.scss";
import HazyBox from "../../ui/HazyBox";

const Genres: React.FC = () => {
  const { homeState } = useHomeAction();
  const { state } = useGlobalAction();
  const { activeGenre } = homeState;
  const { genreInfo } = state;

  const topThreeOfGenre = React.useMemo<Book[]>(() => {
    const booksOfGenre = (getProperty(genreInfo, [activeGenre, 'books'], []) as Book[]);
    return shuffle<Book>(booksOfGenre).sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [activeGenre, genreInfo]);

  return (
    <div className="genres-side-section">
      <section className="top">
        <div className="head">
          <div className="tag">Currently Reading</div>
          <div className="genre">{activeGenre}</div>
        </div>
        <div className="mini-stats">
          <div className="number-of-books">{getProperty(genreInfo, [activeGenre, 'books'], []).length} books</div>
          <div className="dot" />
          <div className="avgRating">
            <FullStar color="#CCFFFFFF" className="avg-rating-star" />
            {getProperty(genreInfo, [activeGenre, 'avgRating'], 0)} avg
          </div>
        </div>
      </section>
      <hr />
      <section className="middle">
        <div className="head">Top Reads in this Genre</div>
        <div className="top-three-books">
          {topThreeOfGenre.map((book) => (
            <BookItem book={book} disabled />
          ))}
        </div>
      </section>
      <hr />
      <section className="bottom">
        <HazyBox
          title={getProperty(genreInfo, [activeGenre, 'books'], []).length}
          content="books"
        />
        <HazyBox
          title={getProperty(genreInfo, [activeGenre, 'avgRating'], 0)}
          content="avg rating"
        />
        <HazyBox
          title={getProperty(genreInfo, [activeGenre, 'peakYear'])}
          content="Peak Year"
        />
      </section>
    </div>
  );
}

export default Genres;
