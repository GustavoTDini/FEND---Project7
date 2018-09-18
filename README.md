# MyReads Project


### Shelf
Para este projeto fiz a funcionalidade de Drag and Drop para mover os livros de uma estante para a outra, podemos mover também vários livros de uma vez, basta seleciona-los, eles ficaram mais claros mostrando que estão selecionados, então poderemos mover com o drag ou clicando no nome da estante. Clicando no "i" no canto inferior direito do Livro, mostrará a tela com informações.

### Search
Na tela de Busca, podemos digitar o termo que queremos buscar, respeitando a limitação da API, assim que carregamos os livros, a barra de select embaixo irá mostrar a estante que o livro está disposto, caso ele já esteja em uma estante, ou none se não estiver, se quisermos adicionar diretamente o livro em uma estante, podemos clicar no "+" no canto inferior direito, ou clicar na capa para abrirmos a tela de informações

### Details
Na tela de detalhes, alem do titulo, autor e capa, temos também outras informações, descrição, data de publicação e número de páginas, alem de da estante na qual o livro se encontra, caso já esteja, ou none caso ainda esteja em procura, a estante poderemos modificar para atualizar na pagina de Shelf, ou apagar o livro com o botão delete, caso tenhamos vindo da pagina de busca temos o botão de adicionar para colocar o livro na prateleira.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Dependency

Para o Funcionamento deste projeto foi utilizado:

### Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Instalation & Production Instructions

#### Environment setup & Libraries

O projeto utiliza as seguintes bibliotecas e pacotes

```sh
  $ npm install --save prop-types sort-by react-router-dom
```

#### Development

Iniciar o Servidor Webpack:

```sh
  $ npm start
```

#### Production Build

```sh
  $ npm run build
```

### Transparent Textures

Para as Texturas da parede e da madeira foi utilizado os arquivos e funcionalidades do site [Transparent Textures](https://www.transparenttextures.com/)
