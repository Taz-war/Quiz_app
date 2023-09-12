import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const MultipleChoice = () => {
  const [multipleChoice, setMultipleChoice] = useState({ A: "", B: "" });
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({});
  let index = 0;
  const addOption = () => {
    var letter = String.fromCharCode(index + 66);
    const tempObj = {};
    tempObj[letter] = "";
    setMultipleChoice({ ...multipleChoice, ...tempObj });
  };

  const handleOptionChange = (optionName, newValue) => {
    // const updatedQuestions = [...multipleChoice];
    // updatedQuestions[index][optionName] = newValue;
    // setMultipleChoice(updatedQuestions);
    setMultipleChoice({
      ...multipleChoice,
      [optionName]: newValue,
    });
  };
  console.log(multipleChoice)
  return (
    <>
      <Card sx={{ minWidth: 275, bgcolor: "#F5F7F8" }}>
        <TextField variant="outlined" label="Question" fullWidth sx={{ mb: 2 }}onChange={(e) => setQuestion(e.target.value)}>
          Question
        </TextField>

        {Object.keys(multipleChoice).map((option, i) => {
          index = i;
          return (
            <ListItem key={i} disablePadding>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox edge="start" tabIndex={-1} disableRipple />
                  <Typography mt={1.3} fontWeight={"bolder"}>
                    <b>{option}</b>
                  </Typography>
                </ListItemIcon>
                <TextField fullWidth label={`Option ${option}`} onRateChange={(e)=>handleOptionChange(option,e.target.value)}></TextField>
              </ListItemButton>
            </ListItem>
          );
        })}
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={addOption}
        >
          ADD MORE
        </Button>
      </Card>
    </>
  );
};

export default MultipleChoice;
