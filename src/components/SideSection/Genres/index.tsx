import React from "react";
import { useActiveGenre } from "../../../store/home/useHome";
import FullStar from "../../Icon/FullStar";
import { useGenreInfo } from "../../../store/global/useGlobal";
import { getProperty } from "uixtra/utils";
import BookItem from "../../BookItem";
import type { Book } from "../../../store/types";
import { shuffle } from "../../../utils";
import "./Genres.scss";
import HazyBox from "../../ui/HazyBox";

const Genres: React.FC = () => {
  const activeGenre = useActiveGenre();
  const genreInfo = useGenreInfo();

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
