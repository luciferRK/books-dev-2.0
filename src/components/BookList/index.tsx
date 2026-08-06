import React, { useMemo } from "react";
import "./BookList.scss";
import { useNavigate } from "react-router-dom";
import {
  useAllBooks,
  useFavBook,
  useGenreInfo,
  useGlobalActions,
} from "../../store/global/useGlobal";
import BookItem from "../BookItem";
import { classNames } from "uixtra/utils";
import "../HomePageContent/HomePageContent.scss";
import { useActiveGenre, useActivePage } from "../../store/home/useHome";
import { Show } from "uixtra/components";
import GenreHeading from "./GenreHeading";
import type { Book } from "../../store/types";

interface BookListProps {
  homeHeadingRef: React.RefObject<HTMLDivElement>;
}

const BookList: React.FC<BookListProps> = (props) => {
  const { homeHeadingRef } = props;
  const activePage = useActivePage();
  const activeGenre = useActiveGenre();
  const { setBook, getBooks } = useGlobalActions();
  // Subscribe to the underlying data so the derived list recomputes when books
  // load or the genre buckets change (getBooks itself is a stable reference).
  const allBooks = useAllBooks();
  const genreInfo = useGenreInfo();
  const favBook = useFavBook();
  const navigate = useNavigate();

  const favRemovedReadList = useMemo<Book[]>(() => {
    return getBooks(activePage, activeGenre);
  }, [getBooks, activeGenre, activePage, allBooks, genreInfo, favBook]);

  return (
    <div className="book-list home-scroll-section">
      <div className="book-list-content home-scroll-content">
        <Show if={activePage === 'genres'}>
          <GenreHeading />
        </Show>
        <div
          className={classNames("books", {
            "genre-books": activePage === 'genres',
          })}
        >
          {favRemovedReadList.map((book) => (
            <BookItem
              book={book}
              key={book.urlName}
              onClick={() => {
                if (homeHeadingRef.current) {
                  homeHeadingRef.current.style.height = `${homeHeadingRef.current.clientHeight}px`;
                }
                setBook(book);
                navigate(`/${book.urlName}`);
              }}
              disabled={activePage !== 'reviews'}
              showRating={activePage === "genres"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
