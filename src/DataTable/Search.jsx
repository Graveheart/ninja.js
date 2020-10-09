import React, { useState } from 'react';
import {
  useDataTableSelector,
  useUpdateDataTableContext
} from './DataTableContext';
import debounce from 'lodash.debounce';

const Search = () => {
  const searchQuery = useDataTableSelector((state) => state.searchQuery);
  const [query, setQuery] = useState(searchQuery);
  const dispatch = useUpdateDataTableContext();
  const setSearchQuery = debounce((newSearchQuery) => {
    dispatch({ type: 'SEARCH', payload: { query: newSearchQuery } });
  }, 500);

  const handleSearch = (e) => {
    const newSearchQuery = e.target.value;
    setQuery(newSearchQuery);
    setSearchQuery(newSearchQuery);
  };

  return (
    <div className="p-b-1">
      <input
        type="search"
        className="form-control"
        placeholder="Søg brugere"
        onChange={handleSearch}
        value={query}
      />
    </div>
  );
};

export default Search;
