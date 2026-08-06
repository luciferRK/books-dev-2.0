import React from "react";
import { useBookForSpider } from "../../../store/home/useHome";
import "./ReaderDNA.scss";
import Spider from "../../Graph/Spider";
import { getProperty, ifElse } from "uixtra/utils";
import { useAllBooks, useGlobalActions } from "../../../store/global/useGlobal";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../../store/types";
import { SAMPLE_BOOK } from "../../../utils/constants";

const LITERARY_VALUE_KEYS = [
  {
    label: 'Plot',
    key: 'plot',
  },
  {
    label: 'Characters',
    key: 'characters'
  },
  {
    label: 'Pacing',
    key: 'pacing',
  },
  {
    label: 'Prose',
    key: 'prose',
  },
  {
    label: 'World',
    key: 'world',
  },
  {
    label: 'Emotion',
    key: 'emotion'
  }
];

const ReaderDNA: React.FC = () => {
  const navigate = useNavigate();
  const bookForSpider = useBookForSpider();
  const allBooks = useAllBooks();
  const { setBook } = useGlobalActions();

  const bookSpiderInfo = React.useMemo(() => {
    return LITERARY_VALUE_KEYS.map((item) => ({
      label: item.label,
      value: getProperty(bookForSpider, ['literaryValues', item.key], 0)
    }));
  }, [bookForSpider]);

  const mostExtremeInfo = React.useMemo<{
    darkest: Book,
    fastestPaced: Book,
    mostEmotional: Book,
    mostImmersiveWorld: Book,
  }>(() => {
    const readBooks = allBooks.filter((book) => book.category === 'read');
    return readBooks.reduce((prev, curr) => {
      console.log(prev);
      return {
        ...prev,
        darkest: ifElse(
          curr.literaryValues.dark > prev.darkest.literaryValues.dark,
          curr,
          prev.darkest
        ),
        fastestPaced: ifElse(
          curr.literaryValues.pacing > prev.fastestPaced.literaryValues.pacing,
          curr,
          prev.fastestPaced,
        ),
        mostImmersiveWorld: ifElse(
          curr.literaryValues.world > prev.mostImmersiveWorld.literaryValues.world,
          curr,
          prev.mostImmersiveWorld,
        ),
        mostEmotional: ifElse(
          curr.literaryValues.emotion > prev.mostEmotional.literaryValues.emotion,
          curr,
          prev.mostEmotional,
        )
      }
    }, {
      darkest: SAMPLE_BOOK,
      fastestPaced: SAMPLE_BOOK,
      mostImmersiveWorld: SAMPLE_BOOK,
      mostEmotional: SAMPLE_BOOK,
    });
  }, [allBooks])

  const goToBook = (book: Book) => {
    setBook(book);
    navigate(book.urlName);
  }

  return (
    <div className="reader-dna">
      <div className="heading">
        <span>Reader DNA</span>
        <h2>
          Medium-Fast Paced.
          Sci-Fi Reader.
        </h2>
      </div>
      <div className="content">
        <hr />
        {/*<Show if={!bookForSpider}>*/}
        <span className="select-book-message">Select a Book in the plot to see the info</span>
        {/*</Show>*/}
        <Spider data={bookSpiderInfo} />
        <hr />
        <div className="most-extreme">
          <div className="heading">My Most Extreme Books</div>
          <div className="list">
            <div className="item" key="darkest">
              <span>Darkest:</span>
              <button role="button" onClick={() => {
                goToBook(mostExtremeInfo.darkest)
              }}>{mostExtremeInfo.darkest.name}</button>
            </div>
            <div className="item" key="fastestPaced">
              <span>Fastest Paced:</span>
              <button role="button" onClick={() => {
                goToBook(mostExtremeInfo.fastestPaced)
              }}>{mostExtremeInfo.fastestPaced.name}</button>
            </div>
            <div className="item" key="mostEmotional">
              <span>Most Emotional:</span>
              <button role="button" onClick={() => {
                goToBook(mostExtremeInfo.mostEmotional)
              }}>{mostExtremeInfo.mostEmotional.name}</button>
            </div>
            <div className="item" key="mostImmersiveWorld">
              <span>Most Immersive World:</span>
              <button role="button" onClick={() => {
                goToBook(mostExtremeInfo.mostImmersiveWorld)
              }}>{mostExtremeInfo.mostImmersiveWorld.name}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ReaderDNA;
