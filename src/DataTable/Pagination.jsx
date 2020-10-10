import React, { useMemo } from 'react';
import { useDataTableSelector } from './DataTableContext';

import Page from './Page';

const Pagination = () => {
  const { matchingRows, pageSize } = useDataTableSelector((state) => state);
  const totalNumberOfPages = useMemo(
    () => Math.ceil(matchingRows.length / pageSize),
    [matchingRows, pageSize]
  );

  if (totalNumberOfPages <= 1) {
    return null;
  }
  return (
    <ul className="pagination">
      {[...Array(totalNumberOfPages).keys()].map((pageNumber) => {
        return <Page key={pageNumber} pageNumber={pageNumber + 1} />;
      })}
    </ul>
  );
};

export default Pagination;
