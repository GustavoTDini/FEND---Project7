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

// {
//   "id": 1,
//   "title": "To Kill a Mockingbird",
//   "authors": "Harper Lee",
//   "publishedDate": "15/08/1997",
//   "categories": "Adventure",
//   "description": "How to Kill a Mockingbird!",
//   "pageCount": 130,
//   "pagesRead": 20,
//   "coverURL": "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
//   "shelf": "None"
// },
// {
//   "id": 2,
//   "title": "Ender's Game",
//   "authors": "Orson Scott Card",
//   "publishedDate": "15/12/1997",
//   "categories": "Sci-Fi",
//   "description": "Be the Universe Savior",
//   "pageCount": 550,
//   "pagesRead": 120,
//   "coverURL": "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
//   "shelf": "None"
// },
// {
//   "id": 3,
//   "title": "1776",
//   "authors": "David McCullough",
//   "publishedDate": "15/08/1776",
//   "categories": "History",
//   "description": "Independence!",
//   "pageCount": 130,
//   "pagesRead": 20,
//   "coverURL": "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
//   "shelf": "None"
// },
// {
//   "id": 4,
//   "title": "Harry Potter and the Sorcerer's Stone",
//   "authors": "J.K. Rowling",
//   "publishedDate": "15/08/1997",
//   "categories": "Fantasy",
//   "description": "A Book about a Young Wizard!",
//   "pageCount": 200,
//   "pagesRead": 50,
//   "coverURL": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
//   "shelf": "None"
// },
// {
//   "id": 5,
//   "title": "The Hobbit",
//   "authors": "J.R.R. Tolkien",
//   "publishedDate": "15/08/1950",
//   "categories": "Adventure",
//   "description": "Inside a Den Lives a Hobbit!",
//   "pageCount": 250,
//   "pagesRead": 10,
//   "coverURL": "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
//   "shelf": "None"
// },
// {
//   "id": 6,
//   "title": "Oh, the Places You'll Go!",
//   "authors": "Seuss",
//   "publishedDate": "15/08/1930",
//   "categories": "Kids",
//   "description": "Kids Book!",
//   "pageCount": 50,
//   "pagesRead": 25,
//   "coverURL": "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
//   "shelf": "None"
// },
// {
//   "id": 7,
//   "title": "The Adventures of Tom Sawyer",
//   "authors": "Mark Twain",
//   "publishedDate": "15/08/1850",
//   "categories": "Adventure",
//   "description": "American Classic!",
//   "pageCount": 200,
//   "pagesRead": 50,
//   "coverURL": "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
//   "shelf": "None"
// }
