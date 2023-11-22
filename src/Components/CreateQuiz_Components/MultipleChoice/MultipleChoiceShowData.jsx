import React, { useState } from "react";
import {
  Box,
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

const MultipleChoiceShowData = ({
  i,
  quizzes,
  setQuestionSet,
  questionSet,
}) => {
  const [openComponent, setOpenComponent] = useState(false);
  const [multipleChoice, setMultipleChoice] = useState([...quizzes?.Options]);
  const [question, setQuestion] = useState(quizzes?.QuestionTitle);
  const [point, setPoint] = useState(quizzes?.Point);
  const [answer, setAnswer] = useState(quizzes?.Answer);

  let tempQuestion = {
    QuestionType: "multipleChoice",
    QuestionTitle: question,
    Options: multipleChoice,
    Point: point,
    Answer: answer,
  };

  ////on submit button click////
  const handleSubmit = () => {
    setOpenComponent(false);
    const updateArr = questionSet.map((item, index) =>
      index === i ? tempQuestion : item
    );
    setQuestionSet(updateArr);
  };
  console.log({ questionSet });
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

  const handleOptionChange = (index, newValue) => {
    const updatedAnswers = [...multipleChoice];
    updatedAnswers[index] = newValue;
    setMultipleChoice(updatedAnswers);
  };
  console.log({ i });
  return (
    <Box>
      <Collapse in={openComponent == false}>
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
                  {`${i + 1} . ${question}`}
                </Typography>
              }
              {multipleChoice.map((data, i) => (
                <Typography key={i} ml={3}>
                  <b>{`${String.fromCharCode(i + 65)} .`}</b> {` ${data}`}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={2} textAlign={"right"}>
              <IconButton onClick={() => setOpenComponent(true)}>
                <BorderColorTwoToneIcon
                  sx={{ bgcolor: "skyblue", color: "white", p: 1 }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Collapse>
      <Collapse in={openComponent}>
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
                defaultValue={quizzes?.QuestionTitle}
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
                defaultValue={quizzes?.Point}
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
    </Box>
  );
};

export default MultipleChoiceShowData;
