import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ShelfSelect extends Component {
  static propTypes = {
    startShelf:PropTypes.string.isRequired
  }

  state = {
    selectedShelf:null
  }

  changeShelf = (event) => {
    this.setState({selectedShelf: event.target.value})
  }

  render() {
    const {selectedShelf} = this.state

    return(
      <select
        onChange={(event) => this.changeShelf(event)}
        value={selectedShelf}>
        <option value="none">None</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="read">Read</option>
        <option value="wantToRead">Want to Read</option>
      </select>
    )
  }
}

export default ShelfSelect
