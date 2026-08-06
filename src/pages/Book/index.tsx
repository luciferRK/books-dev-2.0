import React from "react";
import "./Book.scss";
import type { Book as BookType } from "../../store/types";
import BookCover from "../../components/BookCover";
import SimilarBooks from "../../components/SimilarBooks";
import BookReview from "../../components/BookReview";
import {
  useAllBooks,
  useBook,
  useLoading,
  useGlobalActions,
  useIsMobileView,
} from "../../store/global/useGlobal";
import { useParams } from "react-router-dom";
import { and, isEmpty } from "uixtra/utils";

const Book: React.FC = () => {
	const { setBook } = useGlobalActions();
	const allBooks = useAllBooks();
	const loading = useLoading();
  const book = useBook();
  const isMobileView = useIsMobileView();
  const { bookName = "" } = useParams();
  const bookRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (isMobileView) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [isMobileView])

	React.useEffect(() => {
		if (and(!isEmpty(bookName), !loading, book.urlName !== bookName)) {
			setBook(allBooks.find((book) => book.urlName === bookName) as BookType);
		}
	}, [bookName, loading, book.urlName, allBooks, setBook]);

	return (
		<div className='book-page' ref={bookRef}>
			<BookCover />
			<BookReview />
			<SimilarBooks />
		</div>
	);
};

export default Book;
