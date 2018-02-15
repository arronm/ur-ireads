import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BookAPI from '../utils/BookAPI';
import Book from './Book';
import BookShelf from './BookShelf';

class Search extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
    shelves: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      bookQuery: [],
      query: '',
    };
  }

  componentWillMount() {
    // BookAPI.search('Tolstoy').then((books) => {
    //   // TODO: use shelves to map book.shelf?
    //   this.setState({ bookQuery: books });
    // })
  }

  updateQuery(value) {
    this.setState({query: value.trim()});
    if (value !== '') {
      BookAPI.search(value).then((books) => {
        this.setState({bookQuery: books});
      });
    }
  }

  render() {
    return (
      <div>
        <span>Search Route | </span>
        <input
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <Link to='/'>Back</Link>
        <BookShelf
          title='Search Results'
          shelves={this.props.shelves}
          books={this.state.bookQuery}
          updateShelf={this.updateShelf}
        />
        {/* {this.state.bookQuery.map((book) => (
          <Book book={book} key={book.id} updateShelf={this.props.updateShelf} shelf={this.props.shelves[book.id]} />
        ))} */}
      </div>
    )
  }
}

export default Search;
