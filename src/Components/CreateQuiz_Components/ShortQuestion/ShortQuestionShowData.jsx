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
import { v4 as uuidv4 } from "uuid";

const ShortQuestionShowData = ({ i, quizzes, setQuestionSet, questionSet }) => {
  const [openComponent, setOpenComponent] = useState(false);
  const [question, setQuestion] = useState(quizzes.QuestionTitle);
  const [point, setPoint] = useState(quizzes.Point);
  const [shortAnswers, setShortAnswers] = useState(quizzes.Answer);

  let tempShortQuestion = {
    id: quizzes.id,
    QuestionType: "shortQuestion",
    QuestionTitle: question,
    Point: point,
    Answer: shortAnswers,
  };
  console.log(tempShortQuestion);

  ///add option///
  const addOption = () => {
    setShortAnswers([...shortAnswers, ""]);
  };

  ///delete option///
  const deleteOption = (index) => {
    const updatedAnswers = [...shortAnswers];
    updatedAnswers.splice(index, 1);
    setShortAnswers(updatedAnswers);
  };

  ///onchange options///
  const handleOptionChange = (newValue, index) => {
    const updatedAnswers = [...shortAnswers];
    updatedAnswers[index] = newValue;
    setShortAnswers(updatedAnswers);
  };

  ///on submit///
  const handleSubmit = () => {
    if (shortAnswers[0] === "") {
      setShortAnswers([]);
    }
    const updateArr = questionSet.map((item, index) =>
      index === i ? tempShortQuestion : item
    );
    setQuestionSet(updateArr);
    setOpenComponent(false);
  };
  console.log({ quizzes });

  ///validation function///
  const isSubmitDisabled = () => {
    const isQuestionEmpty = !question.trim();
    const isPointEmpty = !point;
    const isAnyAnswerFilled = shortAnswers.some(answer => answer.trim());

    return isQuestionEmpty || isPointEmpty || !isAnyAnswerFilled;
  };

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
              <Typography fontSize={"x-large"} fontWeight={"bolder"}>{`${
                i + 1
              } . ${quizzes.QuestionTitle}`}</Typography>
              {shortAnswers.length > 0 &&
                shortAnswers.map((data, i) => (
                  <Button
                    key={i}
                    variant="contained"
                    sx={{
                      bgcolor: "#E7F6EA",
                      color: "#4EB164",
                      mr: 2,
                      "&:hover": {
                        bgcolor: "#E7F6EA",
                      },
                    }}
                  >
                    {data}
                  </Button>
                ))}
            </Grid>
            <Grid item xs={2} textAlign={"right"}>
              <IconButton onClick={() => setOpenComponent(true)}>
                <BorderColorTwoToneIcon
                  fontSize="large"
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
                sx={{ mb: 2, mt: 2 }}
                defaultValue={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                label="Point"
                fullWidth
                defaultValue={point}
                sx={{ mb: 2, mt: 2 }}
                onChange={(e) => setPoint(e.target.value)}
              >
                Point
              </TextField>
            </Grid>
          </Grid>
          {shortAnswers.length > 0 &&
            shortAnswers.map((answer, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton role={undefined} dense>
                  <TextField
                    fullWidth
                    label="Correct Answer (optional)"
                    value={answer}
                    onChange={(e) => handleOptionChange(e.target.value, i)}
                  />
                  <DeleteOutlineOutlinedIcon
                    sx={{ color: "red", ml: 1, fontSize: "xx-large" }}
                    onClick={() => deleteOption(i)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
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
            disabled={isSubmitDisabled()}
          >
            submit
          </Button>
        </Card>
      </Collapse>
    </Box>
  );
};

export default ShortQuestionShowData;
