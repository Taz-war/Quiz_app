import {
  Button,
  Card,
  Collapse,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const TrueFalse = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState(0);
  const [value, setValue] = useState(null);
  let tempTrueFalseQuestion = {
    Question: question,
    Point: point,
    Answer: value,
  };
  console.log(tempTrueFalseQuestion);
  return (
    <>
      <Collapse in={open === false}>
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
                onChange={(e) => setPoint(e.target.value)}
              >
                Point
              </TextField>
            </Grid>
            <Grid item xs={5}>
              <Button
                variant={`${value === true ? "contained" : "outlined"}`}
                color={`${value === true ? "success" : "secondary"}`}
                sx={{ mr: 2 }}
                onClick={() => setValue(true)}
              >
                True
              </Button>
              <Button
                variant={`${value === false ? "contained" : "outlined"}`}
                color={`${value === true ? "secondary" : "error"}`}
                onClick={() => setValue(false)}
              >
                False
              </Button>
            </Grid>
          </Grid>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Submit
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
          <Typography fontSize={"x-large"} fontWeight={"bolder"} mb={2}>
            {tempTrueFalseQuestion.Question}
          </Typography>
          <Button
            variant="contained"
            color={`${
              tempTrueFalseQuestion.Answer === true ? "success" : "error"
            }`}
          >
            {tempTrueFalseQuestion.Answer === true ? "True" : "False"}
          </Button>
        </Card>
      </Collapse>
    </>
  );
};

export default TrueFalse;
