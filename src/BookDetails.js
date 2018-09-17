import React, { Component } from 'react'
import ShelfSelect from './ShelfSelect'
import * as BooksAPI from './BooksAPI'
import * as BookHelper from './BookHelper'
import BookDetailsFooter from './BookDetailsFooter'
import PropTypes from 'prop-types'

/**
 * Componente que carrega a pagina e detalhes do livro, com a opção de mudar de
 * estante. recebemos tambem a informação da pagina anterior para renderizarmos
 * o conteudo correto e voltar para o local correto
 */
class BookDetails extends Component {
  constructor(props) {
    super(props);
    /** Função para passar a troca de estante para o child */
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  static propTypes = {
    /** String do Id do livro a ser mostrado as informações */
    currentBookId: PropTypes.string,
    /** String que identifica de onde veio, se das estantes ou da busca */
    linkFrom: PropTypes.string
  }

  state = {
    /** Json do Livro a ser mostrado */
    currentBook:{},
    /** string com a estante selecionada */
    selectedShelf:null
  }

  /**
   * No componentDidMount, carregamos a informação do livro com o get do BooksAPI,
   * passamos está informação para o state
   */
  componentDidMount() {
    const {currentBookId} = this.props.location.state
    BooksAPI.get(currentBookId).then((fetchBook) => {
      let shelf = fetchBook.shelf
      this.setState(state => ({
        currentBook: fetchBook,
        selectedShelf: shelf
      }))
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
    const {linkFrom} = this.props.location.state
    const {currentBook, selectedShelf} = this.state

    return (
    <div>
      <div className="book-details">
        <h2 className="book-details-title">{currentBook.title}</h2>
        <h1 className="book-details-authors">{BookHelper.handleAuthors(currentBook)}</h1>
        <div className="book-details-info">
          <div>
            <div className="book-details-cover"style={{ width: 256, height: 400, backgroundImage: `url(${BookHelper.handleThumbnailError(currentBook)})`}}></div>
          </div>
          <div className="book-info">
            <div className="info">
              <p className="book-data-name">Publish Date:</p>
              <p className="book-data">{currentBook.publishedDate}</p>
              <p className="book-data-name">Category:</p>
              <p className="book-data">{currentBook.categories}</p>
              <p className="book-data-name">About:</p>
              <p className="book-data">{currentBook.description}</p>
              <p className="book-data-name">Pages</p>
              <p className="book-data">{currentBook.pageCount}</p>
              <p className="book-data-name">Shelf</p>
              <ShelfSelect
                selectedShelf={selectedShelf}
                onChangeShelf={this.handleShelfChange}
                searchOrDetails={"details"}/>
            </div>
          </div>
        </div>
      </div>
      <BookDetailsFooter
        shelfOrSearch={linkFrom}
        selectedShelf={selectedShelf}
        book={currentBook}/>
    </div>
    )
  }
}

export default BookDetails
