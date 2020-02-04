import React, { Component } from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './Navigation';
import Books from './Books';
import Book from './Book';
import Cart from './Cart';
import './style.css';

import books from './books'


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      books: books,
      cart: new Map(),
      filter: "",
      rotateBasket: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.removeWholeItem = this.removeWholeItem.bind(this);
    this.removeOneItem = this.removeOneItem.bind(this);
  }
  addToCart(book){
    let {cart} = this.state;
    if(cart.has(book.id)){
      cart.set(book.id, Object.assign({}, book, {quantity: cart.get(book.id).quantity + 1}))
    }
    else{
      cart.set(book.id, Object.assign({}, book, {quantity: 1}))
    }
    this.setState({cart, rotateBasket: true});
    setTimeout(() => this.setState({
      rotateBasket: false
    }), 2000);
  }
  removeOneItem(book){
    let {cart} = this.state;
    if(cart.get(book.id).quantity == 1){
      this.removeWholeItem(book);
    }
    else{
      cart.set(book.id, Object.assign({}, book, {quantity: cart.get(book.id).quantity - 1}))
    }
    this.setState({cart});
  }
  removeWholeItem(book){
    let {cart} = this.state;
    cart.delete(book.id);
    this.setState({cart});
  }
  handleFilterChange(filterContent){
    this.setState({
      filter: filterContent
    })
  }
  render() {
    let {books, name, cart, filter, rotateBasket} = this.state;
    let size = 0;
    cart.forEach((value, key, ownerMap) => {
      size += value.quantity;
    });
    return (
      <div>
        <Navigation size={size} handleFilterChange={this.handleFilterChange} rotateBasket={rotateBasket} />
        
        <Route path="/" exact={true} render={() => <Books books={books} addToCart={this.addToCart} filter={filter}/>} />

        <Route path="/books/:id" render={(props) => 
          <Book book={books.find(b => b.id == props.match.params.id)} 
          addToCart={this.addToCart} /> }
        />
        
        <Route path="/cart" render={() => <Cart cart={cart} addToCart={this.addToCart} 
        removeOneItem={this.removeOneItem} removeWholeItem={this.removeWholeItem}/>} />
      </div>
    );
  }
}

render(
  <Router>
    <App />
  </Router>, 
  document.getElementById('root')
);
