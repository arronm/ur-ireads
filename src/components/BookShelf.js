import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateShelf: PropTypes.func.isRequired,
  }

  componentWillMount() {
  }

  render() {
    let shelf = null;

    if (this.props.books.length > 0) {
      shelf = (
        this.props.books.map((book) => (
          <Book book={book} key={book.id} updateShelf={this.props.updateShelf} />
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
