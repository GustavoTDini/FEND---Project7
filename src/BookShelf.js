import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'
import * as BookHelper from './BookHelper'


class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    shelves:[
      {"id": 0, "name": "Currently Reading", "highLightShelf": false},
      {"id": 1, "name": "Read", "highLightShelf": false},
      {"id": 2, "name": "Want to Read", "highLightShelf": false},
    ],
    selectedBooks:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((fetchBooks) => {
      this.setState({books: fetchBooks})
    })
  }

  addRemoveSelectedBook(book) {
    if (this.state.selectedBooks.includes(book)){
      this.setState({selectedBooks: this.state.selectedBooks.filter((c) => c.id !== book.id)})
    } else{
      this.setState(state => ({
        selectedBooks: state.selectedBooks.concat(book)
      }))
    }
  }

  updateShelf(newShelf){
    if (newShelf !== 'None'){
      for (let bookIndex = 0; bookIndex < this.props.books.length; bookIndex ++){
        for (let selectedIndex = 0; selectedIndex < this.state.selectedBooks.length; selectedIndex ++){
          if (this.state.selectedBooks[selectedIndex].id === this.props.books[bookIndex].id){
            this.setState(state => ({
              book: this.props.books[bookIndex].shelf = newShelf
            }))
          }
        }
      }
      this.setState(state => ({
        selectedBooks: []
      }))
      this.clearShelves()
    }
  }

  clearShelves(){
    let newShelves = this.state.shelves;
    for (let i = 0; i < newShelves.length; i ++){
      newShelves[i].highLightShelf = false
    }
    this.setState(state => ({
      shelves: newShelves
    }))
  }

  drag(ev, book) {
    ev.target.style.cursor = 'grabbing'
    ev.dataTransfer.effectAllowed = "move"
    if (!this.state.selectedBooks.includes(book)){
      this.addRemoveSelectedBook(book)
    }
  }

  moveBooks(ev, newShelf) {
    if (this.state.selectedBooks.length !== 0){
      this.updateShelf(newShelf)
    }
  }

  dragEnd(ev) {
    ev.target.style.cursor = 'pointer'
  }


  drop(ev, newShelf) {
    this.updateShelf(newShelf)
  }

  allowDrop(ev, index) {
      ev.preventDefault()
      if(index !== 0){
        let newShelves = this.state.shelves
        newShelves[index].highLightShelf = true
        this.setState(state => ({
          shelves: newShelves
        }))
      }
  }

  leaveDrop(ev, index){
    ev.preventDefault()
    let newShelves = this.state.shelves
    newShelves[index].highLightShelf = false
    this.setState(state => ({
      shelves: newShelves
    }))
  }

  render(){
    const { books } = this.props
    const { shelves } = this.state

    books.sort(sortBy('title'))

    return(
      shelves.map((thisShelf) =>
        <ol key={thisShelf.id}
            className='shelves'
            onDrop={(event) => this.drop(event, thisShelf.name)}
            onDragOver={(event) => this.allowDrop(event, thisShelf.id)}
            onDragLeave={(event) => this.leaveDrop(event, thisShelf.id)}>
          <div
            className={(this.state.selectedBooks.length !== 0 && thisShelf.id !== 0? 'bookshelf-title-encapsule-move': 'bookshelf-title-encapsule')}
            onClick={(event) => this.moveBooks(event, thisShelf.name)}>
            <h2 className="bookshelf-title">{thisShelf.name}</h2>
          </div>
          <div className={(thisShelf.highLightShelf ? 'bookshelf-encapsule-drag': 'bookshelf-encapsule')}>
          <div className="bookshelf-grid">
            {books.map((thisBook) => (
            thisBook.shelf === thisShelf.name &&
            <li key={thisBook.id} className="book-list">
              <div className="book">
                <div className="book-title">{thisBook.title}</div>
                <div className="book-authors">{BookHelper.handleAuthors(thisBook)}</div>
                <div
                  onClick={(e) => this.addRemoveSelectedBook(thisBook)}
                  className={(this.state.selectedBooks.includes(thisBook)? 'book-selected' : 'book-cover')}
                  draggable="true"
                  onDragStart={(event) => this.drag(event, thisBook)}
                  onDragEnd={(event) => this.dragEnd(event)}
                  style={{ width: 128, height: 193, backgroundImage: `url(${BookHelper.handleThumbnailError(thisBook)})`}}></div>
                  <Link to={{
                    pathname: `/details/:${thisBook.id}`,
                    state: { currentBook: thisBook }
                  }} className="book-shelf-info"/>
              </div>
            </li>
            ))}
            </div>
            <div className="shelf">
              <div className="shelf-top"></div>
              <div className="shelf-front"></div>
            </div>
            </div>
          <div className="open-search">
            <Link to='/search'></Link>
          </div>
        </ol>
      )
    )
    }
}

export default BookShelf
