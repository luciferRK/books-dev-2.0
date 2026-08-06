import React from "react";
import "./BookReview.scss";
import { Link } from "react-router-dom";
import { useBook } from "../../store/global/useGlobal";
import BackIcon from "../Icon/Back";
import Repeat from "../Repeat";
import ReviewPara from "../ReviewPara";
import Rating from "../Rating";

const BookReview: React.FC = () => {
  const book = useBook();

  return (
    <div className="book-review">
      <div className="book-review-content">
        <div className="top-section">
          <div className="back">
            <Link to="/" className="back">
              <BackIcon className="icon" />
              Back to Home
            </Link>
          </div>
          <Rating rating={book.rating} />
        </div>
        <div className="review">
          <Repeat
            name="review-para"
            for={book.review}
            element={ReviewPara}
            passIndex
            passItem
          />
        </div>
      </div>
    </div>
  );
};

export default BookReview;
