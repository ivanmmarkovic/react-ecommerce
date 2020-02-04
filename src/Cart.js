import React, { Component } from "react";
import { render } from "react-dom";
import "./Cart.css";

const Cart = props => {
  let { cart, addToCart, removeWholeItem, removeOneItem } = props;
  let cartArray = [];
  cart.forEach(function(value, key, ownerMap) {
    cartArray.push(value);
  });
  let total = 0;
  let tmp = 0;
  let addToCartLocal = book => {
    addToCart(book);
  };
  let removeWholeItemLocal = book => {
    removeWholeItem(book);
  };
  let removeOneItemLocal = book => {
    removeOneItem(book);
  };
  return (
    <div className={"cart"}>
      <h1>Your shopping cart</h1>
      {cartArray.map(book => (
        <div key={book.id} className={"item"}>
        <img src={`${book.url}`} />
          <div class="item-data">
            <p>{book.title}</p>
            <span style={{ display: "none" }}>
              {(tmp = book.price * book.quantity)}
            </span>
            <p>
              <button onClick={() => removeOneItemLocal(book)}>-</button>
              <span>{book.quantity}</span>
              <button onClick={() => addToCartLocal(book)}>+</button>
              <button onClick={() => removeWholeItemLocal(book)}>x</button>
              <span style={{ display: "none" }}>
                {(total += book.price * book.quantity)}
              </span>
              <span>${tmp.toFixed(2)}</span>
            </p>
          </div>
        </div>
      ))}
      <div className={"total"}>
        <h3>Total : ${total.toFixed(2)}</h3>
        <button>Order</button>
      </div>
    </div>
  );
};

export default Cart;
