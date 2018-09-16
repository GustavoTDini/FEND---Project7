import bookCover from './images/placeholder-book-cover.png'
import * as BooksAPI from './BooksAPI'


export function handleThumbnailError(book){
  if (book.hasOwnProperty('imageLinks')){
    return book.imageLinks.thumbnail
  } else {
    return bookCover
  }
}

export function handleAuthors(book){
  let authors = "No Authors Specified"
  if(book.hasOwnProperty('authors')){
    authors = book.authors.join(' / ')
  }
  return authors
}

export function setShelf(bookId){
  let shelf = "None"
  BooksAPI.get(bookId).then((testBook) => {
    if(testBook.hasOwnProperty('shelf')){
      shelf = testBook.shelf
    }
    console.log(shelf)
    return shelf
  })

}
