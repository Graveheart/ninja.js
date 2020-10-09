import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

const initialState = ({ pageSize = 40, rows = {} }) => {
  const searchQuery = window.localStorage.getItem('searchQuery') || '';
  return {
    rows,
    matchingRows: rows.filter((row) => rowMatches(row, searchQuery)),
    page: 1,
    pageSize,
    searchQuery
  };
};

const rowMatches = (row, query) => {
  return row.name1.toLowerCase().includes(query.toLowerCase());
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SEARCH': {
      const { rows } = state;
      const { query } = payload;
      window.localStorage.setItem('searchQuery', query);
      if (!query) {
        return { ...state, matchingRows: rows };
      }
      const matchingRows = rows.filter((row) => rowMatches(row, query));
      return {
        ...state,
        matchingRows: matchingRows,
        page: 1,
        searchQuery: query
      };
    }
    case 'SET_PAGE': {
      const { page } = payload;
      return {
        ...state,
        page
      };
    }
    default:
      throw new Error('unknown action type');
  }
};

const useDataTableValue = (props) => {
  return useReducer(reducer, initialState(props));
};

export const {
  Provider: DataTableContextProvider,
  useSelector: useDataTableSelector,
  useUpdate: useUpdateDataTableContext
} = createContainer(useDataTableValue);
