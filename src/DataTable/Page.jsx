import React from 'react';
import clsx from 'clsx';
import {
  useDataTableSelector,
  useUpdateDataTableContext
} from './DataTableContext';

const Page = ({ pageNumber }) => {
  const page = useDataTableSelector((state) => state.page);
  const dispatch = useUpdateDataTableContext();

  const isActivePage = pageNumber === page;

  const handlePageChange = (event) => {
    event.preventDefault();
    dispatch({ type: 'SET_PAGE', payload: { page: pageNumber } });
  };

  return (
    <li className="page-item mr-1">
      <button
        className={clsx('page-link', {
          'button-outline': isActivePage
        })}
        onClick={handlePageChange}
      >
        {pageNumber}
      </button>
    </li>
  );
};

export default Page;
