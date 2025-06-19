import React from "react";
import "./BookReview.scss";
import { Link } from "react-router-dom";

interface BookReviewProps {}

const BookReview: React.FC<BookReviewProps> = () => {
  return (
    <div className="book-review">
      <div className="book-review-content">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default BookReview;
