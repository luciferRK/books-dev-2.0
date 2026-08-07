import React from "react";
import "./CurrentlyReading.scss";
import { useAllBooks } from "../../../store/global/useGlobal";
import type { Book } from "../../../store/types";
import { BOOK_COVER_PREFIX } from "../../../utils/constants";
import { monthsAgo } from "../../../utils";
import HazyBox from "../../ui/HazyBox";
import ChronicleBookItem from "../../Chronicle/ChronicleBookItem";
import Img from "../Img";

const CurrentlyReading: React.FC = () => {
  const allBooks = useAllBooks();

  const {
    thisYearStats,
    currentlyReadingBook,
    upNext,
  } = React.useMemo<{
    currentlyReadingBook: Book;
    upNext: Book;
    thisYearStats: {
      noOfBooks: number;
      avgRating: number;
      noOfGenres: number;
    }
  }>(() => {
    const currentYear = new Date().getFullYear();
    const thisYearsBooks = allBooks.filter(
      (book) =>
        book.category === "read" &&
        new Date(book.dates.finished).getFullYear() === currentYear,
    );

    const allGenresOfThisYear = new Set<string>();
    for (let i = 0; i < thisYearsBooks.length; i++) {
      const genres = thisYearsBooks[i].genre;
      for (let j = 0; j < genres.length; j++) {
        allGenresOfThisYear.add(genres[j]);
      }
    }

    const noOfGenres = allGenresOfThisYear.size;

    const toReadBooks = allBooks.filter((book) => book.category === 'toread');
    const currentlyReadingBook = toReadBooks.filter((book) => book.dates.started !== '' && book.dates.finished === '')[0];

    console.log(allBooks.filter(
      (book) =>
        book.category === "read"
    ), currentYear);

    return {
      currentlyReadingBook,
      upNext: toReadBooks.filter(
        (book) => book.urlName !== currentlyReadingBook.urlName
      )[Math.floor(Math.random() * (toReadBooks.length - 1))],
      thisYearStats: {
        noOfBooks: thisYearsBooks.length,
        avgRating: thisYearsBooks.reduce((prev, curr) => prev + curr.rating, 0) / thisYearsBooks.length,
        noOfGenres
      }
    }
    }, [allBooks])

  console.log(thisYearStats);

  return (
    <div className="currently-reading">
      <div className="book">
        <div className="heading">Currently Reading</div>
        <div className="content">
          <Img src={`${BOOK_COVER_PREFIX}${currentlyReadingBook.image}`} alt={currentlyReadingBook.name} />
          <div className="info">
            <div className="title">{currentlyReadingBook.name}</div>
            <div className="author">{currentlyReadingBook.author.name}</div>
            <div className="since">Started {monthsAgo(currentlyReadingBook.dates.started)} months ago</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="stats">
        <div className="heading">
          This Year
        </div>
        <div className="content">
          <HazyBox title={thisYearStats.noOfBooks} content="Books" />
          <HazyBox title={thisYearStats.avgRating} content="Avg rating" />
          <HazyBox title={thisYearStats.noOfGenres} content="Genres" />
        </div>
      </div>
      <hr />
      <div className="up-next">
        <div className="heading">Up Next</div>
        <div className="content">
          <ChronicleBookItem book={upNext} />
        </div>
      </div>
    </div>
  )
}

export default CurrentlyReading;
