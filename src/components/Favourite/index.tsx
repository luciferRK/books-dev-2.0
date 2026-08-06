import type React from "react";
import "./Favourite.scss";
import { useFavBook, useGlobalActions } from "../../store/global/useGlobal";
import { BOOK_COVER_PREFIX } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { BrushMaskButton } from "../ui/Button";

const Favourite: React.FC = () => {
  const favBook = useFavBook();
  const { setBook } = useGlobalActions();
  const navigate = useNavigate();

  const description = useMemo(
    () => favBook.description.slice(0, 2),
    [favBook.description]
  );

  return (
      <div className="favourite">
        <div className="top-section section">
          <div className="left heading">
            <div>One of my</div>
            <div>Favourites</div>
          </div>
          <div className="right cover-image">
            <img
              src={`${BOOK_COVER_PREFIX}${favBook.image}`}
              alt={favBook.name}
            />
          </div>
        </div>
        <div className="bottom-section section">
          <div className="bottom-section-content">
            <div className="left book-name">
              <div className="author-name">{favBook.author.name}</div>
              <div className="book-name">{favBook.name}</div>
              <BrushMaskButton
                className="read-review"
                labelClassName="read-review-label"
                onClick={() => {
                  setBook(favBook);
                  navigate(`/${favBook.urlName}`);
                }}
                label="Read Review"
              />
            </div>
            <div className="right book-description">
              {description.map((desc) => (
                <div className="each-description" key={desc}>
                  {desc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Favourite;
