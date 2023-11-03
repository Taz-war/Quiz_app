import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Container,
  Radio,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { useState } from "react";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hover, setHover] = useState(false);
  //   const quizzes = [
  //     { id: 1, name: "Untitled Quiz", modifiedDate: "10/30/2023" },
  //     { id: 1, name: "Untitled Quiz", modifiedDate: "10/30/2023" },
  //     { id: 1, name: "Untitled Quiz", modifiedDate: "10/30/2023" },
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
    <Container sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
          Quizzes
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>

      {quizzes.map((quiz) => (
        <Card sx={{ mb: 2, textAlign: "left" }} key={quiz.id}>
          <CardContent
            sx={{ display: "flex", alignItems: "center" }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover ? (
              // <RadioButtonUncheckedOutlinedIcon size="medium" sx={{ mr: 2 }} />
              <Radio
                // checked={selectedValue === 'a'}
                // onChange={handleChange}
                sx={{height:24,width:24,mr:2}}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
              />
            ) : (
              <InsertDriveFileOutlinedIcon fontSize="medium" sx={{ mr: 2 }} />
            )}
            <Typography
              display={"inline-block"}
              onClick={()=>console.log(quiz.id)}
              sx={{
                fontWeight: "bolder",
                "&:hover": {
                  color: "#0075A3",
                  cursor: "pointer",
                  // fontWeight: "bolder",
                },
              }}
              variant="body1"
            >
              {quiz.questionSetTitle}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default QuizList;
