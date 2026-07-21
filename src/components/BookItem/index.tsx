import React from "react";
import "./BookItem.scss";
import type { Book } from "../../context/types";
import { BOOK_COVER_PREFIX } from "../../utils/constants";
import { Show } from "uixtra/components";
import Rating from "../Rating";

interface BookItemProps {
  book: Book;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  showRating?: boolean;
}

const BookItem: React.FC<BookItemProps> = (props) => {
  const { book, onClick, showRating = false } = props;
  return (
    <div className="book-item" onClick={onClick}>
      <div className="cover-image">
        <img
          loading="lazy"
          src={`${BOOK_COVER_PREFIX}${book.image}`}
          alt={book.name}
        />
      </div>
      <div className="author-name">{book.author.name}</div>
      <div className="title">{book.name}</div>
      <Show if={showRating}><Rating rating={book.rating} /></Show>
    </div>
  );
};

export default BookItem;
