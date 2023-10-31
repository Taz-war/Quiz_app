import {
  Button,
  Card,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { v4 as uuidv4 } from 'uuid';

const TrueFalse = ({ index,setQuestionSet,questionSet }) => {
  let serialNum = index;
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState(0);
  const [value, setValue] = useState(null);

  
  let tempTrueFalseQuestion = {
    id:uuidv4(),
    QuestionType:'trueFalse',
    QuestionTitle: question,
    Point: point,
    Answer: value,
  };
  
  const handleSubmit =()=>{
    setOpen(true)
    setQuestionSet([...questionSet,tempTrueFalseQuestion])
  }

  // console.log(tempTrueFalseQuestion);
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
          <Button variant="contained" size="small" sx={{mt:2}} onClick={() => handleSubmit()}>
            Submit
          </Button>
        </Card>
      </Collapse>
      <Collapse in={open}>
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
              <Typography fontSize={"x-large"} fontWeight={"bolder"} mb={2}>
                {`${serialNum + 1} . ${tempTrueFalseQuestion.QuestionTitle}`}
              </Typography>
              <Button
                variant="contained"
                color={`${
                  tempTrueFalseQuestion.Answer === true ? "success" : "error"
                }`}
              >
                {tempTrueFalseQuestion.Answer === true ? "True" : "False"}
              </Button>
            </Grid>
            <Grid item xs={2} textAlign={'right'}>
              <IconButton onClick={()=>setOpen(false)}>
                <BorderColorTwoToneIcon
                  sx={{ bgcolor: "skyblue", color: "white",p:1 }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Collapse>
    </>
  );
};

export default TrueFalse;
