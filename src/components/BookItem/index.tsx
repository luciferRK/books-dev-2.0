import React from "react";
import "./BookItem.scss";
import type { Book } from "../../context/types";
import { BOOK_COVER_PREFIX } from "../../utils/constants";

interface BookItemProps {
  book: Book;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const BookItem: React.FC<BookItemProps> = (props) => {
  const { book, onClick } = props;
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
    </div>
  );
};

export default BookItem;
