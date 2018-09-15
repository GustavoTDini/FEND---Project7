import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import Book from './Book'

class BookShelf extends Component {

  state = {
    shelves:[
      {
        "index": 0,
        "id": "currentlyReading",
        "name": "Currently Reading",
        "highLightShelf": false
      },
      {
        "index": 1,
        "id": "read",
        "name": "Read",
        "highLightShelf": false
      },
      {
        "index": 2,
        "id": "wantToRead",
        "name": "Want to Read",
        "highLightShelf": false
      }
    ],
    selectedBooks:[],
    books:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((fetchBooks) => {
      this.setState(state => ({
        books: fetchBooks
      }))
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
   return this.state !== nextState;
  }

  addRemoveSelectedBook(ev, book, selectedBook) {
    (ev).preventDefault()
    if (selectedBook.includes(book)){
      this.setState({selectedBooks: selectedBook.filter((c) => c.id !== book.id)})
    } else{
      this.setState(state => ({
        selectedBooks: selectedBook.concat(book)
      }))
    }
  }

  updateShelf(newShelf){
    const { books, selectedBooks } = this.state

    for (let index = 0; index < selectedBooks.length; index ++){
      BooksAPI.update(selectedBooks[index], newShelf)
      let updatedBooks = books
      let updatedBookIndex = updatedBooks.indexOf(selectedBooks[index])
      updatedBooks[updatedBookIndex].shelf = newShelf
      this.setState(state => ({ books: updatedBooks }))
    }
    this.setState(state => ({selectedBooks: []}))
    this.clearShelves()
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
        let newShelves = this.state.shelves
        newShelves[index].highLightShelf = true
        this.setState(state => ({
          shelves: newShelves
        }))
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
    const { books, shelves , selectedBooks} = this.state

    books.sort(sortBy('title'))

    return(
      shelves.map((thisShelf) =>
        <ol key={thisShelf.id}
            className='shelves'
            onDrop={(event) => this.drop(event, thisShelf.id)}
            onDragOver={(event) => this.allowDrop(event, thisShelf.index)}
            onDragLeave={(event) => this.leaveDrop(event, thisShelf.index)}>
          <div
            className={(this.state.selectedBooks.length !== 0 && thisShelf.id !== 0? 'bookshelf-title-encapsule-move': 'bookshelf-title-encapsule')}
            onClick={(event) => this.moveBooks(event, thisShelf.id)}>
            <h2 className="bookshelf-title">{thisShelf.name}</h2>
          </div>
          <div className={(thisShelf.highLightShelf ? 'bookshelf-encapsule-drag': 'bookshelf-encapsule')}>
          <div className="bookshelf-grid">
            {books.map((thisBook) => (
            thisBook.shelf === thisShelf.id &&
            <li key={thisBook.id} className="book-list">
              <Book book={thisBook}
                    selectedBook={selectedBooks}
                    addRemoveSelectedBookMethod={this.addRemoveSelectedBook.bind(this)}
                    shelfOrSearch={"bookShelf"}/>
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
