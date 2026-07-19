import React, { useMemo } from "react";
import "./BookList.scss";
import { useNavigate } from "react-router-dom";
import useGlobalAction from "../../context/actions/GlobalAction";
import BookItem from "../BookItem";
import { and, classNames } from "uixtra/utils";
import "../HomePageContent/HomePageContent.scss";
import useHomeAction from "../../context/actions/HomeAction";
import { Show } from "uixtra/components";
import GenreOptions from "./GenreOptions";

interface BookListProps {
  homeHeadingRef: React.RefObject<HTMLDivElement>;
}

const BookList: React.FC<BookListProps> = (props) => {
  const { homeHeadingRef } = props;
  const { homeState } = useHomeAction();
  const { state, setBook } = useGlobalAction();
  const { activePage } = homeState;
  const { allBooks, favBook } = state;
  const navigate = useNavigate();

  const favRemovedReadList = useMemo(() => {
    if (allBooks.length > 0) {
      return allBooks.filter((book) => and(book.urlName !== favBook.urlName, book.category !== 'toread'));
    }
    return [];
  }, [allBooks, favBook.urlName]);

  return (
    <div className="book-list home-scroll-section">
      <div className="book-list-content home-scroll-content">
        <Show if={activePage === 'genres'}><GenreOptions /></Show>
        <div className={classNames("books")}>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
