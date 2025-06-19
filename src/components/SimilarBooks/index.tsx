import React from "react";
import "./SimilarBooks.scss";
interface SimilarBooksProps {}

const SimilarBooks: React.FC<SimilarBooksProps> = () => {
  return (
    <div className="similar-books">
      <div className="similar-books-content">
        Content for similar books will go here.
      </div>
    </div>
  );
};

export default SimilarBooks;
