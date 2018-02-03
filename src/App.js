import React, { Component } from 'react';
import './App.css';
import * as BookAPI from './utils/BookAPI';
import BookShelf from './components/BookShelf';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };

    this.updateShelf = this.updateShelf.bind(this);
  }

  componentDidMount() {
    BookAPI.getAll().then((books) => {
      this.setState({ books });
    }, (error) => {
      console.log(error); // eslint-disable-line
    });

    BookAPI.search('Tolstoy').then((books) => {
      // TODO: Possibly remove this to buildRecommendations and call that from here
      let bookList = this.merge(this.state.books, books);
      this.setState({ books: bookList });
    })
  }

  componentWillUpdate() {
  }

  // TODO: There has to be a better method for doing this, possibly array().reduce
  merge = (old, updated) => {
    var object = {};

    updated.forEach(v => object[v.id] = v);
    old.forEach(v => object[v.id] = v);

    var array = [];

    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        array.push(object[key]);
      }
    }
    
    return array;
  }

  buildRecommendations = () => {
    // TODO: Function to build an array of recommendations
  }

  updateShelf = (book, shelf) => {
    const books = this.state.books.filter(obj => obj.id !== book.id);
    book.shelf = shelf;

    // TODO: Push update to BookAPI
    BookAPI.update(book, shelf);

    this.setState({
      books: [...books, book],
    });
  }

  render() {
    return (
      <div className="App">
        <BookShelf title='Currently Reading' books={this.state.books.filter(book => book.shelf === 'currentlyReading')} updateShelf={this.updateShelf} />
        <BookShelf title='Want To Read' books={this.state.books.filter(book => book.shelf === 'wantToRead')} updateShelf={this.updateShelf} />
        <BookShelf title='Recommended' books={ this.state.books.filter(book => (book.shelf !== 'read') && (book.shelf !== 'currentlyReading') && (book.shelf !== 'wantToRead') && book.averageRating > 4 )} updateShelf={this.updateShelf} />
        <BookShelf title='Read' books={this.state.books.filter(book => book.shelf === 'read')} updateShelf={this.updateShelf} />
      </div>
    );
  }
}

export default App;
