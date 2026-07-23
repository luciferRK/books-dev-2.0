import { useCallback, useContext, useEffect } from "react";
import type { Book, ExpandedMenuOptionValue, GenreType } from "../types";
import { and, getProperty, ifElse, or } from "uixtra/utils";
import { SAMPLE_BOOK } from "../../utils/constants";
import { getRandomInclusive, isMobileView } from "../../utils";
import { GlobalContext } from "../contexts";

const useGlobalAction = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const setAllBooks = (books: any[]) => {
    dispatch({ type: "SET_ALL_BOOKS", payload: books });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setPageState = (pageState: "enter" | "exit" | "idle") => {
    dispatch({ type: "SET_PAGE_STATE", payload: pageState });
  };

  const setImagesLoading = (loading: boolean) => {
    dispatch({ type: "SET_IMAGES_LOADING", payload: loading });
  };

  const setBook = (book: Book) => {
    dispatch({ type: "SET_BOOK", payload: book });
  };

  const setFavBook = (book: Book) => {
    dispatch({ type: "SET_FAV_BOOK", payload: book });
  };

  const setMobileView = (value: boolean) => {
    dispatch({ type: "SET_MOBILE_VIEW", payload: value });
  };

  const setGenreInfo = (value: GenreType) => {
    dispatch({ type: "SET_GENRE_INFO", payload: value });
  }

  const getSimilarBooks = (book: Book): Array<Book> => {
    const isMobile = isMobileView();
    const numberOfSimilarBooks: number = ifElse(isMobile, 4, 3);
    const { allBooks } = state;
    const { genre, urlName } = book;
    const genreLowerCase: { [key: string]: boolean } = genre.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: true,
      }),
      {},
    );
    const hadGenre = (eachGenre: string) => {
      return genreLowerCase[eachGenre.toLowerCase()];
    };
    const booksWithSimilarGenre = allBooks.filter(
      (book) =>
        book.urlName != urlName &&
        book.category === "read" &&
        book.genre.some(hadGenre),
    );
    const suggestedBooksWithSimilarGenre = booksWithSimilarGenre.length;
    if (suggestedBooksWithSimilarGenre < numberOfSimilarBooks) {
      const similarBookNames: Array<string> = booksWithSimilarGenre.map(
        (book) => book.urlName,
      );
      let remaining = numberOfSimilarBooks - suggestedBooksWithSimilarGenre;
      const readBooks: Array<Book> = allBooks.filter(
        (book) => book.urlName != urlName && book.category == "read",
      );
      const totalReadBooks = readBooks.length;
      while (remaining > 0) {
        const randomBook: Book =
          readBooks[Math.floor(Math.random() * totalReadBooks)];
        if (!similarBookNames.includes(randomBook.urlName)) {
          similarBookNames.push(randomBook.urlName);
          booksWithSimilarGenre.push(randomBook);
          remaining--;
        }
      }
    } else if (suggestedBooksWithSimilarGenre > numberOfSimilarBooks) {
      const totalSuggestedBooks: number = booksWithSimilarGenre.length;
      const numbers: Array<number> = [];
      let count = 0;
      while (count < numberOfSimilarBooks) {
        const randomNumber = Math.floor(Math.random() * totalSuggestedBooks);
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
          count++;
        }
      }
      const filteredBooks: Array<Book> = numbers.map(
        (index) => booksWithSimilarGenre[index],
      );

      return filteredBooks;
    }

    return booksWithSimilarGenre;
  };

  const getOrSetGenreInfo = (books: Book[] = state.allBooks) => {
    const genreBuckets: Record<
      string,
      { books: Book[]; ratingSum: number; yearlyCount: Record<number, number> }
      > = {}

    const readBooks = books.filter((book) => book.category === 'read');

    readBooks.forEach((book) => {
      book.genre.forEach((genre) => {
        if (!genreBuckets[genre]) {
          genreBuckets[genre] = {
            books: [], ratingSum: 0, yearlyCount: {},
          }
        }

        const genreBucket = genreBuckets[genre];

        genreBucket.books.push(book);
        genreBucket.ratingSum += book.rating;

        const year = new Date(book.dates.finished).getFullYear();
        if (!Number.isNaN(year)) {
          genreBucket.yearlyCount[year] = (genreBucket.yearlyCount[year] ?? 0) + 1;
        }
      })
    })

    const genreInfo: GenreType = {};

    Object.entries(genreBuckets).forEach(([genre, bucket]) => {
      let peakYear = null;
      let peakCount = 0;

      Object.entries(bucket.yearlyCount).forEach(([year, count]) => {
        if (count > peakCount) {
          peakCount = count;
          peakYear = Number(year);
        }
      })

      const count = bucket.books.length;

      genreInfo[genre] = {
        books: bucket.books,
        avgRating: Number((ifElse(Boolean(count), bucket.ratingSum / count, 0)).toFixed(1)),
        peakYear,
      }
    })

    setGenreInfo(genreInfo);
  }

  const getBooks = useCallback((homeSections: ExpandedMenuOptionValue | 'all' = 'all', genreName: string = '') => {
    switch (homeSections) {
      case 'reviews':
        return state.allBooks
          .filter((book) =>
            and(book.urlName !== state.favBook.urlName, book.category !== 'toread')
          )
          .sort((a, b) => a.name.localeCompare(b.name));
      case 'genres':
        return getProperty(state.genreInfo, [genreName, 'books'], []);
      default:
        return state.allBooks;
    }
  }, [state.allBooks, state.favBook.urlName, state.genreInfo]);

  useEffect(() => {
    if (state.allBooks.length === 0) {
      setLoading(true);
      fetch("/assets/files/books.json")
        .then((res) => res.json())
        .then((data) => {
          const allBooksFromJson = getProperty(
            data,
            ["allBooks"],
            [],
          ) as Book[];
          const allFavs = getProperty(data, ["favs"], []);
          const numberOfFavs = allFavs.length;
          const oneOfTheFav = getProperty(data, ["favs"], [])[
            getRandomInclusive(0, numberOfFavs - 1)
          ];
          setFavBook(
            or(
              allBooksFromJson.filter(
                (item: any) => item.urlName === oneOfTheFav,
              )[0],
              SAMPLE_BOOK,
            ),
          );
          setAllBooks(getProperty(data, ["allBooks"], []));
          getOrSetGenreInfo(getProperty(data, ["allBooks"], []));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setLoading(false);
    }
  }, [state.allBooks]);

  return {
    state,
    setAllBooks,
    setLoading,
    setPageState,
    setImagesLoading,
    setBook,
    getSimilarBooks,
    setMobileView,
    getBooks,
  };
};

export default useGlobalAction;
