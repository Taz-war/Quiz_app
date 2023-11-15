import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Container,
  Radio,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
  Button,
  Collapse,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { useState } from "react";
import EnhancedTableHead from "../Components/QuizList_Components/EnhancedTableHead";
import CreateQuiz from "./CreateQuiz";
import { useContext } from "react";
import { CreateQuizContex } from "../Context_Api/CreateQuizStateProvider";
import EditQuiz from "./EditQuiz";

const QuizList = () => {
  
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openCreateQuiz, setOpenCreateQuiz] = useState(false);
  const [openEditQuiz,setOpenEditQuiz] = useState(false)
  const [id,setId] =useState('')

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = quizzes.map((n) => n.id);
      setSelected(newSelected);
      return;
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  ////fetch api call////
  const [quizzes, setQuizzes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hover, setHover] = useState(false);

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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quizzes.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={openCreateQuiz === false && openEditQuiz ===false}>
        <Container sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              bgcolor: "background.paper",
            }}
          >
            {/* Left-aligned buttons and search */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Search Field */}
              <TextField
                variant="outlined"
                placeholder="Search…"
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                sx={{ mr: 1 }}
              />

              {/* New Folder Button */}
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{ mr: 1 }}
              >
                New Folder
              </Button>

              {/* Add Quiz Button */}
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setOpenCreateQuiz(true)}
                sx={{ mr: 1 }}
              >
                Create Quiz
              </Button>
            </Box>

            {/* Right-aligned Deleted button */}
            <Button variant="outlined" sx={{ mr: 1 }}>
              Deleted
            </Button>
          </Box>

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={quizzes.length}
              />
              <TableBody>
                {quizzes.map((row, index) => {
                  console.log(row);
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Radio
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        onClick={() => { setOpenEditQuiz(true);setId(row.id)}}
                      >
                        {row.questionSetTitle}
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={quizzes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Collapse>
      {openEditQuiz && <EditQuiz setOpenCreateQuiz={setOpenCreateQuiz} quizzes={quizzes} id={id}/>}
      {openCreateQuiz && <CreateQuiz setOpenCreateQuiz={setOpenCreateQuiz} />}
    </Box>
  );
};

export default QuizList;
