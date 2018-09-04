import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'


class BookShelf extends Component {
  state = {
    shelves:[
      {"id": 0, "name": "None", "highLightShelf": false},
      {"id": 1, "name": "Currently Reading", "highLightShelf": false},
      {"id": 2, "name": "Read", "highLightShelf": false},
      {"id": 3, "name": "Want to Read", "highLightShelf": false},
      {"id": 4, "name": "Lent", "highLightShelf": false},
      {"id": 5, "name": "Lost", "highLightShelf": false}],
    books:[
      {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "authors": "Harper Lee",
        "coverURL": "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        "shelf": "Currently Reading"
      },
      {
        "id": 2,
        "title": "Ender's Game",
        "authors": "Orson Scott Card",
        "coverURL": "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
        "shelf": "Want to Read"
      },
      {
        "id": 3,
        "title": "1776",
        "authors": "David McCullough",
        "coverURL": "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
        "shelf": "Want to Read"
      },
      {
        "id": 4,
        "title": "Harry Potter and the Sorcerer's Stone",
        "authors": "J.K. Rowling",
        "coverURL": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
        "shelf": "Lent"
      },
      {
        "id": 5,
        "title": "The Hobbit",
        "authors": "J.R.R. Tolkien",
        "coverURL": "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
        "shelf": "Read"
      },
      {
        "id": 6,
        "title": "Oh, the Places You'll Go!",
        "authors": "Seuss",
        "coverURL": "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
        "shelf": "Lost"
      },
      {
        "id": 7,
        "title": "The Adventures of Tom Sawyer",
        "authors": "Mark Twain",
        "coverURL": "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
        "shelf": "Currently Reading"
      }
    ],
    selectedBooks:[]
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
      for (let bookIndex = 0; bookIndex < this.state.books.length; bookIndex ++){
        for (let selectedIndex = 0; selectedIndex < this.state.selectedBooks.length; selectedIndex ++){
          if (this.state.selectedBooks[selectedIndex].id === this.state.books[bookIndex].id){
            this.setState(state => ({
              book: state.books[bookIndex].shelf = newShelf
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
    this.state.books.sort(sortBy('title'))
    return(
      this.state.shelves.map((thisShelf) => (
      <div
        className="bookshelf"
        onDrop={(event) => this.drop(event, thisShelf.name)}
        onDragOver={(event) => this.allowDrop(event, thisShelf.id)}
        onDragLeave={(event) => this.leaveDrop(event, thisShelf.id)}>
        <h2 className="bookshelf-title">{thisShelf.name}</h2>
        <div className={(thisShelf.highLightShelf? 'bookshelf-on-drag' : 'bookshelf-books')}>
          <ol key={thisShelf.id} className="books-grid">
            {this.state.books.map((book) => (
            book.shelf === thisShelf.name &&
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    onClick={(e) => this.addRemoveSelectedBook(book)}
                    className={(this.state.selectedBooks.includes(book)? 'book-selected' : 'book-cover')}
                    draggable="true"
                    onDragStart={(event) => this.drag(event, book)}
                    onDragEnd={(event) => this.dragEnd(event)}
                    style={{ width: 128, height: 193, backgroundImage: `url("${book.coverURL}")`}}></div>
                </div>
                  <Link to='/details' className="book-title">{book.title}</Link>
                  <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
          </ol>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>

    ))
    )
  }
}

export default BookShelf
