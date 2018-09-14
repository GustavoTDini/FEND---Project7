import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as BookHelper from './BookHelper'
import PropTypes from 'prop-types'
import Select from 'react-select'
import Book from './Book'

class BookDetails extends Component {
  static propTypes = {
    currentBookId: PropTypes.string.isRequired,
    linkFrom: PropTypes.string.isRequired
  }

  state = {
    currentBook:{},
    selectedShelf:null
  }

  componentDidMount() {
    const {currentBookId} = this.props.location.state
    BooksAPI.get(currentBookId).then((fetchBook) => {
      let shelf = fetchBook.shelf
      this.setState(state => ({
        currentBook: fetchBook,
        selectedShelf: shelf
      }))
    })
  }


  changeShelf = (selectedShelf) => {
    this.setState({selectedShelf})
  }

  render() {
    const {linkFrom} = this.props.location.state
    const {currentBook, selectedShelf} = this.state
    console.log(selectedShelf)

    const selectShelves = [
      { value: 'none', label: 'None' },
      { value: 'currentlyReading', label: 'Currently Reading' },
      { value: 'Read', label: 'Read' },
      { value: 'wantToRead', label: 'Want to Read' }
    ];

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
              <Select
                value={selectedShelf}
                onChange={this.changeShelf}
                options={selectShelves}
                />
            </div>
          </div>
        </div>
      </div>
      <BookDetailsFooter shelfOrSearch={linkFrom}/>
    </div>
    )
  }
}

class BookDetailsFooter extends Component {
  static propTypes = {
    shelfOrSearch: PropTypes.string.isRequired,
  }

  render() {
    const {shelfOrSearch} = this.props

    if (shelfOrSearch === "bookShelf"){
      return(
        <div>
          <div className="details-return">
            <Link to='/'></Link>
          </div>
          <div className="details-delete-book">
            <Link to='/'></Link>
          </div>
        </div>
      )
    } else if (shelfOrSearch === "bookSearch") {
      return(
        <div>
          <div className="details-return">
            <Link to='/search'></Link>
          </div>
          <div className="details-add-book">
            <Link to='/'></Link>
          </div>
        </div>
      )
    }
  }
}

export default BookDetails
