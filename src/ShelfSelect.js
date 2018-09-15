import Select from 'react-select';
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'


const selectShelves =
  [
    { value: 'none', label: 'None' },
    { value: 'currentlyReading', label: 'Currently Reading' },
    { value: 'Read', label: 'Read' },
    { value: 'wantToRead', label: 'Want to Read' }
  ]

class ShelfSelect extends Component {
  static propTypes = {
    startShelf: PropTypes.string.isRequired
  }

  state = {
    selectedShelf:null
  }

  getDerivedStateFromProps(){
    let selectIndex = selectShelves.findIndex(options => options.value === this.props.startShelf)
    this.setState(state => ({
      selectedShelf: selectShelves[selectIndex]
    }))
  }

  changeShelf = (selectedShelf) => {
    this.setState({selectedShelf})
  }



  render() {
    const {selectedShelf} = this.state
    console.log(selectedShelf)

    return(
      <Select
      value={selectedShelf}
      onChange={this.changeShelf}
      options={selectShelves}
      />
    )
  }
}

export default ShelfSelect
