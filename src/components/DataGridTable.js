import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TextField } from '@mui/material';

const columns = [
  { field: 'customer', headerName: 'Customer', width: 200 },
  { field: 'lastSeen', headerName: 'Last seen', width: 150 },
  { field: 'orders', headerName: 'Orders', width: 100 },
  { field: 'totalSpent', headerName: 'Total spent ($)', width: 150 },
  { field: 'latestPurchase', headerName: 'Latest purchase', width: 200 },
  { field: 'news', headerName: 'News', width: 100, type: 'boolean' },
  { field: 'segments', headerName: 'Segments', width: 150 },
];

function DataGridTable() {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        setFilteredRows(data);
      });
  }, []);

  // Search function for all fields
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    
    setFilteredRows(
      rows.filter((row) =>
        Object.values(row).some(
          (field) =>
            field &&
            field.toString().toLowerCase().includes(value)  // Convert each field to string and check for a match
        )
      )
    );
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <TextField
          variant="outlined"
          label="Search"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        components={{ Toolbar: GridToolbar }}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default DataGridTable;
