import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BookHelper from './BookHelper'
import BookCoverFooter from './BookCoverFooter'

/**
 * Componente que carrega os livros em uma lista, será utilizado tanto em BookShelf,
 * como em BookSearch, as mudanças em funcionalidades serão reslizadas por BookCoverFooter
 */
class Book extends Component {
  static propTypes = {
    /** Json do Livro a ser mostrado */
    book: PropTypes.object.isRequired,
    /** Estante em que o atual livro está */
    bookShelf: PropTypes.array,
    /** Array com os livros selecionados para mudança */
    selectedBook: PropTypes.array,
    /** função addRemoveSelectedBookMethod do BookShelf */
    addRemoveSelectedBookMethod: PropTypes.func,
    /** função dragEnd do BookShelf */
    dragEnd: PropTypes.func,
    /** função drag do BookShelf */
    drag: PropTypes.func,
    /** String que identifica de onde veio, se das estantes ou da busca */
    shelfOrSearch: PropTypes.string.isRequired
  }

  render() {
    const {book, selectedBook, addRemoveSelectedBookMethod,shelfOrSearch, drag, dragEnd, bookShelf} = this.props

    return(
      <div className="book">
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{BookHelper.handleAuthors(book)}</div>
        <BookCoverFooter
          bookshelf={bookShelf}
          book={book}
          selectedBook={selectedBook}
          addRemoveSelectedBookMethod={addRemoveSelectedBookMethod}
          shelfOrSearch={shelfOrSearch}
          drag={drag}
          dragEnd={dragEnd}/>
      </div>
    )
  }
}

export default Book
