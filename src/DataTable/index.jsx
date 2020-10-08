import React from 'react'

import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'

const initialState = {
  rows: [],
  rowsPerPage: 40,
  currentPageNumber: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'search':
      const { rows } = state;
      const { text } = action.payload;
      if (!text) { 
        return { ...state }
      };
  
      const  rowsFound = rows.filter((row) => {
          return row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
           (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1)
        })
      return {
        rows: rowsFound,
        currentPageNumber: 0,
        // totalNumberOfPages: this.calculateTotalNumberOfPages(rowsFound)
      };
    default:
      throw new Error();
  }
}

const DataTable = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState;
  const { rows, currentPageNumber, totalNumberOfPages } = state
  const rowsToRender = rows
    .map(row => <Row key={row.per_id} row={row} />)
    .slice(...this.rowsInPageNumber(currentPageNumber))

  const calculateTotalNumberOfPages = (rows) => {
    const { rowsPerPage } = this.props
    if (rowsPerPage) return 0
    return Math.ceil(rows.length / rowsPerPage)
  }

  const changeToPageNumber = (pageNumber) => {
    // this.setState({ currentPageNumber: pageNumber })
  };

  const rowsInPageNumber(pageNumber) => {
    // const { rowsPerPage } = this.props
    // const startIndex = pageNumber * rowsPerPage
    // return [startIndex, startIndex + rowsPerPage]
  };

  return(
    <div>
      <Search onSearch={search} />
      <table>
        <tbody>
          { rowsToRender }
        </tbody>
      </table>
      <Pagination
        // currentPageNumber={currentPageNumber}
        // totalNumberOfPages={totalNumberOfPages}
        // onChange={this.changeToPageNumber.bind(this)} />
    </div>
  )
}

export default DataTable
