import React from "react";
import type { Book } from "../../../context/types";
import { BOOK_COVER_PREFIX } from "../../../utils/constants";
import "./ChronicleBookItem.scss";
import { useNavigate } from "react-router-dom";
import useGlobalAction from "../../../context/actions/GlobalAction";

interface ChronicleBookItemProps {
  book: Book;
}

const ChronicleBookItem: React.FC<ChronicleBookItemProps> = (props) => {
  const { book } = props;
  const { setBook } = useGlobalAction();
  const navigate = useNavigate();

  return (
    <button className="chronicle-book-item" onClick={() => {
      setBook(book);
      navigate(book.urlName);
    }}>
      <div className="cover-image">
        <img src={`${BOOK_COVER_PREFIX}${book.image}`} alt={book.urlName} />
      </div>
      <div className="content">
        <div className="title">{book.name}</div>
        <div className="author">{book.author.name}</div>
      </div>
    </button>
  )
};

export default ChronicleBookItem;
