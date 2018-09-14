import bookCover from './images/placeholder-book-cover.png';


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
