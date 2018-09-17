import React, { Component } from 'react'

class ShelfSelect extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.searchOrDetails = undefined
    this.selectedShelf = undefined
  }

  handleChange(e) {
    this.props.onChangeShelf(e.target.value);
  }

  render() {
    const {selectedShelf, searchOrDetails} = this.props

    return(
      <select
        className={(searchOrDetails === "details"? "select-shelves-details" : "select-shelves")}
        onChange={this.handleChange}
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
