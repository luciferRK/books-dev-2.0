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
            {book.description.map((desc) => (
              <div className="description-item" key={desc}>
                {desc}
              </div>
            ))}
            {book.description.map((desc) => (
              <div className="description-item" key={desc}>
                {desc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCover;
