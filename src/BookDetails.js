import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BookDetails extends Component {
  state = {
  }

  render() {
    return (
      <div>
        Book Details
        <div className="details-return">
          <Link to='/'>Return</Link>
        </div>
      </div>
    )
  }
}

export default BookDetails
