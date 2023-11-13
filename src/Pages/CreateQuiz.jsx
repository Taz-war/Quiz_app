import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import MultipleChoice from "../Components/CreateQuiz_Components/MultipleChoice";
import ShortQuestion from "../Components/CreateQuiz_Components/ShortQuestion";
import TrueFalse from "../Components/CreateQuiz_Components/TrueFalse";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { useContext } from "react";
import { CreateQuizContex } from "../Context_Api/CreateQuizStateProvider";

const CreateQuiz = ({ setOpenCreateQuiz,quizzes,id }) => {
  // console.log({quizzes})
  const {open,setOpen} = useContext(CreateQuizContex)
  const [componentsToRender, setComponentsToRender] = useState([]);
  let question=quizzes.find(quiz => quiz.id === id);
  
  ///for title edit////
  const [value, setValue] = useState("Untitled Quiz");
  const [isEditing, setIsEditing] = useState(false);
  const [questionSet, setQuestionSet] = useState([]);
  // const [question, setQuestion] = useState({
  //   id: null,
  //   questionSetTitle: "",
  //   questions: [],
  // });

  const { v4: uuidv4 } = require("uuid");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  ////save question set/// and   ////post question///
  const handleSave = async () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    const newQuestion = {
      id: uuidv4(),
      date:currentDate,
      questionSetTitle: value,
      questions: [...questionSet],
    };

    // Now, set the question in your state if necessary or directly post it
    // setQuestion(newQuestion); // Only if you need to update the state

    try {
      const response = await fetch(`http://localhost:8080/Questions`, {
        method: "POST",
        body: JSON.stringify(newQuestion),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Handle success here
    } catch (error) {
      console.error("Error posting question:", error);
      // Handle errors here
    }

    setOpenCreateQuiz(false);
  };

  ////fetch question ///
  useEffect(()=>{
    question.questions.map((item)=>{
      if (item.QuestionType ==='multipleChoice') {
        setOpen(true)
        addComponent(MultipleChoice,item)
      }else if (item.QuestionType ==='shortQuestion') {
        setOpen(true)
        addComponent(ShortQuestion,item)
      }else{
        setOpen(true)
        addComponent(TrueFalse,item)
      }
    })
  },[])

  // console.log(question);

  // Function to add components to the list
  const addComponent = (Component,item) => {
    
    setComponentsToRender((prevComponents) => [
      ...prevComponents,
      <Component
        key={prevComponents.length}
        index={prevComponents.length}
        open={open}
        setOpen={setOpen}
        setQuestionSet={setQuestionSet}
        questionSet={questionSet}
        item={item}
      />,
    ]);
  };

  return (
    <Container>
      <Grid container columns={12} columnSpacing={2} mt={2}>
        <Grid item xs={6} p={2}>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            sx={{ fontWeight: "bolder" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {isEditing ? (
                    <DoneTwoToneIcon
                      onClick={handleSaveClick}
                      sx={{ bgcolor: "skyblue", color: "white", p: 1 }}
                    />
                  ) : (
                    <BorderColorTwoToneIcon
                      onClick={handleEditClick}
                      sx={{ bgcolor: "skyblue", color: "white", p: 1 }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6} textAlign={"right"} p={2}>
          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: "25px",
              bgcolor: "#E4FBFF",
              color: "#0075A3",
              mt: 1,
              "&:hover": { bgcolor: "#E4FBFF", color: "#0075A3" },
            }}
            onClick={() => handleSave()}
          >
            Save and Exit
          </Button>
        </Grid>
      </Grid>
      <Paper sx={{ p: 2, mt: 2 }}>
        {componentsToRender.map((component, index) => (
          <Box key={index}>{component}</Box>
        ))}
        <Box p={2}>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
              mb: 2,
              bgcolor: "#FFF7E5",
              color: "#F3AF46",
              borderColor: "#F3AF46",
              "&:hover": {
                backgroundColor: "transparent",
                border: "none",
                color: "#F3AF46",
              },
            }}
            onClick={() => addComponent(MultipleChoice)}
          >
            Multiple Choice
          </Button>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
              mb: 2,
              bgcolor: "#E9EEFB",
              color: "#5971B7",
              borderColor: "#5971B7",
              "&:hover": {
                backgroundColor: "transparent",
                border: "none",
                color: "#5971B7",
              },
            }}
            onClick={() => addComponent(ShortQuestion)}
          >
            Short Answer
          </Button>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
              mb: 2,
              bgcolor: "#FFECE6",
              color: "#FF7B64",
              borderColor: "#FF7B64",
              "&:hover": {
                backgroundColor: "transparent",
                border: "none",
                color: "#FF7B64",
              },
            }}
            onClick={() => addComponent(TrueFalse)}
          >
            True/False
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateQuiz;
