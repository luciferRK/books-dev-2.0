import React from "react";
import "./Book.scss";
import type { Book as BookType } from "../../context/types";
import BookCover from "../../components/BookCover";
import SimilarBooks from "../../components/SimilarBooks";
import BookReview from "../../components/BookReview";
import useGlobalAction from "../../context/actions/GlobalAction";
import { useParams } from "react-router-dom";
import { and, isEmpty } from "uixtra/utils";
import Loading from "../../components/Loading";

const Book: React.FC = () => {
	const { setBook, state } = useGlobalAction();
	const { allBooks, loading } = state;
	const { bookName = "" } = useParams();

	React.useEffect(() => {
		if (and(!isEmpty(bookName), !loading)) {
			setBook(allBooks.find((book) => book.urlName === bookName) as BookType);
		}
	}, [bookName, loading]);

	return (
		<Loading isIt={loading}>
			<div className='book-page'>
				<BookCover />
				<BookReview />
				<SimilarBooks />
			</div>
		</Loading>
	);
};

export default Book;
