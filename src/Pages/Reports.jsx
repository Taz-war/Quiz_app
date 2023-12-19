import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';


const initialData = [
  { id: 1, name: 'World Facts Quiz', date: '12/3/2023', room: 'TAZWER', type: 'Quiz' },
  { id: 2, name: 'Untitled Quiz', date: '12/5/2023', room: 'TAZWER', type: 'Quiz' },
  { id: 3, name: 'World new Facts Quiz', date: '12/7/2023', room: 'TAZWER', type: 'Quiz' },
  { id: 4, name: 'World Facts Quiz', date: '12/8/2023', room: 'TAZWER', type: 'Quiz' },
  // ... other rows
];

const Reports = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setData(data.filter(row => row.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const handleArchive = (id) => {
    // Placeholder for archive functionality
    console.log('Archive item with id:', id);
  };

  const handleDelete = (id) => {
    setData(data.filter(row => row.id !== id));
  };

  return (
    <Paper sx={{ padding: '1em' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }}>
        <IconButton onClick={() => data.forEach(row => handleArchive(row.id))}>
          <ArchiveIcon />
        </IconButton>
        <TextField
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              handleSearch();
              ev.preventDefault();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.room}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleArchive(row.id)}>
                    <ArchiveIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

}

export default Reports