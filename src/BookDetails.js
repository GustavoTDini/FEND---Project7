import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as BookHelper from './BookHelper'
import PropTypes from 'prop-types'

class BookDetails extends Component {
  props = {
    currentBook: PropTypes.object.isRequired,
  }

  shouldComponentUpdate(nextProps) {
   return this.props.currentBook !== nextProps.currentBook;
  }

  changeShelf(book, newShelf){
    BooksAPI.update()
  }

  getBook(book){
    BooksAPI.get(book.id).then((data) => {
      console.log(data)
    })
  }

  render() {
    let {currentBook} = this.props.location.state
    console.log("render")

    return (
    <div>
      <div className="book-details">
        <h2 className="book-details-title">{currentBook.title}</h2>
        <h1 className="book-details-authors">{BookHelper.handleAuthors(currentBook)}</h1>
        <div className="book-details-info">
          <div className="book-image">
          <div className="book-details-cover"style={{ width: 256, height: 400, backgroundImage: `url(${BookHelper.handleThumbnailError(currentBook)})`}}></div>
          </div>
          <div className="book-info">
          <div className="info">
            <p className="book-data-name">Publish Date:</p>
            <p className="book-data">{currentBook.publishedDate}</p>
            <p className="book-data-name">Category:</p>
            <p className="book-data">{currentBook.categories}</p>
            <p className="book-data-name">About:</p>
            <p className="book-data">{currentBook.description}</p>
            <p className="book-data-name">Pages</p>
            <p className="book-data">{currentBook.pageCount}</p>
            <p className="book-data-name">Shelf</p>
              <select
                className="book-data">
                <option value="Currently Reading">Currently Reading</option>
                <option value="Read">Read</option>
                <option value="Want to Read">Want to Read</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="details-return">
        <Link to='/'>Return</Link>
      </div>
    </div>
    )
  }
}

export default BookDetails
