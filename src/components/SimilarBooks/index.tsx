import React, { useMemo } from "react";
import "./SimilarBooks.scss";
import { useBook, useGlobalActions } from "../../store/global/useGlobal";
import BookItem from "../BookItem";
import { useNavigate } from "react-router-dom";

const SimilarBooks: React.FC = () => {
  const book = useBook();
  const { getSimilarBooks } = useGlobalActions();
  const navigate = useNavigate();

  const similarBooks = useMemo(() => getSimilarBooks(book), [book, getSimilarBooks]);

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
