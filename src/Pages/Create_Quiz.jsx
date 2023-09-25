import React, { useState } from "react";
import { Box, Button, Container, Paper } from "@mui/material";
import MultipleChoice from "../Components/CreateQuiz_Components/MultipleChoice";
import ShortQuestion from "../Components/CreateQuiz_Components/ShortQuestion";
import TrueFalse from "../Components/CreateQuiz_Components/TrueFalse";

const Create_Quiz = () => {
  const [componentsToRender, setComponentsToRender] = useState([]);
  const [open,setOpen]= useState(false)

  // Function to add components to the list
  const addComponent = (Component) => {
    setOpen(false)
    setComponentsToRender((prevComponents) => [
      ...prevComponents,
      <Component key={prevComponents.length} index={prevComponents.length} open={open} setOpen={setOpen}/>,
    ]);
  };

  return (
    <Container>
      <Paper sx={{ p: 2, mt: 2 }}>
        {componentsToRender.map((component, index) => (
          <Box key={index}>{component}</Box>
        ))}
        <Box p={2}>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
              mb:2,
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
