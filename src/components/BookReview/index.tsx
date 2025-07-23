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

// interface BookReviewProps {}

// const BookReview: React.FC<BookReviewProps> = () => {
const BookReview: React.FC = () => {
  const { state } = useGlobalAction();
  const { book } = state;

  const fullStar: number = useMemo(() => {
    return Number(Number.parseInt(book.rating.toString()));
  }, [book.rating]);

  const fullStarArray = useMemo(() => {
    return new Array(fullStar).fill(0).map((_, index) => index + 1);
  }, [fullStar]);

  const emptyStarArray = useMemo(() => {
    const emptyCount = 5 - fullStar - (book.rating % fullStar !== 0 ? 1 : 0);
    return new Array(emptyCount).fill(0).map((_, index) => index + 1);
  }, [fullStar, book.rating]);

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
          <div className="rating">
            <Repeat
              for={fullStarArray}
              element={FullStar}
              className="star full-star"
            />
            <Show if={book.rating % fullStar !== 0}>
              <HalfStar className="star half-star" />
            </Show>
            <Repeat
              for={emptyStarArray}
              element={FullStar}
              className="star empty-star"
              color="#ffffff15"
            />
          </div>
        </div>
        <div className="review">
          <Repeat
            for={book.review}
            element={ReviewPara}
            Key={(item) => item?.urlName}
            passIndex
            passItem
          />
        </div>
      </div>
    </div>
  );
};

export default BookReview;
