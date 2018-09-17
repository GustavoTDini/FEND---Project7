import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import Book from './Book'

/**
 * Componente que carrega todos os livros que estão nas estantes salvos na API
 * tem a funcionalidade de trocar de estante por drag and drop (DnD), 1 ou varios livros
 * de cada vez, ou mover selecionando os livros e clicando no nome da estante.
 */
class BookShelf extends Component {
  state = {
    /** Array com as estantes e infromações da mesma id, index e highLightShelf para o DnD */
    shelves:[
     {
       "index": 0,
       "id": "currentlyReading",
       "name": "Currently Reading",
       "highLightShelf": false
     },
     {
       "index": 1,
       "id": "read",
       "name": "Read",
       "highLightShelf": false
     },
     {
       "index": 2,
       "id": "wantToRead",
       "name": "Want to Read",
       "highLightShelf": false
     }
    ],
    /** Array com os livros selecionados para mudança */
    selectedBooks:[],
    /** Array com os livros salvos na API */
    books:[]
  }

  /**
   * No componentDidMount carregamos a API com os livros já cadastrados,
   * com a função getAll
   */
  componentDidMount() {
    BooksAPI.getAll().then((fetchBooks) => {
      this.setState(state => ({
        books: fetchBooks
      }))
    })
  }

  /**
   * Função para adicionarmos o livro a array de livros selecionados, que poderemos mover
   *
   *  @param book - livro a ser adicionado
   */
  addRemoveSelectedBook(book) {
    const { selectedBooks } = this.state
    if (selectedBooks.includes(book)){
      this.setState({selectedBooks: selectedBooks.filter((c) => c.id !== book.id)})
    } else{
      this.setState(state => ({
        selectedBooks: selectedBooks.concat(book)
      }))
    }
  }

  /**
   * Função para atualizarmos os livros de selectedBooks para uma nova estante
   *
   *  @param newShelf - estante para aonde serão movidos os livros
   */
  updateShelf(newShelf){
    const { books, selectedBooks } = this.state

    for (let index = 0; index < selectedBooks.length; index ++){
      BooksAPI.update(selectedBooks[index], newShelf)
      let updatedBooks = books
      let updatedBookIndex = updatedBooks.indexOf(selectedBooks[index])
      updatedBooks[updatedBookIndex].shelf = newShelf
      this.setState(state => ({ books: updatedBooks }))
    }
    this.setState(state => ({selectedBooks: []}))
    this.clearShelves()
  }

  /**
   * Função para apagarmos todas as estantes ao final do movimento de DnD
   */
  clearShelves(){
    let newShelves = this.state.shelves;
    for (let i = 0; i < newShelves.length; i ++){
      newShelves[i].highLightShelf = false
    }
    this.setState(state => ({
      shelves: newShelves
    }))
  }

  /**
   * Função para movermos os livros de selectedBooks para uma nova estante,
   * usado no mover com o clique na placa de nome da estante
   *
   *  @param newShelf - estante para aonde serão movidos os livros
   */
  moveBooks(ev, newShelf) {
    if (this.state.selectedBooks.length !== 0){
      this.updateShelf(newShelf)
    }
  }

  /**
   * Função para fazermos o DnD dos livros
   *
   *  @param book - livro que estamos movendo, testamos se o mesmo já esta em selectedBooks
   */
  drag(ev, book) {
    ev.target.style.cursor = 'grabbing'
    ev.dataTransfer.effectAllowed = "move"
    if (!this.state.selectedBooks.includes(book)){
      this.addRemoveSelectedBook(book)
    }
  }

  /**
   * Função para voltarmos o cursor ao normal ao terminarmos o movimento de DnD
   *
   */
  dragEnd(ev) {
    ev.target.style.cursor = 'pointer'
  }

  /**
   * Função que identifica o final do DnD e executa o updateShelf
   *
   * @param newShelf - estante para aonde serão movidos os livros
   */
  drop(ev, newShelf) {
    this.updateShelf(newShelf)
  }

  /**
   * Função que identifica que estamos em uma estante para colocarmos os livros no
   * DnD e acende a mesma para melhor visualizaçào de onde iremos colocar o livro
   *
   * @param index - o indice da estante a ser acesa
   */
  allowDrop(ev, index) {
      ev.preventDefault()
        let newShelves = this.state.shelves
        newShelves[index].highLightShelf = true
        this.setState(state => ({
          shelves: newShelves
        }))
  }

  /**
   * Função que identifica que estamos saindo de uma estante para colocarmos os livros no
   * DnD e apaga a mesma para identificarmos que não poderemos mover
   *
   * @param index - o indice da estante a ser apagada
   */
  leaveDrop(ev, index){
    ev.preventDefault()
    let newShelves = this.state.shelves
    newShelves[index].highLightShelf = false
    this.setState(state => ({
      shelves: newShelves
    }))
  }

  render(){
    const { shelves, books, selectedBooks} = this.state

    // Colocamos os livros em ordem alfabetica
    books.sort(sortBy('title'))

    return(
      shelves.map((thisShelf) =>
        <ol key={thisShelf.id}
            className='shelves'
            onDrop={(event) => this.drop(event, thisShelf.id)}
            onDragOver={(event) => this.allowDrop(event, thisShelf.index)}
            onDragLeave={(event) => this.leaveDrop(event, thisShelf.index)}>
          <div
            className={(this.state.selectedBooks.length !== 0 && thisShelf.id !== 0? 'bookshelf-title-encapsule-move': 'bookshelf-title-encapsule')}
            onClick={(event) => this.moveBooks(event, thisShelf.id)}>
            <h2 className="bookshelf-title">{thisShelf.name}</h2>
          </div>
          <div className={(thisShelf.highLightShelf ? 'bookshelf-encapsule-drag': 'bookshelf-encapsule')}>
          <div className="bookshelf-grid">
            {books.map((thisBook) => (
            thisBook.shelf === thisShelf.id &&
            <li key={thisBook.id} className="book-list">
              <Book book={thisBook}
                    selectedBook={selectedBooks}
                    addRemoveSelectedBookMethod={this.addRemoveSelectedBook.bind(this)}
                    shelfOrSearch={"bookShelf"}
                    drag={this.drag.bind(this)}
                    dragEnd={this.dragEnd.bind(this)}/>
            </li>
            ))}
            </div>
            <div className="shelf">
              <div className="shelf-top"></div>
              <div className="shelf-front"></div>
            </div>
            </div>
          <div className="open-search">
            <Link to='/search'></Link>
          </div>
        </ol>
      )
    )
    }
}

export default BookShelf
