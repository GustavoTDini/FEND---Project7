import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import * as BookHelper from './BookHelper'
import ShelfSelect from './ShelfSelect'

/**
 * Componente para modificarmos as informações e funcionalidades do BookCover e
 * dos Elementos extras, dependendo se estamos carrgando o livro na estante ou na busca
 */
class BookCoverFooter extends Component {
  constructor(props) {
    super(props);
    /** Função para passar a troca de estante para o child */
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  static propTypes = {
    /** String que identifica de onde veio, se das estantes ou da busca */
    shelfOrSearch: PropTypes.string.isRequired,
    /** Json do Livro a ser mostrado */
    book:PropTypes.object.isRequired,
    /** Array com os livros selecionados para mudança */
    selectedBook: PropTypes.array,
    /** função dragEnd do BookShelf */
    dragEnd: PropTypes.func,
    /** função drag do BookShelf */
    drag: PropTypes.func,
    /** função addRemoveSelectedBookMethod do BookShelf */
    addRemoveSelectedBookMethod: PropTypes.func
  }

  state = {
    /** string com a estante selecionada */
    selectedShelf:null
  }

  /**
   * No componentDidMount, verificamos se o livro já esta em uma estante com o get
   * do BooksAPI e caso não esteja colocamos na estante none
   */
  componentDidMount(){
    BooksAPI.get(this.props.book.id).then(book => {
      if(!book.hasOwnProperty('shelf')){
        this.setState({selectedShelf: "none"})
      } else{
        this.setState({selectedShelf: book.shelf})
      }
    })
  }

  /**
   * Função para mudarmos a estante no select
   *
   *  @param shelf - valor recebido pela mudança no ShelfSelect
   */
  handleShelfChange(shelf) {
    this.setState(state => ({
      selectedShelf: shelf
    }))
  }

  render() {
    const {shelfOrSearch, book, selectedBook, addRemoveSelectedBookMethod, drag, dragEnd} = this.props
    let {selectedShelf} = this.state

    if (shelfOrSearch === "bookShelf"){
      return(
        <div>
          <div onClick={(e) => addRemoveSelectedBookMethod(book)}
          className={(selectedBook.includes(book)? 'book-selected' : 'book-cover')}
          draggable="true"
          onDragStart={(event) => drag(event, book)}
          onDragEnd={(event) => dragEnd(event)}
          style={{ width: 128, height: 193, backgroundImage: `url(${BookHelper.handleThumbnailError(book)})`}}></div>
          <Link to={{
            pathname: `/details/:${book.id}`,
            state: { currentBookId: book.id ,
            linkFrom: shelfOrSearch}
          }} className="book-shelf-info"/>
        </div>
      )
    } else if (shelfOrSearch === "bookSearch") {
      return(
        <div>
          <Link to={{
            pathname: `/details/:${book.id}`,
            state: { currentBookId: book.id ,
            linkFrom: shelfOrSearch}}}>
          <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${BookHelper.handleThumbnailError(book)})`}}></div></Link>
          <Link to="/" onClick={() => BookHelper.addBook(book, selectedShelf)}>
            <div className="book-search-add" ></div>
          </Link>
          <ShelfSelect
            selectedShelf={selectedShelf}
            onChangeShelf={this.handleShelfChange}
            searchOrDetails={"search"}/>
        </div>
      )
    }
  }
}

export default BookCoverFooter
