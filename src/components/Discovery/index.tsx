import React from "react";
import "./Discovery.scss";
import Plot, { type PlotPoint } from "../Graph/Plot";
import { useAllBooks, useGenreInfo, useIsMobileView } from "../../store/global/useGlobal";
import Rating from "../Rating";
import { getProperty, ifElse, or } from "uixtra/utils";
import type { Book } from "../../store/types";
import { useHomeActions } from "../../store/home/useHome";
import ProgressBar from "../ProgressBar";
import { COLORS } from "../../utils/constants";

const PLOT_COLORS = [
  // Rust / orange family (from $primary)
  "#BC4021", "#D14522", "#E2673C", "#E8894B", "#C9622E", "#F0A05A",
  // Red / vermillion family (from $vermillionRed)
  "#CC4D4D", "#E24B4A", "#B83A3A", "#E86A6A",
  // Pink / magenta accents
  "#D4537E", "#C25E9C", "#E07AA5",
  // Teal / cyan family (from $secondary)
  "#188C8C", "#22A6A6", "#3FBFB0", "#2C8C7A", "#5FD1C4",
  // Bluebell / purple family (from $bluebellFrost)
  "#9999CC", "#7F77DD", "#6C63B5", "#534AB7", "#B0A6E0",
  // Gold / amber (warm complement)
  "#FAC775", "#E5B25D", "#D9A441",
  // Green (fresh complement)
  "#639922", "#6FB03A", "#4B8C57", "#8CC152",
  // Blue (cool complement)
  "#4A90C2", "#5AA9D6",
] as const;

const Discovery: React.FC = () => {
  const allBooks = useAllBooks();
  const genreInfo = useGenreInfo();
  const isMobileView = useIsMobileView();
  const { setBookForSpider } = useHomeActions();

  const plotRef = React.useRef<HTMLDivElement>(null);

  const [selectedPlot, setSelectedPlot] = React.useState<string | undefined>();
  const [selectedGenre, setSelectedGenre] = React.useState<string>('all');

  const handleSelectedPlotClick = (point: PlotPoint) => {
    const selectedBook = allBooks.find((book) => book.urlName === point.id);
    setBookForSpider(selectedBook!);
    setSelectedPlot(point.id);
  }

  const plotTransformedData = React.useMemo(() => ifElse(
    selectedGenre === 'all',
    allBooks.filter(
      (book) => book.category === 'read'
    ),
    getProperty(genreInfo, [selectedGenre, 'books'], [])
  ).map((book: Book) => ({
    id: book.urlName,
    label: <>
      <div className='title'>{book.name}</div>
      <Rating rating={book.rating} />
    </>,
    top: book.literaryValues.action,
    right: book.literaryValues.light,
    bottom: book.literaryValues.contemplative,
    left: book.literaryValues.dark,
    color: PLOT_COLORS[Math.floor(Math.random() * PLOT_COLORS.length)],
  })), [allBooks, selectedGenre, genreInfo]);

  const { totalReadBooks, top5Genre } = React.useMemo(
    () => {
      const totalReadBooks = allBooks.filter((book) => book.category === 'read').length;
      return {
        totalReadBooks,
        top5Genre: Object.entries(genreInfo)
          .map(([genre, info]) => ({
            genre,
            percent: Math.floor((info.books.length / totalReadBooks) * 100)
          }))
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 5),
      };
    },
    [genreInfo, allBooks],
  );

  const ratingData = React.useMemo(
    () =>
      Object.entries(
        allBooks
          .filter((book) => book.category === "read")
          .reduce(
            (prev: Record<number, number>, curr) => ({
              ...prev,
              [curr.rating]: or(prev[curr.rating], 0) + 1,
            }),
            {},
          )
      )
        .map((item) => [Number(item[0]), Number(item[1])])
        .sort((a, b) => b[0] - a[0]),
    [allBooks],
  );

  return (
    <div className='discovery home-scroll-section'>
      <div className="discovery-content home-scroll-content">
        <div className="dna-section">
          <section className="genre">
            <div className="sub-heading">Genre Distribution</div>
            {top5Genre.map((item) => (
              <div className="item">
                <span>{item.genre}</span>
                <ProgressBar value={item.percent} color={COLORS.secondary} />
                <span>{item.percent}%</span>
              </div>
            ))}
          </section>
          <section className="rating-section">
            <div className="sub-heading">Rating Distribution</div>
            {ratingData.map((item) => (
              <div className="item">
                <Rating rating={item[0]} />
                <ProgressBar
                  value={item[1]}
                  color={COLORS.primary}
                  max={totalReadBooks}
                />
                <span>{item[1]}</span>
              </div>
            ))}
          </section>
        </div>
        <hr />
        <div className="graph-section">
          <div className="heading-section">
            <div className="heading">
              Every book I've read, charted. Click on it to see more details
            </div>
            <div className="genre-dropdown-section">
              Genre:&nbsp;
              <select
                name="genre-dropdown"
                className="genre-dropdown"
                onChange={(e) => {
                  setSelectedGenre(e.target.value);
                  if (!isMobileView) {
                    plotRef.current?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }
                }}
                value={selectedGenre}
              >
                <option value="all">All</option>
                {Object.keys(genreInfo).map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Plot
            ref={plotRef}
            className="axis-plot-4"
            axisLabels={{
              top: "Action",
              bottom: "Contemplative",
              left: "Dark",
              right: "Light",
            }}
            points={plotTransformedData}
            selectedId={selectedPlot}
            onPointClick={handleSelectedPlotClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Discovery;
