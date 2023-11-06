import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  ButtonGroup,
  Button,
  InputBase,
} from "@mui/material";

function DataTable() {
  const [quizzes, setQuizzes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hover, setHover] = useState(false);
//   const quizzes = [
//     { name: "World Facts Quiz", date: "11/2/2023" },
//     { name: "Untitled Quiz", date: "11/2/2023" },
//     { name: "Untitled Quiz", date: "10/18/2023" },
//   ];
  const getAllQuizes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Questions`);
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
    <div style={{ margin: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <ButtonGroup variant="contained" size="small">
            <Button>Quizzes</Button>
            <Button>Deleted</Button>
          </ButtonGroup>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            style={{
              paddingLeft: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: "10px" }}
          >
            New Folder
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: "10px" }}
          >
            Add Quiz
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>MODIFIED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Radio color="primary" />
                </TableCell>
                <TableCell>{row.questionSetTitle}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DataTable;
