import React, { useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { v4 as uuidv4 } from 'uuid';

const Create_Quiz = () => {
  const [componentsToRender, setComponentsToRender] = useState([]);
  const [open, setOpen] = useState(false);
  ///for title edit////
  const [value, setValue] = useState("Untitled Quiz");
  const [isEditing, setIsEditing] = useState(false);
  const [questionSet, setQuestionSet] = useState([]);
  const [question,setQuestion] = useState({id:null,questionSetTitle:'',questions:[]})

  const { v4: uuidv4 } = require('uuid');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  ////save question set///
  const handleSave =()=>{
    setQuestion({
      id:uuidv4(),
      questionSetTitle:value,
      questions:[...questionSet]
    })
  }
  console.log({question})
  // Function to add components to the list
  const addComponent = (Component) => {
    setOpen(false);
    setComponentsToRender((prevComponents) => [
      ...prevComponents,
      <Component
        key={prevComponents.length}
        index={prevComponents.length}
        open={open}
        setOpen={setOpen}
        setQuestionSet={setQuestionSet}
        questionSet={questionSet}
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
            onClick={()=>handleSave()}
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

export default Create_Quiz;
