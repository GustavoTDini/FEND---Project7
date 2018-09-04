import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {
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
          <ol className="books-grid">
          {showingBooks.map((book) =>
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")`}}></div>
              </div>
                <Link to='/details' className="book-title">{book.title}</Link>
                <div className="book-authors">{book.authors}</div>
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