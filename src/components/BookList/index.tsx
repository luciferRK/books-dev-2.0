import React from "react";
import "./BookList.scss";
import { Link, useNavigate } from "react-router-dom";
import useGlobalAction from "../../context/actions/GlobalAction";
import BookItem from "./BookItem";

interface BookListProps {
  ref: React.RefObject<HTMLDivElement>;
  onScroll: React.UIEventHandler<HTMLDivElement>;
}

const BookList: React.FC<BookListProps> = (props) => {
  const { ref, onScroll } = props;
  const { state, setBook } = useGlobalAction();
  const { allBooks } = state;
  const navigate = useNavigate();

  return (
    <div className="book-list">
      <div className="book-list-content" ref={ref} onScroll={onScroll}>
        <Link to="/sample">Go To Book</Link>
        {allBooks.map((book) => (
          <BookItem
            book={book}
            onClick={() => {
              setBook(book);
              navigate(`/${book.urlName}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
