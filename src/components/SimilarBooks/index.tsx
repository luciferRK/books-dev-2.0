import React, { useMemo } from "react";
import "./SimilarBooks.scss";
import useGlobalAction from "../../context/actions/GlobalAction";
import BookItem from "../BookItem";
import { useNavigate } from "react-router-dom";

interface SimilarBooksProps {}

const SimilarBooks: React.FC<SimilarBooksProps> = () => {
  const { state, getSimilarBooks } = useGlobalAction();
  const { book } = state;
  const navigate = useNavigate();

  const similarBooks = useMemo(() => getSimilarBooks(book), [book.urlName]);

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
