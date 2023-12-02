import {
    Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { CreateQuizContex } from "../Context_Api/CreateQuizStateProvider";
import { useState } from "react";
import { useEffect } from "react";
import io from 'socket.io-client'

const Launch = () => {
  const { setId, quizzes, setQuizzes } = useContext(CreateQuizContex);
  const [errorMessage, setErrorMessage] = useState("");

  const socket = io('http://localhost:5000');
  console.log({socket})

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
  return (
    <Container sx={{mt:2}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="caption table" size="medium">
            <TableHead>
                <TableRow>
                    <TableCell sx={{fontWeight:'bolder',fontSize:'large'}}>Title</TableCell>
                    <TableCell sx={{fontWeight:'bolder',fontSize:'large' ,textAlign:'left'}}>Status</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
          <TableBody>
            {quizzes.map((row,index) => (
              <TableRow key={index} hover sx={{ cursor: "pointer" }}>
                <TableCell component="th" scope="row">
                  {row.questionSetTitle}
                </TableCell>
                <TableCell align="right" sx={{textAlign:'left'}}>Unpublished</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="success">
                    Live
                </Button>
                </TableCell>
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Launch;
