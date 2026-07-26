import React from "react";
import "./Chronicle.scss";
import useGlobalAction from "../../context/actions/GlobalAction";
import type { Book } from "../../context/types";
import YearItem from "./Year";

type ArrangedBooksByMonth = Record<string, Book[]>;
type ArrangedBooks = Record<string, ArrangedBooksByMonth>;
type BookWithFinishedTime = { book: Book; finishedTime: number };

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
] as const;

const ChronicleBookList: React.FC = () => {
  const { state } = useGlobalAction();

  const { yearsInDesc, arrangedBooks } = React.useMemo<{
    yearsInDesc: string[],
    arrangedBooks: ArrangedBooks
  }>(() => {
    const booksByYearAndMonth: Record<string, BookWithFinishedTime[][]> = {};

    for (const book of state.allBooks) {
      if (book.category !== "read") {
        continue;
      }

      const finishedDate = new Date(book.dates.finished);
      const finishedTime = finishedDate.getTime();

      if (Number.isNaN(finishedTime)) {
        continue;
      }

      const year = String(finishedDate.getFullYear());
      const monthIndex = finishedDate.getMonth();

      if (!booksByYearAndMonth[year]) {
        booksByYearAndMonth[year] = Array.from(
          { length: MONTH_NAMES.length },
          () => [] as BookWithFinishedTime[],
        );
      }
      booksByYearAndMonth[year][monthIndex].push({ book, finishedTime });
    }

    const yearsInDescendingOrder = Object.keys(booksByYearAndMonth).sort(
      (a, b) => Number(b) - Number(a),
    );

    const sortedArrangedBooks: ArrangedBooks = {};

    for (const year of yearsInDescendingOrder) {
      const arrangedBooksByMonth: ArrangedBooksByMonth = {};
      const monthBuckets = booksByYearAndMonth[year];

      for (let monthIndex = MONTH_NAMES.length - 1; monthIndex >= 0; monthIndex--) {
        const booksInMonth = monthBuckets[monthIndex];

        if (booksInMonth.length === 0) {
          continue;
        }

        booksInMonth.sort((a, b) => b.finishedTime - a.finishedTime);
        arrangedBooksByMonth[MONTH_NAMES[monthIndex]] = booksInMonth.map(
          ({ book }) => book,
        );
      }
      sortedArrangedBooks[year] = arrangedBooksByMonth;
    }

    return {
      yearsInDesc: yearsInDescendingOrder,
      arrangedBooks: sortedArrangedBooks
    };
  }, [state.allBooks]);

  return (
    <div className="chronicle home-scroll-section">
      <div
        className="chronicle-book-list home-scroll-content"
      >
        {yearsInDesc.map((year) => (
          <YearItem
            year={year}
            content={arrangedBooks[year]}
            key={year}
          />
        ))}
      </div>
    </div>
  );
};

export default ChronicleBookList;
