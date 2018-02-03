import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Search extends Component {

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <span>Search Route</span>
        <a href='/'>Back</a>
      </div>
    )
  }
}

export default Search;
