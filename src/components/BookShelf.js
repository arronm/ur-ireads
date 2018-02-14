import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateShelf: PropTypes.func.isRequired,
  }

  componentDidMount() {
  }

  render() {
    let shelf = null;

    if (this.props.library.books.filter(book => this.props.library.shelves[book.id] === this.props.shelf).length > 0) {
      shelf = (
        this.props.library.books.filter(book => this.props.library.shelves[book.id] === this.props.shelf).map((book) => (
          <Book book={book} key={book.id} updateShelf={this.props.updateShelf} shelf={this.props.library.shelves[book.id]} />
        ))
      );
    } else {
      shelf = (
        <span>You don{'\''}t appear to have any books in {this.props.title}</span>
      )
    }

    return (
      <div>
        <div className='shelf'>
          <h2 className='shelf-title'>{this.props.title}</h2>
          {shelf}
        </div>
      </div>
    )
  }
}

export default BookShelf;
