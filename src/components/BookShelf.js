import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateShelf: PropTypes.func.isRequired,
    shelves: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  componentDidMount() {
  }

  render() {
    let shelf = null;

    if (this.props.books.length > 0) {
      shelf = (
        this.props.books.map((book) => (
          <li key={book.id}>
            <Book book={book} updateShelf={this.props.updateShelf} shelf={this.props.shelves[book.id]} />
          </li>
          ))
        )
      } else {
        shelf = (
          <span>You don{'\''}t appear to have any books in {this.props.title}</span>
        )
      }

      return (
        <div>
          <div className='bookshelf'>
            <h2 className='bookshelf-title'>{this.props.title}</h2>
            <div className='bookshelf-books'>
              <ol className='books-grid'>
                {shelf}
              </ol>
            </div>
          </div>
        </div>
    )
  }
}

export default BookShelf;
