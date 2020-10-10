import React from 'react';
import { mount } from 'enzyme';
import DataTable from './index';
import { DataTableContextProvider } from './DataTableContext';

const rows = [
  {
    name1: 'Mads L. Klausen',
    email: 'MadsLKlausen@jourrapide.com',
    edit_path: 'http://google.com',
    per_id: 1
  },
  {
    name1: 'Alfred K. Krogh',
    email: 'AlfredKKrogh@armyspy.com',
    edit_path: 'http://google.com',
    per_id: 2
  },
  {
    name1: 'Silas L. Bertelsen',
    email: 'SilasLBertelsen@armyspy.com',
    edit_path: 'http://google.com',
    per_id: 3
  },
  {
    name1: 'Mia A. Johnsen',
    email: 'MiaAJohnsen@dayrep.com',
    edit_path: 'http://google.com',
    per_id: 4
  },
  {
    name1: 'Alfred S. Schou',
    email: 'AlfredSSchou@jourrapide.com',
    edit_path: 'http://google.com',
    per_id: 5
  }
];

const pageSize = 5;

describe('DataTable without pagination', () => {
  it('renders 5 rows', () => {
    const wrapper = mount(
      <DataTableContextProvider pageSize={pageSize} rows={rows}>
        <DataTable />
      </DataTableContextProvider>
    );

    expect(wrapper.find('tr')).toHaveLength(pageSize);
    expect(wrapper.find('ul.pagination')).toHaveLength(0);
  });

  it('filters rows based on input', () => {
    const wrapper = mount(
      <DataTableContextProvider pageSize={pageSize} rows={rows}>
        <DataTable />
      </DataTableContextProvider>
    );
    wrapper.find('input').simulate('change', { target: { value: 'k' } });
    expect(wrapper.find('tr')).toHaveLength(2);
  });

  it('returns all rows when clearing filter', () => {
    const wrapper = mount(
      <DataTableContextProvider pageSize={5} rows={rows}>
        <DataTable />
      </DataTableContextProvider>
    );
    wrapper.find('input').simulate('change', { target: { value: 'k' } });
    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(wrapper.find('tr')).toHaveLength(pageSize);
  });
});

describe('DataTable with pagination', () => {
  const arraySize = 21;
  const additionalRows = Array(arraySize)
    .fill(rows[0])
    .map((row, index) => ({ ...row, per_id: index + 1 }));
  const wrapper = mount(
    <DataTableContextProvider pageSize={pageSize} rows={additionalRows}>
      <DataTable />
    </DataTableContextProvider>
  );

  it('renders correct number of pages', () => {
    expect(wrapper.find('tr')).toHaveLength(pageSize);
    expect(wrapper.find('li.page-item')).toHaveLength(
      Math.ceil(arraySize / pageSize)
    );
  });

  it('renders only one item when clicking on last page', () => {
    expect(wrapper.find('tr').length).toBe(pageSize);
    wrapper.find('.page-link').last().simulate('click');
    expect(wrapper.find('tr').length).toBe(1);
  });
});
