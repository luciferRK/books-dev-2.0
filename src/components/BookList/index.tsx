import React from "react";
import "./BookList.scss";
import { Link } from "react-router-dom";

interface BookListProps {}

const BookList: React.FC<BookListProps> = () => {
  return (
    <div className="book-list">
      <div className="book-list-content">
        <Link to="/sample">Go To Book</Link>
        <div className="book"></div>
        <div className="book"></div>
        <div className="book"></div>
        <div className="book"></div>
        <div className="book"></div>
        <div className="book"></div>
        <div className="book"></div>
        <div className="book"></div>
        <div className="book"></div>
        <div className="book"></div>
        <div className="book"></div>
        <div className="book"></div>
      </div>
    </div>
  );
};

export default BookList;
