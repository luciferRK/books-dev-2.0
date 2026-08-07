import React, { useMemo } from "react";
import "./SimilarBooks.scss";
import { useAllBooks, useBook, useGlobalActions } from "../../store/global/useGlobal";
import BookItem from "../BookItem";
import { useNavigate } from "react-router-dom";

const SimilarBooks: React.FC = () => {
  const book = useBook();
  const allBooks = useAllBooks();
  const { getSimilarBooks } = useGlobalActions();
  const navigate = useNavigate();

  const similarBooks = useMemo(() => {
    if (allBooks.length > 0) {
      return getSimilarBooks(book);
    }
    return [];
  }, [allBooks, book, getSimilarBooks]);

  return (
    <div className="similar-books">
      <div className="similar-books-content">
        <div className="heading">Review of other Similar Books</div>
        <div className="book-list">
          {similarBooks.map((book) => (
            <BookItem
              key={book.urlName}
              book={book}
              onClick={() => {
                navigate(`/${book.urlName}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarBooks;
