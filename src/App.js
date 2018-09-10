import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import BookDetails from './BookDetails'

import './App.css'

class BooksApp extends Component {
  state = {
    books:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((fetchBooks) => {
      this.setState({books: fetchBooks})
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.books !== prevState.books){
      BooksAPI.getAll().then((fetchBooks) => {
        this.setState({books: fetchBooks})
      })
    }
  }

  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="title-margin"></div>
            <Route exact path='/' render={(props) => (
              <BookShelf {...props} books={this.state.books}/>
            )}/>
            <Route path='/search' render={(props) => (
              <BookSearch {...props} books={this.state.books}/>
            )}/>
            <Route
            path='/details'
            render={(props) => (
              <BookDetails {...props} book={props}/>
            )}/>
          </div>
      </div>
    )
  }
}

export default BooksApp
