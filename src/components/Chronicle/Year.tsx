import React from "react";
import type { Book } from "../../context/types";
import MonthItem from "./Month";

interface YearItemProps {
  year: string;
  content: {
    [key: string]: Book[]
  }
}

const YearItem: React.FC<YearItemProps> = (props) => {
  const { year, content } = props;

  return <div className="year-item">
    <div className="heading">
      <span>{year}</span>
      <hr />
    </div>
    <div className="months">
      {Object.keys(content).map((month) => (
        <MonthItem
          key={`${year}-${month}`}
          year={year}
          month={month}
          books={content[month]}
        />
      ))}
    </div>
  </div>
};

export default YearItem;
