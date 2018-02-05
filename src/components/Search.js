import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BookAPI from '../utils/BookAPI';
import Book from './Book';

class Search extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      query: '',
    };
  }

  componentWillMount() {
    BookAPI.search('Tolstoy').then((books) => {
      this.setState({ books });
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
        {this.state.books.map((book) => (
          <Book book={book} key={book.id} updateShelf={this.props.updateShelf} />
        ))}
      </div>
    )
  }
}

export default Search;
