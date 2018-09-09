import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookDetails extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    currentBook: {}
  }

  componentDidMount() {
    console.log(this.props)
    console.log(this.state.currentBook)
  }

  render() {
    let {currentBook} = this.state


    return (
    <div>
      <div className="book-details">
        <h2 className="book-details-title">{currentBook.title}</h2>
        <h1 className="book-details-authors">{currentBook.authors}</h1>
        <div className="book-details-info">
          <div className="book-image">
          <div className="book-details-cover"style={{ width: 256, height: 400, backgroundImage: `url("${currentBook.coverURL}")`}}></div>
          </div>
          <div className="book-info">
          <div className="info">
            <p className="book-data-name">Publish Date:</p>
            <p className="book-data">{currentBook.publishedDate}</p>
            <p className="book-data-name">Category:</p>
            <p className="book-data">{currentBook.categories}</p>
            <p className="book-data-name">About:</p>
            <p className="book-data">{currentBook.description}</p>
            <div className="info-pages">
              <div>
                <p className="book-data-name">Pages</p>
                <p className="book-data">{currentBook.pageCount}</p>
              </div>
              <div>
                <p className="book-data-name">Current Page</p>
                <input className="book-data" value={currentBook.pagesRead}></input>
              </div>
            </div>
            <p className="book-data-name">Shelf</p>
              <select className="book-data" value={currentBook.shelf}>
                <option value="None">None</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Read">Read</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Lent">Lent</option>
                <option value="Lost">Lost</option>
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
