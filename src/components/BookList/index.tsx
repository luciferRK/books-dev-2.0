import React, { useMemo } from "react";
import "./BookList.scss";
import { useNavigate } from "react-router-dom";
import useGlobalAction from "../../context/actions/GlobalAction";
import BookItem from "../BookItem";

interface BookListProps {
  homeHeadingRef: React.RefObject<HTMLDivElement>;
}

const BookList: React.FC<BookListProps> = (props) => {
  const { homeHeadingRef } = props;
  const { state, setBook } = useGlobalAction();
  const { allBooks, favBook } = state;
  const navigate = useNavigate();

  const favRemovedList = useMemo(() => {
    if (allBooks.length > 0) {
      console.log(favBook);
      return allBooks.filter((book) => book.urlName !== favBook.urlName);
    }
    return [];
  }, [allBooks, favBook.urlName]);

  return (
    <div className="book-list">
      <div className="book-list-content">
        <div className="books">
          {favRemovedList.map((book) => (
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
