import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as BookAPI from './utils/BookAPI';
import BookShelf from './components/BookShelf';
import Search from './components/Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      library: {
        books: [],
        shelves: {},
      },
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
  }

  updateShelf = (book, shelf) => {
    let library = this.state.library;
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
        <Route
          exact
          path='/'
          render={() => (
            <div className='list-books'>
              <div className='list-books-title'>
                <h1>iReads</h1>
              </div>
              <Link to='/search' className='open-search'>Search</Link>
              <div className='bookshelves'>
                <BookShelf
                  title='Currently Reading'
                  shelves={this.state.library.shelves}
                  books={this.state.library.books.filter(book => this.state.library.shelves[book.id] === 'currentlyReading')}
                  updateShelf={this.updateShelf}
                  />
                <BookShelf
                  title='Want To Read'
                  shelves={this.state.library.shelves}
                  books={this.state.library.books.filter(book => this.state.library.shelves[book.id] === 'wantToRead')}
                  updateShelf={this.updateShelf}
                  />
                <BookShelf
                  title='Read'
                  shelves={this.state.library.shelves}
                  books={this.state.library.books.filter(book => this.state.library.shelves[book.id] === 'read')}
                  updateShelf={this.updateShelf}
                  />
              </div>
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
