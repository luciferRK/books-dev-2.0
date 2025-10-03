import React, { useMemo } from "react";
import "./BookList.scss";
import { useNavigate } from "react-router-dom";
import useGlobalAction from "../../context/actions/GlobalAction";
import BookItem from "../BookItem";
import { and } from "uixtra/utils";

interface BookListProps {
  homeHeadingRef: React.RefObject<HTMLDivElement>;
}

const BookList: React.FC<BookListProps> = (props) => {
  const { homeHeadingRef } = props;
  const { state, setBook } = useGlobalAction();
  const { allBooks, favBook } = state;
  const navigate = useNavigate();

  const favRemovedReadList = useMemo(() => {
    if (allBooks.length > 0) {
      return allBooks.filter((book) => and(book.urlName !== favBook.urlName, book.category !== 'toread'));
    }
    return [];
  }, [allBooks, favBook.urlName]);

  return (
    <div className="book-list">
      <div className="book-list-content">
        <div className="books">
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
