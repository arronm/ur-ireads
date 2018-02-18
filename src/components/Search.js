import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BookAPI from '../utils/BookAPI';
import Book from './Book';

class Search extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
    shelves: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      bookQuery: [],
      query: '',
    };
  }

  updateQuery(value) {
    this.setState({query: value});
    if (value.trim() !== '') {
      BookAPI.search(value).then((books) => {
        if(books.error) {
          return;
        }
        this.setState({bookQuery: books});
      });
    } else {
      this.setState({bookQuery: []});
    }
  }

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Back</Link>
          <div className='search-books-input-wrapper'>
            <input
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              placeholder='Search by title or author'
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.bookQuery.map((book) => (
              <Book book={book} key={book.id} updateShelf={this.props.updateShelf} shelf={this.props.shelves[book.id] ? this.props.shelves[book.id] : 'none'} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
