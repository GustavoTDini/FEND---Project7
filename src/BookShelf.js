import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'


class BookShelf extends Component {
  state = {
    shelves:["Currently Reading", "Read", "Want to Read", "Lent", "Lost"],
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
    ]
  }

  updateShelf = (book, newShelf) => {
    for (let i = 0; i < this.state.books.length; i ++){
      if (this.state.books[i].id === book.id){
        this.state.books[i].shelf = newShelf
      }
    }
    let books = this.state.books
    this.setState({books})
  }

  keyTrim(stringToTrim){
    let newString = stringToTrim.replace(/\s+/g, '')
    return newString
  }

  drag(ev, book) {
      ev.target.style.cursor = 'grabbing'
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.setData("text/plain",JSON.stringify(book));
  }

  dragEnd(ev) {
    ev.target.style.cursor = 'pointer'
  }


  drop(ev, newShelf) {
      let data = ev.dataTransfer.getData("text/plain");
      let movedBook = JSON.parse(data)
      this.updateShelf(movedBook, newShelf)
  }

  allowDrop(ev) {
      ev.preventDefault()
  }

  render(){
    return(
      this.state.shelves.map((thisShelf) => (
      <div className="bookshelf" onDrop={(event) => this.drop(event, thisShelf)} onDragOver={(event) => this.allowDrop(event)}>
        <h2 className="bookshelf-title">{thisShelf}</h2>
        <div className="bookshelf-books">
          <ol key={this.keyTrim(thisShelf)} className="books-grid">
            {this.state.books.map((book) => (
            book.shelf === thisShelf &&
            <li key={this.keyTrim(book.title)}>
              <div className="book">
                <div className="book-top">
                  <Link to='/details'
                    className="book-cover"
                    draggable="true"
                    onDragStart={(event) => this.drag(event, book)}
                    onDragEnd={(event) => this.dragEnd(event)}
                    style={{ width: 128, height: 193, backgroundImage: `url("${book.coverURL}")`}}></Link>
                </div>
                  <div className="book-title">{book.title}</div>
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
