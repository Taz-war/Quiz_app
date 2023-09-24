import React, { useEffect, useState, useTransition } from "react";
import {
  Button,
  Card,
  Collapse,
  Grid,
  ListItem,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";

const ShortQuestion = () => {
  const [open, setOpen] = useState(false);
  const [shortAnswer, setShortAnswer] = useState(null);
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState(0);

  let tempShortQuestion = {
    Question: question,
    Point: point,
    Answer: shortAnswer,
  };
  console.log(tempShortQuestion);

  ///add options////
  const addOption = () => {
    setShortAnswer([...shortAnswer, ""]);
  };

  ////delete option///
  const deleteOption = (index) => {
    const tempArr = [...shortAnswer];
    tempArr.splice(index, 1);
    console.log({ tempArr });
    setShortAnswer([...tempArr]);
  };

  const handleOptionChange = debounce((newValue, index) => {
    const tempArr = [...shortAnswer];
    tempArr[index] = newValue;
    setShortAnswer(tempArr);
  });

  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  return <p>Shirdf</p>

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
          </Grid>
          {shortAnswer?.map((option, i) => {
            return (
              <ListItem key={i} disablePadding>
                <ListItemButton role={undefined} dense>
                  <TextField
                    fullWidth
                    label={"Correct Answer (optional)"}
                    // value={option}
                    // placeholder={`${shortAnswer[i]}`}
                    onChange={(e) => handleOptionChange(e.target.value, i)}
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
            {tempShortQuestion.Question}
          </Typography>
        
          {/* {shortAnswer?.map((data,i) => 
           
         
              <p>{data}</p>
           
            
          )} */}
        </Card>
      </Collapse>
    </>
  );
};

export default ShortQuestion;
