import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import './Book.css';

const Book = props => {
  let { book, addToCart } = props;
  let addBook = book => {
    addToCart(book);
  };
  return (
    <div className={"book-page"}>
      <div className={"details"}>
        <img src={`${book.url}`} />
        <div className={"details-child"}>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          <div className={"price-wrapper"}>
            <em>${book.price}</em>
            {book.available ? (
              <button onClick={() => addBook(book)}>+</button>
            ) : (
              <em>Not available :(</em>
            )}
          </div>
        </div>
      </div>
      <div className={"description"}>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default Book;
