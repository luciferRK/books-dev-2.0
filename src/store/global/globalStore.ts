import { create } from "zustand";
import { and, getProperty, ifElse } from "uixtra/utils";
import type { Book, GenreType, GlobalStore } from "../types";
import { SAMPLE_BOOK } from "../../utils/constants";
import { isMobileView } from "../../utils";

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  allBooks: [],
  loading: true,
  imagesLoading: true,
  pageState: "enter",
  book: SAMPLE_BOOK,
  favBook: SAMPLE_BOOK,
  isMobileView:  typeof window !== "undefined" && window.matchMedia
     ? window.matchMedia("(max-width:450px)").matches
     : false,
  genreInfo: {},

  setAllBooks: (allBooks) => set({ allBooks }),
  setLoading: (loading) => set({ loading }),
  setPageState: (pageState) => set({ pageState }),
  setImagesLoading: (imagesLoading) => set({ imagesLoading }),
  setBook: (book) => set({ book }),
  setFavBook: (favBook) => set({ favBook }),
  setMobileView: (isMobileView) => set({ isMobileView }),
  setGenreInfo: (genreInfo) => set({ genreInfo }),

  computeGenreInfo: (books = get().allBooks) => {
    const genreBuckets: Record<
      string,
      { books: Book[]; ratingSum: number; yearlyCount: Record<number, number> }
    > = {};

    const readBooks = books.filter((book) => book.category === "read");

    readBooks.forEach((book) => {
      book.genre.forEach((genre) => {
        if (!genreBuckets[genre]) {
          genreBuckets[genre] = {
            books: [],
            ratingSum: 0,
            yearlyCount: {},
          };
        }

        const genreBucket = genreBuckets[genre];

        genreBucket.books.push(book);
        genreBucket.ratingSum += book.rating;

        const year = new Date(book.dates.finished).getFullYear();
        if (!Number.isNaN(year)) {
          genreBucket.yearlyCount[year] =
            (genreBucket.yearlyCount[year] ?? 0) + 1;
        }
      });
    });

    const genreInfo: GenreType = {};

    Object.entries(genreBuckets).forEach(([genre, bucket]) => {
      let peakYear: number | null = null;
      let peakCount = 0;

      Object.entries(bucket.yearlyCount).forEach(([year, count]) => {
        if (count > peakCount) {
          peakCount = count;
          peakYear = Number(year);
        }
      });

      const count = bucket.books.length;

      genreInfo[genre] = {
        books: bucket.books,
        avgRating: Number(
          ifElse(Boolean(count), bucket.ratingSum / count, 0).toFixed(1),
        ),
        peakYear,
      };
    });

    set({ genreInfo });
  },

  getSimilarBooks: (book) => {
    const isMobile = isMobileView();
    const numberOfSimilarBooks: number = ifElse(isMobile, 4, 3);
    const { allBooks } = get();
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
  },

  getBooks: (homeSection = "all", genreName = "") => {
    const { allBooks, favBook, genreInfo } = get();
    switch (homeSection) {
      case "reviews":
        return allBooks
          .filter((book) =>
            and(
              book.urlName !== favBook.urlName,
              book.category !== "toread",
            ),
          )
          .sort((a, b) => a.name.localeCompare(b.name));
      case "genres":
        return getProperty(genreInfo, [genreName, "books"], []);
      default:
        return allBooks;
    }
  },
}));
