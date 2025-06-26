import React from "react";
import "./BookCover.scss";
import { classNames } from "uixtra/utils";

interface BookCoverProps {
  animated?: boolean;
}

const BookCover: React.FC<BookCoverProps> = (props) => {
  const { animated = false } = props;

  return (
    <div
      className={classNames("book-cover", {
        animated,
      })}
    >
      <div className="book-cover-content"></div>
    </div>
  );
};

export default BookCover;
