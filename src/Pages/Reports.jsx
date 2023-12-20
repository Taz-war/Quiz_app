import React, { useState } from "react";
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
  Container,
  Link,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";

const Reports = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  ///get published quizes
  const getAllQuizes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/publishedQuestions`);
      const data = await response.json();
      setRows(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    getAllQuizes();
  }, []);

  console.log(rows);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter rows based on the search term
  const getFilteredRows = (data, term) => {
    return data?.filter((row) => {
      return row?.questionTitle.toLowerCase().includes(term.toLowerCase());
    });
  };

  const filteredRows = getFilteredRows(rows, searchTerm);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <Container sx={{ padding: "1em" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1em",
        }}
      >
        <IconButton>
          {/* Implement archive functionality here */}
          <ArchiveIcon />
        </IconButton>
        <TextField
          placeholder="Search"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm("")}>
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
              <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Name</TableCell>
              <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Date</TableCell>
              <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Room</TableCell>
              <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <Link
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight:'bold',
                      "&:hover": {
                        fontWeight:'bolder',
                        color: "#1E75A3", 
                      },
                    }}
                  >
                    {row.questionTitle}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight:'bold',
                      "&:hover": {
                        fontWeight:'bolder',
                        color: "#1E75A3", 
                      },
                    }}
                  >
                    {row.publishedDate}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight:'bold',
                      "&:hover": {
                        fontWeight:'bolder',
                        color: "#1E75A3", 
                      },
                    }}
                  >
                    {row.roomName}
                  </Link>
                </TableCell>

                <TableCell>
                  {/* Implement archive action here */}
                  <IconButton>
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
    </Container>
  );
};

export default Reports;
