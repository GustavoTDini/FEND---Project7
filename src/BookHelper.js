import bookCover from './images/placeholder-book-cover.png'
import * as BooksAPI from './BooksAPI'

/**
 * Função para testar se existe uma capa catalogada para o livro,
 * caso não haja, irá retornar um placeHolder
 *
 * @param book o Json do livro a ser testado
 *
 * @return bookCover - o endereço do arquivo, ou do placeHolder
 */
export function handleThumbnailError(book){
  if (book.hasOwnProperty('imageLinks')){
    return book.imageLinks.thumbnail
  } else {
    return bookCover
  }
}

/**
 * Função para testar se existe uma autor catalogado para o livro,
 * caso não haja, irá retornar uma string informando que não há,
 * caso tenha varios autores, irá concantenar eles em uma string
 *
 * @param book o Json do livro a ser testado
 *
 * @return authors com os autores concatenados, ou a mensagem
 */
export function handleAuthors(book){
  let authors = "No Authors Specified"
  if(book.hasOwnProperty('authors')){
    authors = book.authors.join(' / ')
  }
  return authors
}

/**
 * Função que carrega o BookAPI de update, para atualizar ou deletar o livro
 * (caso coloquemos em uma estante que não existe)
 *
 * @param book - livro a ser adicionado
 * @param shelf - estante aonde será adicionado
 */
export function addBook(book, shelf){
  BooksAPI.update(book, shelf)
}
