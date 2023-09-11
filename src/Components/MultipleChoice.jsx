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
} from "@mui/material";

const MultipleChoice = () => {
  const McqTemplate = { op1: "", op2: "", op3: "", op4: "" };
  const [multipleChoice, setMultipleChoice] = useState([McqTemplate]);

  const addQuestions = () => {
    setMultipleChoice([...multipleChoice, McqTemplate]);
  };

  const handleOptionChange = (index, optionName, newValue) => {
    const updatedQuestions = [...multipleChoice];
    updatedQuestions[index][optionName] = newValue;
    setMultipleChoice(updatedQuestions);
  };
  return (
    <>
      <Card sx={{ minWidth: 275, bgcolor: "#F5F7F8" }}>

          <TextField variant="outlined" label="Question" fullWidth>
            Question
          </TextField>


        {multipleChoice.map((option, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  // checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  // inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <TextField></TextField>
            </ListItemButton>
          </ListItem>
        ))}
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={addQuestions}
        >
          ADD MORE
        </Button>
      </Card>
    </>
  );
};

export default MultipleChoice;
