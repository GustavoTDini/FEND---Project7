import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as BookHelper from './BookHelper'
import PropTypes from 'prop-types'

class BookSearch extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: '',
    searchedBooks: []
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

  addBook = (book) => {
    BooksAPI.update(book, "currentlyReading").then(data => {
      this.setState(state => ({
        books: this.props.books.concat(data)
      }))
    })
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
                <div className="book-authors">{BookHelper.handleAuthors(book)}</div>
                <Link to={{
                  pathname: `/details/:${book.id}`,
                  state: { currentBook: book }
                }}><div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${BookHelper.handleThumbnailError(book)})`}}></div></Link>
                <Link to="/" onClick={() => this.addBook(book)}>
                  <div className="book-shelf-add" ></div></Link>
                  <select
                    className="search-boo">
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Read">Read</option>
                    <option value="Want to Read">Want to Read</option>
                  </select>
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
