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

const QuestionTypeTrueFalse = ({ question, answer, onChange }) => {
  return (
    <div>
      <Paper style={{ padding: "20px", marginBottom: "10px" }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{question.QuestionTitle}</FormLabel>
          <RadioGroup
            aria-label="trueFalse"
            name="trueFalse"
            value={answer || ""}
            onChange={onChange}
            row
            style={{ marginTop: "10px" }}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
      </Paper>
    </div>
  );
};

export default QuestionTypeTrueFalse;
