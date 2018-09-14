import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import * as BookHelper from './BookHelper'


class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    selectedBook: PropTypes.array,
    addRemoveSelectedBookMethod: PropTypes.func,
    shelfOrSearch: PropTypes.string.isRequired,
  }

  render() {
    const {book, selectedBook, addRemoveSelectedBookMethod,shelfOrSearch} = this.props

    return(
      <div className="book">
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{BookHelper.handleAuthors(book)}</div>
        <BookCoverFooter
          book={book}
          selectedBook={selectedBook}
          addRemoveSelectedBookMethod={addRemoveSelectedBookMethod}
          shelfOrSearch={shelfOrSearch}/>
      </div>
    )

  }
}

class BookCoverFooter extends Component {
  static propTypes = {
    shelfOrSearch: PropTypes.string.isRequired,
    book:PropTypes.object.isRequired,
    selectedBook: PropTypes.array,
    addRemoveSelectedBookMethod: PropTypes.func
  }

  render() {
    const {shelfOrSearch, book, selectedBook, addRemoveSelectedBookMethod} = this.props
    console.log(book)
    console.log(shelfOrSearch)
    if (shelfOrSearch === "bookShelf"){
      return(
        <div>
          <div onClick={(e) => addRemoveSelectedBookMethod(e, book, selectedBook)}
          className={(selectedBook.includes(book)? 'book-selected' : 'book-cover')}
          draggable="true"
          onDragStart={(event) => BookShelf.drag(event, book)}
          onDragEnd={(event) => BookShelf.dragEnd(event)}
          style={{ width: 128, height: 193, backgroundImage: `url(${BookHelper.handleThumbnailError(book)})`}}></div>
          <Link to={{
            pathname: `/details/:${book.id}`,
            state: { currentBookId: book.id , linkFrom: shelfOrSearch}
          }} className="book-shelf-info"/>
        </div>
      )
    } else if (shelfOrSearch === "bookSearch") {
      return(
        <div>
          <Link to={{
            pathname: `/details/:${book.id}`,
            state: { currentBookId: book.id , linkFrom: shelfOrSearch}
          }}><div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${BookHelper.handleThumbnailError(book)})`}}></div></Link>
          <Link to="/" onClick={() => this.addBook(book)}>
            <div className="book-search-add" ></div></Link>
            <select
              className="search-book">
              <option value="Currently Reading">Currently Reading</option>
              <option value="Currently Reading">Currently Reading</option>
              <option value="Read">Read</option>
              <option value="Want to Read">Want to Read</option>
            </select>
        </div>
      )
    }
  }
}

export default Book
