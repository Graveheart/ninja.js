import React from 'react';
import DataTable from './DataTable';
import './App.css';
import { DataTableContextProvider } from './DataTable/DataTableContext';

const App = () => {
  const userData = JSON.parse(
    document.getElementById('user-data').dataset.users
  );

  return (
    <div className="container mt-3">
      <DataTableContextProvider pageSize={5} rows={userData}>
        <DataTable />
      </DataTableContextProvider>
    </div>
  );
};

export default App;
