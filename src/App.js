import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import BookDetails from './BookDetails'
import PropTypes from 'prop-types'
import './App.css'

class BooksApp extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
  }


  state = {
    currentBook:{}
  }

  componentDidUpdate(prevProps, prevState){
    console.log("update");
    if (this.state.currentBook !== prevState.currentBook){
      this.setState({currentBook:this.props.book})
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
            <Route exact path='/' render={() => (
              <BookShelf/>
            )}/>
            <Route path='/search' render={() => (
              <BookSearch/>
            )}/>
            <Route path='/details' render={() => (
              <BookDetails
                book={this.currentBook}
              />
            )}/>
          </div>
      </div>
    )
  }
}

export default BooksApp
