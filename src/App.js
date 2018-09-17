import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import BookDetails from './BookDetails'
import './App.css'

/**
 * Componente raiz do App
 */
class BooksApp extends Component {

  render() {
    return (
      <div className="app">
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="title-margin"></div>
            <Route exact path='/' render={(props) => (
              <BookShelf />
            )}/>
            <Route path='/search' render={(props) => (
              <BookSearch />
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
