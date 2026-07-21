import React from "react";
import useGlobalAction from "../../../context/actions/GlobalAction"
import "./GenreHeading.scss";
import useHomeAction from "../../../context/actions/HomeAction";
import { classNames, getProperty, ifElse } from "uixtra/utils";

const GENRE_SECTION_SCROLL_VALUE = 300;

const GenreHeading = React.forwardRef<HTMLDivElement >((_, ref) => {
  const { state } = useGlobalAction();
  const { homeState, setActiveGenre } = useHomeAction();
  const { genreInfo } = state;
  const { activeGenre } = homeState;

  const optionsRef = React.useRef<HTMLDivElement>(null);

  const scrollOptions = (dir: "left" | "right") => {
    optionsRef.current?.scrollBy({
      left: ifElse(dir === "left" , -GENRE_SECTION_SCROLL_VALUE , GENRE_SECTION_SCROLL_VALUE),
      behavior: "smooth",
    })
  }

  const uniqueGenres = React.useMemo(() => Object.keys(genreInfo), [genreInfo]);

  React.useEffect(() => {
    if (activeGenre === '') {
      setActiveGenre(uniqueGenres[0]);
    }
  }, [uniqueGenres, activeGenre, setActiveGenre])


  return (
    <div className="genre-heading" ref={ref}>
      <div className="genre-options-row">
        <button
          type="button"
          className="scroll-arrow left"
          onClick={() => scrollOptions('left')}
          aria-label="Scroll genres left">
          &lt;
        </button>
        <div className="genre-options" ref={optionsRef}>
          {uniqueGenres.map((genre) => (
            <button key={genre} className={classNames("option", {
              "selected": activeGenre === genre
            })} onClick={(e) => {
              e.preventDefault();
              if (activeGenre !== genre) {
                setActiveGenre(genre);
              }
            }}>{genre}</button>
          ))}
        </div>
        <button
          type="button"
          className='scroll-arrow right'
          onClick={() => scrollOptions('right')}
          aria-label="Scroll genres right"
        >
          &gt;
        </button>
      </div>
      <div className="selected-genre">
        <span className="column" />
        <div className="content">
          <h2>{activeGenre}</h2>
          <span>{getProperty(genreInfo, [activeGenre, 'books', 'length'], 0)} books</span>
        </div>
      </div>
    </div>
  )
});

export default GenreHeading;
