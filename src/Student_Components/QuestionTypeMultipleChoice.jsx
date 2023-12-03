import React from "react";
import {
    Button,
    TextField,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Typography,Paper,FormLabel
  } from "@mui/material";

const QuestionTypeMultipleChoice = ({ question, answer, onChange }) => {
  return (
    <Paper style={{ padding: "20px", marginBottom: "10px" }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{question.QuestionTitle}</FormLabel>
        <RadioGroup
          aria-label={question.QuestionTitle}
          name="multipleChoice"
          value={answer || ""}
          onChange={onChange}
          style={{ marginTop: "10px" }}
        >
          {question.Options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default QuestionTypeMultipleChoice;
