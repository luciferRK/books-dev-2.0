import React from "react";
import Repeat from "../Repeat";
import { Show } from "uixtra/components";
import FullStar from "../Icon/FullStar";
import HalfStar from "../Icon/HalfStar";
import "./Rating.scss";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = (props) => {
  const { rating } = props;

  const fullStar: number = React.useMemo(() => {
    return Number(Number.parseInt(rating.toString()));
  }, [rating]);

  const fullStarArray = React.useMemo(() => {
    return new Array(fullStar).fill(0).map((_, index) => index + 1);
  }, [fullStar]);

  const emptyStarArray = React.useMemo(() => {
    const emptyCount = 5 - fullStar - (rating % fullStar !== 0 ? 1 : 0);
    return new Array(emptyCount).fill(0).map((_, index) => index + 1);
  }, [fullStar, rating]);

  return (
    <div className="rating">
      <Repeat
        name="full-star-rating"
        for={fullStarArray}
        element={FullStar}
        className="star full-star"
      />
      <Show if={rating % fullStar !== 0}>
        <HalfStar className="star half-star" />
      </Show>
      <Repeat
        name="empty-star-rating"
        for={emptyStarArray}
        element={FullStar}
        className="star empty-star"
        color="#ffffff15"
      />
    </div>
  )
};

export default Rating;
