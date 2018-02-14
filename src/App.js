import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as BookAPI from './utils/BookAPI';
import BookShelf from './components/BookShelf';
import Search from './components/Search';

class App extends Component {
  constructor(props) {
    super(props);
    // TODO: Update state to contain Library of books & shelves

    this.state = {
      library: {
        books: [],
        shelves: [],
      },
      // books: [],
      // shelves: [],
    };

    this.updateShelf = this.updateShelf.bind(this);
  }

  componentDidMount() {
    let library = {};
    BookAPI.getAll().then((books) => {
      let shelves = {};
      shelves = books.reduce((curr, next) => {
        shelves[next.id] = next.shelf;
        return shelves;
      }, shelves);
      library = {
        books,
        shelves,
      }
      this.setState({ library });
    }, (error) => {
      console.log(error); // eslint-disable-line no-console
    });

    // BookAPI.search('Tolstoy').then((books) => {
      // TODO: Possibly remove this to buildRecommendations and call that from here
      // let bookList = this.merge(this.state.books, books);
      // this.setState({ books: bookList });
    // })
  }

  // TODO: Remove this function
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
    // TODO: Clean this up
    let library = this.state.library;
    // check if book is in library
    if(library.shelves[book.id]) {
      library.shelves[book.id] = library.books.filter(obj => obj.id === book.id)[0].shelf = shelf;
    } else {
      library.shelves[book.id] = book;
      library.shelves[book.id] = library.books.filter(obj => obj.id === book.id).shelf = shelf;
      library.books.push(book);
    }
    this.setState({ library });
    BookAPI.update(book, shelf);
  };

  render() {
    return (
      <div className="App">
        <div className='title-bar'>
          <span>Title Bar | </span>
          <Link to='/search'>Search</Link>
        </div>
        <Route
          exact
          path='/'
          render={() => (
            <div className='bookshelves'>
              <BookShelf
                title='Currently Reading'
                shelf='currentlyReading'
                library={this.state.library}
                updateShelf={this.updateShelf}
              />
              <BookShelf
                title='Want To Read'
                shelf='wantToRead'
                library={this.state.library}
                updateShelf={this.updateShelf}
              />
              {/* <BookShelf title='Recommended' books={this.state.books.filter(book => (book.shelf !== 'read') && (book.shelf !== 'currentlyReading') && (book.shelf !== 'wantToRead') && book.averageRating > 4 )} updateShelf={this.updateShelf} /> */}
              <BookShelf
                title='Read'
                shelf='read'
                library={this.state.library}
                updateShelf={this.updateShelf}
              />
            </div>
          )}
        />
        <Route
          path='/search'
          render={() => <Search updateShelf={this.updateShelf} shelves={this.state.library.shelves} />}
        />
      </div>
    );
  }
}

export default App;
