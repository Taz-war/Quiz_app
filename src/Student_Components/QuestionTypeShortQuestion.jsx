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

const QuestionTypeShortQuestion = ({ question, answer, onChange }) => {
  return (
    <div>
      <Typography  sx={{ fontWeight: "bolder", fontSize: "x-large",mb:2 }}>{question.QuestionTitle}</Typography>
      <TextField
        fullWidth
        label={question.QuestionTitle}
        variant="outlined"
        value={answer || ""}
        onChange={onChange}       
        sx={{ marginBottom: "10px",bgcolor:'white' }}
      />
    </div>
  );
};

export default QuestionTypeShortQuestion;
