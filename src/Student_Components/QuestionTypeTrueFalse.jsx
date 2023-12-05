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

const QuestionTypeTrueFalse = ({ question, answer, onChange }) => {
  console.log({answer})
  return (
    <div>
      <Paper style={{ padding: "20px", marginBottom: "10px" }}>
        <FormControl component="fieldset" fullWidth>
          <Typography
            component="legend"
            sx={{ fontWeight: "bolder", fontSize: "x-large", mb: 2 }}
          >
            {question.QuestionTitle}
          </Typography>
          <RadioGroup
            aria-label="trueFalse"
            name="trueFalse"
            value={answer || ""}
            onChange={onChange}
            row
            sx={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }}
          >
            <FormControlLabel
              value="true"
              control={<Radio size="large" />}
              label={
                <Typography
                  p={2}
                  border={"1px solid #DEEAF3"}
                  width={"100%"}
                  color={"black"}
                  sx={{ bgcolor: answer === 'true' ? "#DEEAF3" : "inherit" }}
                >
                  True
                </Typography>
              }
              sx={{ width: "40%" }}
            />
            <FormControlLabel
              value="false"
              control={<Radio size="large" />}
              label={
                <Typography
                  p={2}
                  border={"1px solid #DEEAF3"}
                  width={"100%"}
                  color={"black"}
                  sx={{ bgcolor: answer === 'false' ? "#DEEAF3" : "inherit" }}
                >
                  False
                </Typography>
              }
              sx={{ width: "40%" }}
            />
          </RadioGroup>
        </FormControl>
      </Paper>
    </div>
  );
};

export default QuestionTypeTrueFalse;
