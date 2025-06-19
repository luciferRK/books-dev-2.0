import React from "react";
import "./Book.scss";
import type { Book } from "../../context/types";
import BookCover from "../../components/BookCover";
import SimilarBooks from "../../components/SimilarBooks";
import BookReview from "../../components/BookReview";

const Book: React.FC = () => {
  return (
    <div className="book-page">
      <BookCover />
      <BookReview />
      <SimilarBooks />
    </div>
  );
};

export default Book;
