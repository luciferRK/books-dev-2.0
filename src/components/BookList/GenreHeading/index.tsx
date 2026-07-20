import React from "react";
import useGlobalAction from "../../../context/actions/GlobalAction"
import "./GenreHeading.scss";
import useHomeAction from "../../../context/actions/HomeAction";
import { classNames, getProperty } from "uixtra/utils";

const GenreHeading: React.FC = () => {
  const { state } = useGlobalAction();
  const { homeState, setActiveGenre } = useHomeAction();
  const { genreInfo } = state;
  const { activeGenre } = homeState;

  const uniqueGenres = React.useMemo(() => Object.keys(genreInfo), [genreInfo]);

  React.useEffect(() => {
    if (activeGenre === '') {
      setActiveGenre(uniqueGenres[0]);
    }
  }, [uniqueGenres, activeGenre, setActiveGenre])

  console.log(genreInfo, activeGenre, genreInfo[activeGenre])

  return (
    <div className="genre-heading">
      <div className="genre-options">
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
      <div className="selected-genre">
        <span className="column" />
        <div className="content">
          <h2>{activeGenre}</h2>
          <span>{getProperty(genreInfo, [activeGenre, 'books', 'length'], 0)} books</span>
        </div>
      </div>
    </div>
  )
};

export default GenreHeading;
