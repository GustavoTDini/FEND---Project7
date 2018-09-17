import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BookHelper from './BookHelper'
import PropTypes from 'prop-types'

/**
 * Componente para modificarmos dinamicamente o mudança na pagina details, identificando
 * se viemos de um livro já na estante ou não, e modificando os botões a serem mostrados
 * (retornar para busca e adicionar em caso de virmos da busca)
 * (retornar para estantes e apagar em caso de virmos das estante)
 */
class BookDetailsFooter extends Component {
  static propTypes = {
    /** String que identifica de onde veio, se das estantes ou da busca */
    shelfOrSearch: PropTypes.string.isRequired,
    /** string com a estante selecionada */
    selectedShelf:PropTypes.string,
    /** Json do Livro a ser mostrado */
    book: PropTypes.object
  }

  render() {
    const {shelfOrSearch, book, selectedShelf} = this.props

    if (shelfOrSearch === "bookShelf"){
      return(
        <div>
          <Link to='/' onClick={() => BookHelper.addBook(book, selectedShelf)}>
            <div className="details-return"></div>
          </Link>
          <Link to="/" onClick={() => BookHelper.addBook(book, "none")}>
            <div className="details-delete-book" ></div>
          </Link>
        </div>
      )
    } else if (shelfOrSearch === "bookSearch") {
      return(
        <div>
          <Link to='/search'>
            <div className="details-return"></div>
          </Link>
          <Link to="/" onClick={() => BookHelper.addBook(book, selectedShelf)}>
            <div className="details-add-book" ></div>
          </Link>
        </div>
      )
    }
  }
}

export default BookDetailsFooter
