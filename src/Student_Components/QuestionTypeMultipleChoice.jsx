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
  Grid,
} from "@mui/material";

const QuestionTypeMultipleChoice = ({ question, answer, onChange }) => {
  return (
    <Paper style={{ padding: "20px", marginBottom: "10px" }}>
      <FormControl component="fieldset" fullWidth>
        <Typography
          component="legend"
          sx={{ fontWeight: "bolder", fontSize: "x-large", mb: 2 }}
        >
          {question.QuestionTitle}
        </Typography>

        <RadioGroup
          aria-label={question.QuestionTitle}
          name="multipleChoice"
          value={answer || ""}
          onChange={onChange}
          sx={{ marginTop: "10px" }}
        >
          <Grid container spacing={2}>
            {question.Options.map((option, i) => (
              <Grid item xs={12} sm={6} key={i}> {/* Adjust grid sizing as needed */}
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={option}
                  sx={{
                    width: '100%', // Set the width to fill the grid item
                    '.MuiTypography-root': { // Apply styles to the label Typography
                      p: 2,
                      border: "1px solid #DEEAF3",
                      width: '100%', // Ensure the label takes full width of the FormControlLabel
                      bgcolor: answer === option ? "#DEEAF3" : "inherit",
                    },
                    '&.MuiFormControlLabel-root': {
                      justifyContent: 'flex-start', // Align radio button and label to the start
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default QuestionTypeMultipleChoice;
