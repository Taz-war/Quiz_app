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
import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { CreateQuizContex } from '../Context_Api/CreateQuizStateProvider';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import {url} from '../api'

const Rooms = () => {
  const { userId } = useContext(CreateQuizContex);
  const [errorMessage, setErrorMessage] = useState("");
  const [rooms,setRooms] =useState([])
  let navigate = useNavigate();

  ///get published quizes
  const getAllQuizes = async () => {
    try {
      const response = await fetch(`${url}/getRooms/${userId}`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    getAllQuizes();
  }, []);

  const handleDelete = (id) => {
    setRooms(rooms.filter((row) => row.id !== id));
  };
  console.log('aha',rooms)
  return (
    <Container sx={{ padding: "1em" }}>
      {rooms.length === 0 ? (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box sx={{ textAlign: 'center', my: 5, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
            <MenuBookIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography variant="h4" color="primary" gutterBottom fontWeight={'bolder'} fontFamily={'Raleway'} >
              No rooms created yet
            </Typography>
            <Typography variant="h6">
              Start by launching a quiz
            </Typography>
          </Box>
        </Slide>

      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 'large', fontWeight: 'bolder', color: '#1E75A3' }}>Name</TableCell>
                <TableCell sx={{ fontSize: 'large', fontWeight: 'bolder', color: '#1E75A3' }}>Date</TableCell>
                <TableCell sx={{ fontSize: 'large', fontWeight: 'bolder', color: '#1E75A3' }}>Room</TableCell>
                <TableCell sx={{ fontSize: 'large', fontWeight: 'bolder', color: '#1E75A3' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((row) => (
                <TableRow key={row._id}>
                  <TableCell >
                      {row.questionTitle}
                  </TableCell>
                  <TableCell>
                      {row.publishedDate}
                  </TableCell>
                  <TableCell>
                      {row.roomName}
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
      )}
    </Container>
  )
}

export default Rooms