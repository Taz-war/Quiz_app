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
  Slide,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { useState } from "react";
import EnhancedTableHead from "../Components/QuizList_Components/EnhancedTableHead";
import { useContext } from "react";
import { CreateQuizContex } from "../Context_Api/CreateQuizStateProvider";
import { Link } from "react-router-dom";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DeleteModal from "../Components/QuizList_Components/DeleteModal";
import {url} from '../api'

const QuizList = () => {
  const { setId, quizzes, setQuizzes, userId } = useContext(CreateQuizContex);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = quizzes.map((n) => n._id);
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
  const [errorMessage, setErrorMessage] = useState("");
  const getAllQuizes = async () => {
    try {
      const response = await fetch(
        `${url}/questionSet/${userId}`
      );
      const data = await response.json();
      setQuizzes(data.questions);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getAllQuizes();
  }, []);

  const isSelected = (id) => selected.indexOf(id) !== -1;
  console.log({ quizzes });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quizzes.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Navbar /> */}

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
            {/* <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mr: 1 }}
            >
              New Folder
            </Button> */}

            {/* Add Quiz Button */}
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mr: 1 }}
            >
              <Link
                to={"/CreateQuiz"}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Create Quiz
              </Link>
            </Button>
          </Box>

          {/* Right-aligned Deleted button */}
          <Button variant="outlined" sx={{ mr: 1 }}>
            Deleted
          </Button>
        </Box>
        {quizzes.length === 0 ? (
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Box
              sx={{
                textAlign: "center",
                my: 5,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              <MenuBookIcon sx={{ fontSize: 60, color: "primary.main" }} />
              <Typography variant="h4" color="primary" gutterBottom fontWeight={'bolder'} fontFamily={'Raleway'}>
                No quizzes available
              </Typography>
              <Typography variant="h6">Start by creating a new quiz</Typography>
            </Box>
          </Slide>
        ) : (
          <>
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
                  selected={selected}
                />
                <TableBody>
                  {quizzes.map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
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
                          onClick={() => setId(row._id)}
                          sx={{
                            fontWeight: "bold",
                            "&:hover": {
                              fontWeight: "bolder",
                              color: "#1E75A3",
                            },
                          }}
                        >
                          <Link
                            to={`/EditQuiz/${row._id}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {row.questionSetTitle}
                          </Link>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                            "&:hover": {
                              fontWeight: "bolder",
                              color: "#1E75A3",
                            },
                          }}
                        >
                          {row.date}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => {
                              setId(row._id);
                              setOpenDeleteModal(true);
                            }}
                          >
                            <DeleteTwoToneIcon
                              sx={{ color: "red", ml: 1, fontSize: "xx-large" }}
                            />
                          </IconButton>
                        </TableCell>
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
          </>
        )}
      </Container>
      {openDeleteModal && (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </Box>
  );
};

export default QuizList;
