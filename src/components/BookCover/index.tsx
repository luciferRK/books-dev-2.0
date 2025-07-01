import React from "react";
import "./BookCover.scss";
import { classNames } from "uixtra/utils";
import useGlobalAction from "../../context/actions/GlobalAction";
import { BOOK_COVER_PREFIX } from "../../utils/constants";

interface BookCoverProps {
  animated?: boolean;
}

const BookCover: React.FC<BookCoverProps> = (props) => {
  const { animated = false } = props;
  const { state } = useGlobalAction();
  const { book } = state;

  const getDescriptionColumns = (): Array<Array<string>> => {
    if (book.description.length === 2) {
      return book.description.map((item) => [item]);
    }
    // Flatten all descriptions into a single array
    const flat = book.description.flat();
    // Split into at most 2 columns, each with at most 2 items
    const col1 = flat.slice(0, 2);
    const col2 = flat.slice(2, 4);
    return [col1, col2].filter(col => col.length > 0);
  };

  return (
    <div
      className={classNames("book-cover", {
        animated,
      })}
    >
      <div className="book-cover-content">
        <div className="image-and-details">
          <div className="cover-image">
            <img src={`${BOOK_COVER_PREFIX}${book.image}`} alt={book.name} />
          </div>
          <div className="details">
            <div className="genre detail-section">
              <div className="heading">Genres</div>
              <div className="list">
                {book.genre.map((genre) => (
                  <span key={genre} className="item">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className="genre detail-section">
              <div className="heading">Genres</div>
              <div className="list">
                {book.genre.map((genre) => (
                  <span key={genre} className="item">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="name-and-description">
          <div className="author-name">{book.author.name}</div>
          <div className="book-name">{book.name}</div>
          <div className="description-list">
            {getDescriptionColumns().map((column) => (
              <div
                className="description-column"
                key={column[0] + new Date().getTime()}
              >
                {column.map((desc) => (
                  <div className="description-item" key={desc}>
                    {desc}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCover;
