import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
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
    shelf: PropTypes.string.isRequired,
  };

  componentDidMount() {
  }

  change = e => {
    this.props.updateShelf(this.props.book, e.target.value);
  }

  render() {
    const currentShelf = this.props.shelf ? this.props.shelf : 'none',
    authors = this.props.book.authors ? this.props.book.authors : [ 'Unknown' ],
    thumbnail = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'https://fakeimg.pl/128x192/?text=No%20Cover';
    return (
      <div className='book'>
        <div className='book-top'>
          <img className='book-cover' src={thumbnail} alt={this.props.book.title} />
          <div className='book-shelf-changer'>
            <select onChange={this.change} value={currentShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{ this.props.book.title }</div>
        <div className='book-authors'>
          { authors.map((author) => (
            <div className='author' key={author}>{ author }</div>
          )) }
        </div>
      </div>
    )
  }
}

export default Book;