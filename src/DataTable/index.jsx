import React from 'react';
import Pagination from './Pagination';
import Row from './Row';
import Search from './Search';
import { useDataTableSelector } from './DataTableContext';

const DataTable = () => {
  const { page, pageSize, rows, matchingRows } = useDataTableSelector(
    (state) => state
  );
  if (!rows.length) {
    return null;
  }

  const rowsInPage = (row, index) => {
    const skip = pageSize * (page - 1);
    return index >= skip && index < skip + pageSize;
  };

  return (
    <>
      <Search />
      <table>
        <tbody>
          {matchingRows.filter(rowsInPage).map((row) => (
            <Row key={row.per_id} row={row} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </>
  );
};

export default DataTable;
