import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import MultipleChoice from "../Components/CreateQuiz_Components/MultipleChoice/MultipleChoice";
import ShortQuestion from "../Components/CreateQuiz_Components/ShortQuestion/ShortQuestion";
import TrueFalse from "../Components/CreateQuiz_Components/TureFalse/TrueFalse"; // Corrected the import statement
import { CreateQuizContex } from "../Context_Api/CreateQuizStateProvider";
import Navbar from "../Components/NavBar/NavBar";
// import MultipleChoiceShowData from "../Components/CreateQuiz_Components/MultipleChoice/MultipleChoiceShowData";
// import ShortQuestionShowData from "../Components/CreateQuiz_Components/ShortQuestion/ShortQuestionShowData";
// import TrueFalseShowData from "../Components/CreateQuiz_Components/TureFalse/TrueFalseShowData"; // Corrected the import statement

const CreateQuiz = () => {
  const { open, setOpen } = useContext(CreateQuizContex);
  const [componentsToRender, setComponentsToRender] = useState([]);
  const [value, setValue] = useState("Untitled Quiz");
  const [isEditing, setIsEditing] = useState(false);
  const [questionSet, setQuestionSet] = useState([]);
  const [question,setQuestion]=useState({})

  // console.log(question.questions[0].QuestionTitle)

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);

  const handleSave = async () => {
    const currentDate = new Date().toLocaleDateString();
    const newQuestion = {
      date: currentDate,
      questionSetTitle: value,
      questions: questionSet,
    };

    try {
      const response = await fetch(`http://localhost:5000/questionSet`, {
        method: "POST",
        body: JSON.stringify(newQuestion),
        headers: { "Content-type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error posting question:", error);
    }

  
  };


 
  const addComponent = (Component) => {
    // setOpenData(false)
    setComponentsToRender(prev => [
      ...prev,
      <Component key={uuidv4()}   index={prev.length} setQuestionSet={setQuestionSet} questionSet={questionSet} />
    ]);
  };

  return (
    <>
    {/* <Navbar /> */}
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
      {/* {open && question.questions.map((item, index) => (
        item.QuestionType === 'multipleChoice' ?
          <MultipleChoiceShowData key={index} i={index} quizzes={item} /> :
          item.QuestionType === 'shortQuestion' ?
            <ShortQuestionShowData key={index} i={index} quizzes={item} /> :
            <TrueFalseShowData key={index} i={index} item={item} />
      ))} */}
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
    </>
  );
};

export default CreateQuiz;
