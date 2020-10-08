import React from 'react'

const Page = (props) => {
  const { pageNumber, currentPageNumber, onChange } = props

  const isActivePage = currentPageNumber == pageNumber

  const click = (event) => {
    event.preventDefault()
    onChange(pageNumber)
  }

  if (isActivePage) {
    return(
      <li className="page-item mr-1">
        <button className="page-link button-outline" onClick={click}>{pageNumber}</button>
      </li>
    )
  }
  return(
    <li className="page-item mr-1">
      <button className="page-link" onClick={click}>{pageNumber}</button>
    </li>
  )
}

export default Page
