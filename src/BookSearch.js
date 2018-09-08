import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import bookCover from './images/placeholder-book-cover.png';

class BookSearch extends Component {
  state = {
    query: '',
    searchedBooks: []
  }

  handleThumbnailError(book) {
    if (book.hasOwnProperty('imageLinks')){
      return book.imageLinks.thumbnail
    } else {
      return bookCover
    }
  }

  handleAuthors(book) {
    let authors = "No Authors Specified"
    if(book.hasOwnProperty('authors')){
      authors = book.authors.join(' / ')
    }
    return authors
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query){
      BooksAPI.search(this.state.query).then(data => {
      this.setState({searchedBooks: data})})
    }
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  render() {
    const { query , searchedBooks} = this.state
    let showingBooks

    if (typeof searchedBooks !== 'undefined' && searchedBooks.constructor === Array ) {
      showingBooks = searchedBooks
    } else {
      showingBooks = []
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type='text'
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-search-grid">
          {showingBooks.map((book) =>
            <li key={book.id} className="book-list-search">
              <div className="book">
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{this.handleAuthors(book)}</div>
                <Link to='/details'><div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${this.handleThumbnailError(book)})`}}></div></Link>
              </div>
            </li>
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
