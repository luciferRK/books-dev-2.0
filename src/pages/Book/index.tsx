import React from "react";
import "./Book.scss";
import type { Book } from "../../context/types";
import BookCover from "../../components/BookCover";
import SimilarBooks from "../../components/SimilarBooks";
import BookReview from "../../components/BookReview";
import useGlobalAction from "../../context/actions/GlobalAction";
import { useParams } from "react-router-dom";
import { isEmpty } from "uixtra/utils";
import Loading from "../../components/Loading";

const Book: React.FC = () => {
  const { setBook, state } = useGlobalAction();
  const { bookName = "" } = useParams();

  React.useEffect(() => {
    if (!isEmpty(bookName)) {
      setBook(state.allBooks.find((book) => book.urlName === bookName) as Book);
    }
  }, [bookName]);

  return (
    <Loading isIt={state.loading}>
      <div className="book-page">
        <BookCover />
        <BookReview />
        <SimilarBooks />
      </div>
    </Loading>
  );
};

export default Book;
