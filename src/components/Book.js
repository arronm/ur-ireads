import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
  - Display Image
  - Title
  - Authors
  - Options
*/
 
class Book extends Component {
  // TODO: need to refactor to use book instead of individual props
  static propTypes = {
    book: PropTypes.shape({
      allowAnonLogging: PropTypes.bool,
      authors: PropTypes.arrayOf(PropTypes.string),
      averageRating: PropTypes.number,
      canonicalVolumeLink: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.string),
      contentVersion: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
      imageLinks: PropTypes.shape({
        smallThumbnail: PropTypes.string,
        thumbnail: PropTypes.string,
      }),
      industryIdentifiers: PropTypes.arrayOf(PropTypes.shape({
        identifier: PropTypes.string,
        type: PropTypes.string,
      })),
      infoLink: PropTypes.string,
      language: PropTypes.string,
      maturityRating: PropTypes.string,
      pageCount: PropTypes.number,
      panelizationSummar: PropTypes.shape({
        containsEpubBubbles: PropTypes.bool,
        containsImageBubbles: PropTypes.bool,
      }),
      previewLink: PropTypes.string,
      printType: PropTypes.string,
      publishedDate: PropTypes.string,
      publisher: PropTypes.string,
      ratingsCount: PropTypes.number,
      readingModes: PropTypes.shape({
        image: PropTypes.bool,
        text: PropTypes.bool,
      }),
      shelf: PropTypes.string,
      subtitle: PropTypes.string,
      title: PropTypes.string.isRequired,
    }).isRequired,
    updateShelf: PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  change = e => {
    // TODO: Update shelf on server by pushing update API request / Update local state
    this.props.updateShelf(this.props.book, e.target.value);
  }

  shelf = this.props.book.shelf ? this.props.book.shelf : 'none';

  render() {
    return (
      <div className='book'>
        <img src={this.props.book.imageLinks.thumbnail} alt={this.props.book.title} />
        <h4 className='book-title'>{ this.props.book.title }</h4>
        <div className='authors'>
          { this.props.book.authors.map((author) => (
            <div className='author' key={author}>{ author }</div>
          )) }
        </div>
        <select id="lang" onChange={this.change} value={this.shelf}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default Book;