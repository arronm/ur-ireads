import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BookAPI from '../utils/BookAPI';
import Book from './Book';

class Search extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
    shelves: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      bookQuery: [],
      query: '',
    };
  }

  componentWillMount() {
    BookAPI.search('Tolstoy').then((books) => {
      // TODO: use shelves to map book.shelf?
      this.setState({ bookQuery: books });
    })
  }

  updateQuery(value) {
    this.setState({query: value.trim()});
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
        {this.state.bookQuery.map((book) => (
          <Book book={book} key={book.id} updateShelf={this.props.updateShelf} shelf={this.props.shelves[book.id]} />
        ))}
      </div>
    )
  }
}

export default Search;
