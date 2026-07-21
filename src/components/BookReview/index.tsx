import React, { useMemo } from "react";
import "./BookReview.scss";
import { Link } from "react-router-dom";
import useGlobalAction from "../../context/actions/GlobalAction";
import { Show } from "uixtra/components";
import FullStar from "../Icon/FullStar";
import HalfStar from "../Icon/HalfStar";
import BackIcon from "../Icon/Back";
import Repeat from "../Repeat";
import ReviewPara from "../ReviewPara";
import Rating from "../Rating";

// interface BookReviewProps {}

// const BookReview: React.FC<BookReviewProps> = () => {
const BookReview: React.FC = () => {
  const { state } = useGlobalAction();
  const { book } = state;

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
