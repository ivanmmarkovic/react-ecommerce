import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import "./Navigation.css";

const Navigation = props => {
  let { size, handleFilterChange, rotateBasket } = props;
  let handleLocalFilterChange = e => {
    handleFilterChange(e.target.value);
  };
  return (
    <nav>
      <Link to={"/"}>
        <h1>e</h1>
      </Link>
      <input type="text" onChange={handleLocalFilterChange} />
      <Link to={"/cart"} className={"basket-link"}>
        <span>
          <i className={rotateBasket ? "rotateBasket material-icons" : "material-icons"}>add_shopping_cart</i>
          <span>{size}</span>
        </span>
      </Link>
    </nav>
  );
};

export default Navigation;
