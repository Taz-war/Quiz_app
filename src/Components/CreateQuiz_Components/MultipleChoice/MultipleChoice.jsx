import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { v4 as uuidv4 } from 'uuid';

const MultipleChoice = ({ index,setQuestionSet,questionSet,open,setOpen }) => {
  let serialNum = index;
  const [openData, setOpenData] = useState(false);
  const [multipleChoice, setMultipleChoice] = useState(["", ""]);
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState(0);
  const [answer, setAnswer] = useState(null);

  // console.log({item})

  let tempQuestion = {
    id:uuidv4(),
    QuestionType:'multipleChoice',
    QuestionTitle: question,
    Options: multipleChoice,
    Point: point,
    Answer: answer,
  };
  
  ////on submit button click////
  const  handleSubmit =()=>{
    setOpen(true)
    setOpenData(true)
    setQuestionSet([...questionSet,tempQuestion])
  }
  ///add options////
  const addOption = () => {
    setMultipleChoice([...multipleChoice, ""]);
  };

  ////delete option///
  const deleteOption = (index) => {
    const updatedAnswers = [...multipleChoice];
    updatedAnswers.splice(index, 1);
    setMultipleChoice(updatedAnswers);
  };

  const handleOptionChange = debounce((index, newValue) => {
    const updatedAnswers = [...multipleChoice];
    updatedAnswers[index] = newValue;
    setMultipleChoice(updatedAnswers);
  });
  function debounce(func, timeout = 50) {
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
      <Collapse in={open === false || openData === false}>
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
          {multipleChoice.map((option, i) => {
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
                    value={option}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                  />
                  <DeleteOutlineOutlinedIcon
                    sx={{ color: "red", ml: 1, fontSize: "xx-large" }}
                    onClick={() => deleteOption(i)}
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
          <Button
            variant="contained"
            size="small"
            sx={{ ml: 2, mt: 2 }}
            onClick={() => handleSubmit()}
          >
            submit
          </Button>
        </Card>
      </Collapse>
      <Collapse in={open || openData}>
        <Card
          sx={{
            minWidth: 275,
            bgcolor: "#FFFFF",
            mt: 2,
            p: 2,
            textAlign: "left",
            mb: 2,
          }}
        >
          <Grid container columns={12} columnSpacing={2}>
            <Grid item xs={10}>
              {
                <Typography fontSize={"x-large"} fontWeight={"bolder"}>
                  {`${serialNum + 1} . ${tempQuestion.QuestionTitle}`}
                </Typography>
              }
              {multipleChoice.map((data, i) => (
                <Typography key={i} ml={3}>
                  <b>{`${String.fromCharCode(i + 65)} .`}</b> {` ${data}`}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={2} textAlign={"right"}>
              <IconButton onClick={() => setOpen(false)}>
                <BorderColorTwoToneIcon
                  sx={{ bgcolor: "skyblue", color: "white", p: 1 }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Collapse>
    </>
  );
};

export default MultipleChoice;
