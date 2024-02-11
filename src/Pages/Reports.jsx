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
  Slide,
  Box,
  Typography,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CreateQuizContex } from "../Context_Api/CreateQuizStateProvider";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {url} from '../api'
import { Spin } from "antd";

const Reports = () => {
  const { userId } = useContext(CreateQuizContex);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loader,setLoader] =useState(false)
  let navigate = useNavigate();

  ///get published quizes
  const getAllQuizes = async () => {
    setLoader(true)
    try {
      const response = await fetch(`${url}/publishedQuestions/${userId}`,{credentials:'include'});
      const data = await response.json();
      setRows(data);
    } catch (error) {
      setErrorMessage(error.message);
    }finally{
      setLoader(false)
    }
  };
  useEffect(() => {
    getAllQuizes();
  }, []);

  ////navigate component///
  const handleClick=(id)=>{
    navigate(`/teacher/reports/${id}`, { state: { id: id} })
  }

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

  // const handleDelete =async (id) => {
  //   console.log(id)
  //   if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
  //     try {

  //       // If Firebase deletion is successful, proceed with API call to delete user profile
  //       const response = await fetch(`${url}/reports/delete/${id}`, {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // Add any other headers your API requires
  //         },
  //       });

  //       await getAllQuizes()
  //       // setRows(rows.filter((row) => row.id !== id));
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       // Redirect user or update UI accordingly
  //       // For example, you might want to redirect to the login page or home page
  //     } catch (error) {
  //       console.error('Error deleting account:', error.message);
  //       // Optionally update UI to show error message
  //     }
  //   }

  // };

  return (
    <Container sx={{ padding: "1em" }}>
      <Spin tip="Loading..." size="large" spinning={loader}></Spin>
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
      {rows.length === 0 ? (
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box sx={{ textAlign: 'center', my: 5, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
            <MenuBookIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography variant="h4" color="primary" gutterBottom fontWeight={'bolder'} fontFamily={'Raleway'} >
              No quiz published yet
            </Typography>
            <Typography variant="h6">
              Start by launching a quiz
            </Typography>
          </Box>
        </Slide>

        ):(
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Name</TableCell>
              <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Date</TableCell>
              <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Room</TableCell>
              {/* <TableCell sx={{fontSize:'large',fontWeight:'bolder',color:'#1E75A3'}}>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row._id}>
                <TableCell >
                  <Link
                  onClick={()=>handleClick(row._id)}
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
                    onClick={() => handleClick(row._id)}
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
                    onClick={() => handleClick(row._id)}
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

                {/* <TableCell>
                  Implement archive action here
                  <IconButton>
                    <ArchiveIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        )}
    </Container>
  );
};

export default Reports;
