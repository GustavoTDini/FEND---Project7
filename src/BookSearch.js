import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

/**
 * Componente que carrega a pagina de busca de livros, irá retornar o resultado de busca de
 * acordo com o BooksAPI
 */
class BookSearch extends Component {
  state = {
    /** String do campo de busca */
    query: '',
    /** Array com o resultado da busca de livros */
    searchedBooks: []
  }

  /**
   * Função para atualizarmos o query, atualiza com o novo valor e a cada mudança,
   * faremos uma busca no BooksAPI
   *
   *  @param query - valor recebido pela mudança no query input
   */
  updateQuery = (query) => {
    BooksAPI.search(this.state.query).then(data => {
      this.setState({searchedBooks: data})
    })
    this.setState({ query: query })
    console.log("update");
  }

  render() {
    const { query , searchedBooks} = this.state
    let showingBooks

    // Testamos se o searchedBooks é indefinido, ou se não é uma array o que daria erros no render
    if ((searchedBooks) && searchedBooks.constructor === Array ) {
      showingBooks = searchedBooks
    } else {
      showingBooks = []
    }

    return (
      <div>
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
        <div>
          <ol className="books-search-grid">
          {showingBooks.map((book) =>
            <li key={book.id} className="book-list-search">
              <Book book={book}
                    shelfOrSearch={"bookSearch"}/>
            </li>
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
