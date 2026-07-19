import React from "react";
import useGlobalAction from "../../../context/actions/GlobalAction"
import "./GenreOptions.scss";

const GenreOptions: React.FC = () => {
  const { state } = useGlobalAction();
  const { genreInfo } = state;

  const uniqueGenres = React.useMemo(() => Object.keys(genreInfo), [genreInfo]);

  console.log(uniqueGenres);

  return <div className="genre-options">
    {uniqueGenres.map((genre) => (
      <button key={genre} className="option" onClick={() => { }}>{genre}</button>
    ))}
  </div>
};

export default GenreOptions;
