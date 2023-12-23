import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ShowReport = () => {
  const location = useLocation();
  const id = location.state?.id;
  const [errorMessage, setErrorMessage] = useState("");
  const [report, setReport] = useState([]);
  const [search, setSearch] = useState("");

  const getAllQuizes = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/publishedQuestions/${id}`
      );
      const data = await response.json();
      setReport(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getAllQuizes();
  }, []);

  console.log(report);
  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Box textAlign={"left"}>
          <Link
            to={`/Reports`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Box>
        <Box
          sx={{
            marginBottom: "1em",
            textAlign: "right",
          }}
        >
          <TextField
            placeholder="Search by name"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearch("")}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Name</TableCell>
                <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Email</TableCell>
                <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Marks Obtained</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report
                ?.filter((data) => {
                  return search.toLowerCase() === ""
                    ? data
                    : data.name.toLowerCase().includes(search);
                })
                .map((item, index) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.totalMarks}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default ShowReport;
