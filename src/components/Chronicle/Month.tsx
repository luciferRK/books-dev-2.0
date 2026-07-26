import React from "react";
import type { Book } from "../../context/types";
import ChronicleBookItem from "./ChronicleBookItem";
import { classNames } from "uixtra/utils";

interface MonthItemProps {
  year: string;
  month: string;
  books: Book[]
}

const MonthItem: React.FC<MonthItemProps> = (props) => {
  const { year, month, books } = props;
  const [randomSelection] = React.useState(Math.floor((Math.random() * 16) / 4));

  const monthBackgroundClass: { [key: number]: string } = {
    0: 'cyan',
    1: 'rust',
    2: 'frost',
    3: 'red',
  };

  return (
    <div className="month-item">
      <div className={classNames(
        "month",
        monthBackgroundClass[randomSelection]
      )}>
        {month.toUpperCase()}&nbsp;`{year.substring(2)}
      </div>
      <div className={classNames(
        "books",
        monthBackgroundClass[randomSelection]
      )}>
        {books.map((book) => (
          <ChronicleBookItem
            book={book}
            key={book.urlName}
          />
        ))}
      </div>
    </div>
  );
}

export default MonthItem;
