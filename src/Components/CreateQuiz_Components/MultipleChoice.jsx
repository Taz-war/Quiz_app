import React, { useState, useTransition } from "react";
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";

const MultipleChoice = () => {
  const [open, setOpen] = useState(false);
  const [multipleChoice, setMultipleChoice] = useState({ 1: "", 2: "" });
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState(0);
  const [answer, setAnswer] = useState(null);
  // console.log(multipleChoice[answer])
  let tempQuestion = {
    Question: question,
    Options: multipleChoice,
    Point: point,
    Answer: multipleChoice[answer],
  };
  console.log(tempQuestion);
  let index = 0;
  ///add options////
  const addOption = () => {
    const tempObj = {};
    tempObj[index + 2] = "";
    setMultipleChoice({ ...multipleChoice, ...tempObj });
  };
  ////delete option///
  const deleteOption = (optionName) => {
    const updatedOptions = { ...multipleChoice };
    delete updatedOptions[optionName];
    const result = {};
    Object.keys(updatedOptions).forEach((item, index) => {
      result[index + 1] = updatedOptions[item];
    });

    setMultipleChoice(result);
  };

  const handleOptionChange = debounce((optionName, newValue) => {
    setMultipleChoice({
      ...multipleChoice,
      [optionName]: newValue,
    });
  });
  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  return (
    <>
    <Collapse in={open===false}>
      <Card
        sx={{
          minWidth: 275,
          bgcolor: "#F5F7F8",
          mt: 2,
          p: 2,
          textAlign: "left",
          mb: 2,
        }}
      >
        <Grid container columns={12} columnSpacing={2}>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              label="Question"
              fullWidth
              sx={{ mb: 2, mt: 2 }}
              onBlur={(e) => setQuestion(e.target.value)}
            >
              Question
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              label="Point"
              fullWidth
              sx={{ mb: 2, mt: 2 }}
              onBlur={(e) => setPoint(e.target.value)}
            >
              Point
            </TextField>
          </Grid>
        </Grid>
        {Object.keys(multipleChoice).map((option, i) => {
          index = i;
          return (
            <ListItem key={i} disablePadding>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    checked={answer === option}
                    onChange={() => setAnswer(option)}
                  />
                  <Typography mt={1.3} fontWeight={"bolder"}>
                    <b>{String.fromCharCode(i + 65)}</b>
                  </Typography>
                </ListItemIcon>
                <TextField
                  fullWidth
                  label={`Option ${String.fromCharCode(i + 65)}`}
                  onChange={(e) => handleOptionChange(option, e.target.value)}
                />
                <DeleteOutlineOutlinedIcon
                  sx={{ color: "red", ml: 1, fontSize: "xx-large" }}
                  onClick={() => deleteOption(option)}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        <Button
          size="small"
          variant="outlined"
          sx={{ mt: 2, bgcolor: "#E9EEFB", color: "navy" }}
          startIcon={<AddIcon />}
          onClick={addOption}
        >
          ADD MORE Options
        </Button>
        <Button variant="contained" onClick={() => setOpen(true)}>
          submit
        </Button>
      </Card>
      </Collapse>
      <Collapse in={open}>
        <Card
          sx={{
            minWidth: 275,
            bgcolor: "#F5F7F8",
            mt: 2,
            p: 2,
            textAlign: "left",
            mb: 2,
          }}
        >
          {<Typography fontSize={'x-large'} fontWeight={'bolder'}>{tempQuestion.Question}</Typography>}
          {Object.keys(multipleChoice).map((data,i) => (
            <Typography><b>{`${String.fromCharCode(i + 65)}`}</b> {` ${multipleChoice[data]}`}</Typography>
          ))}
        </Card>
      </Collapse>
    </>
  );
};

export default MultipleChoice;
