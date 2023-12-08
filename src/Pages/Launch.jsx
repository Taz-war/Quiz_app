import {
  Box,
  Button,
  Container,
  Drawer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { CreateQuizContex } from "../Context_Api/CreateQuizStateProvider";
import { useState } from "react";
import { useEffect } from "react";
// import io from "socket.io-client";

const Launch = () => {
  const { setId, quizzes, setQuizzes } = useContext(CreateQuizContex);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomName,setRoomName] =useState("")
  const [open,setOpen] = useState(false)

  // const socket = io('http://localhost:5000');
  // console.log({socket})

  const getAllQuizes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/questionSet`);
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getAllQuizes();
  }, []);

  ///launch quiz live///
  const handleLive = async (id) => {
    const response = await fetch(`http://localhost:5000/questionSet/${id}`);
    const data = await response.text();
    // setQuizzes(data);
    console.log(data);
    setRoomName(data)
    setOpen(true)
    // setErrorMessage(error.message);

    console.log("live", id);
  };

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 750 }}
            aria-label="caption table"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bolder", fontSize: "large" }}>
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bolder",
                    fontSize: "large",
                    textAlign: "left",
                  }}
                >
                  Status
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map((row, index) => (
                <TableRow key={index} hover sx={{ cursor: "pointer" }}>
                  <TableCell component="th" scope="row">
                    {row.questionSetTitle}
                  </TableCell>
                  <TableCell align="right" sx={{ textAlign: "left" }}>
                    Unpublished
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleLive(row._id)}
                    >
                      Live
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={()=>setOpen(false)}
        
      >
        <Box sx={{maxWidth:'720px',minWidth:'400px'}}>
          <Typography variant="h4" fontWeight={'bold'}>
                Invite Students
          </Typography>
          <Container>
            <br />
          <Typography variant="h3" >
               Visit <b>gosocrative.com</b> and enter room name <span style={{color:'skyblue'}}>'{roomName}'</span>
          </Typography>
          </Container>
        </Box>
        {/* {list(anchor)} */}
      </Drawer>
    </>
  );
};

export default Launch;
