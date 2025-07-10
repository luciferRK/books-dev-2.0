import React, { useMemo } from "react";
import "./BookCover.scss";
import { classNames, ifElse, isEmpty } from "uixtra/utils";
import useGlobalAction from "../../context/actions/GlobalAction";
import { BOOK_COVER_PREFIX } from "../../utils/constants";
import InstaIcon from "../Icon/Insta";
import { Show } from "uixtra/components";
import TwitterIcon from "../Icon/Twitter";
import { AmazonAudibleIcon, AmazonIcon } from "../Icon/Amazon";

interface BookCoverProps {
  animated?: boolean;
}

const BookCover: React.FC<BookCoverProps> = (props) => {
  const { animated = false } = props;
  const { state } = useGlobalAction();
  const { book } = state;

  const getDescriptionColumns: Array<Array<string>> = useMemo(() => {
    if (book.description.length === 2) {
      return book.description.map((item) => [item]);
    }
    // Flatten all descriptions into a single array
    const flat = book.description.flat();
    // Split into at most 2 columns, each with at most 2 items
    const col1 = flat.slice(0, 2);
    const col2 = flat.slice(2, 4);
    return [col1, col2].filter((col) => col.length > 0);
  }, [book.description]);

  const lastRead = useMemo(() => {
    if (book.dates.finished) {
      const date = Date.parse(book.dates.finished);
      const today = Date.now();
      const differenceInMilliseconds = today - date;
      const differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24),
      );

      if (differenceInDays < 30) {
        return `${differenceInDays} day${ifElse(differenceInDays > 1, "s", "")} ago`;
      }

      const differenceInMonths = Math.floor(differenceInDays / 30);
      if (differenceInMonths < 12) {
        return `${differenceInMonths} month${ifElse(differenceInMonths > 1, "s", "")} ago`;
      }

      const differenceInYears = Math.floor(differenceInMonths / 12);
      return `${differenceInYears} year${ifElse(differenceInYears > 1, "s", "")} ago`;
    }
    return "Never";
  }, [book.dates.finished]);

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
            <div className="column space-between">
              <div className="column">
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
                <div className="read detail-section">
                  <div className="heading">Last Read</div>
                  <div className="list">
                    <span className="item">{lastRead}</span>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="buy detail-section">
                  <div className="heading">Buy it here</div>
                  <div className="row">
                    <Show if={!isEmpty(book.buyLinks.amazon)}>
                      <div className="item icon">
                        <AmazonIcon
                          className="buy-icon"
                          onClick={() => {
                            window.open(book.buyLinks.amazon, "_blank");
                          }}
                        />
                      </div>
                    </Show>
                    <Show if={!isEmpty(book.buyLinks.amazonAudio)}>
                      <div className="item icon">
                        <AmazonAudibleIcon
                          className="buy-icon"
                          onClick={() => {
                            window.open(book.buyLinks.amazonAudio, "_blank");
                          }}
                        />
                      </div>
                    </Show>
                  </div>
                </div>
              </div>
            </div>
            <div className="column space-between">
              <div className="column">
                <div className="author detail-section">
                  <div className="heading">Author</div>
                  <div className="list">
                    <div className="item">{book.author.name}</div>
                    <div className="row">
                      <Show if={!isEmpty(book.author.instagram)}>
                        <div className="item icon">
                          <InstaIcon
                            className="social-icon"
                            onClick={() => {
                              window.open(book.author.instagram, "_blank");
                            }}
                          />
                        </div>
                      </Show>
                      <Show if={!isEmpty(book.author.twitter)}>
                        <div className="item icon">
                          <TwitterIcon
                            className="social-icon"
                            onClick={() => {
                              window.open(book.author.twitter, "_blank");
                            }}
                          />
                        </div>
                      </Show>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="name-and-description">
          <div className="author-name">{book.author.name}</div>
          <div className="book-name">{book.name}</div>
          <div className="description-list">
            {getDescriptionColumns.map((column) => (
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
