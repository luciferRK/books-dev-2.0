import React, { useMemo } from "react";
import "./BookList.scss";
import { useNavigate } from "react-router-dom";
import useGlobalAction from "../../context/actions/GlobalAction";
import BookItem from "../BookItem";
import { classNames } from "uixtra/utils";
import "../HomePageContent/HomePageContent.scss";
import useHomeAction from "../../context/actions/HomeAction";
import { Show } from "uixtra/components";
import GenreHeading from "./GenreHeading";
import type { Book } from "../../context/types";

interface BookListProps {
  homeHeadingRef: React.RefObject<HTMLDivElement>;
}

const BookList: React.FC<BookListProps> = (props) => {
  const { homeHeadingRef } = props;
  const { homeState } = useHomeAction();
  const { setBook, getBooks } = useGlobalAction();
  const { activePage, activeGenre } = homeState;
  const navigate = useNavigate();

  const favRemovedReadList = useMemo<Book[]>(() => {
    return getBooks(activePage, activeGenre);
  }, [getBooks, activeGenre, activePage]);

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
