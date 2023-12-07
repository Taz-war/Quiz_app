import React from "react";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Paper,
  FormLabel,
} from "@mui/material";

const QuestionTypeMultipleChoice = ({ question, answer, onChange }) => {
  return (
    <Paper style={{ padding: "20px", marginBottom: "10px" }}>
      <FormControl component="fieldset" fullWidth>
        <Typography
          component="legend"
          sx={{ fontWeight: "bolder", fontSize: "x-large",mb:2 }}
        >
          {question.QuestionTitle}
        </Typography>
        <RadioGroup
          row
          aria-label={question.QuestionTitle}
          name="multipleChoice"
          value={answer || ""}
          onChange={onChange}
          sx={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }}
        >
          {question.Options.map((option,i) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio size="medium"/>}
              label={
                <Typography
                  p={2}
                  border={"1px solid #DEEAF3"}
                  width={"100%"}
                  color={'black'}
                  sx={{ bgcolor: answer === option ? "#DEEAF3" : "inherit" }}
                >
                  {option}
                </Typography>
              }
              sx={{
                // Change the color if this option is selected
                width: "40%",
                color: answer === option ? "primary.main" : "inherit",
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default QuestionTypeMultipleChoice;
