import React, { useState } from "react";
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
  const [open,setOpen]= useState(false)
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState(0);
  const [shortAnswers, setShortAnswers] = useState(['']);

  let tempShortQuestion = {
    Question: question,
    Point: point,
    Answer: shortAnswers,
  };

  const addOption = () => {
    setShortAnswers([...shortAnswers, ""]);
  };

  const deleteOption = (index) => {
    const updatedAnswers = [...shortAnswers];
    updatedAnswers.splice(index, 1);
    setShortAnswers(updatedAnswers);
  };

  const handleOptionChange = (newValue, index) => {
    const updatedAnswers = [...shortAnswers];
    updatedAnswers[index] = newValue;
    setShortAnswers(updatedAnswers);
  };

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
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                label="Point"
                fullWidth
                sx={{ mb: 2, mt: 2 }}
                value={point}
                onChange={(e) => setPoint(e.target.value)}
              />
            </Grid>
          </Grid>
          {shortAnswers.map((answer, i) => (
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
          <Button variant="contained" onClick={()=>setOpen(true)}>submit</Button>
        </Card>
      </Collapse>
      <Collapse in={open}>
        {open && (
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
          <Typography fontSize={'x-large'} fontWeight={'bolder'}>{question}</Typography>
          {shortAnswers?.map((data, i) => (
            <Button variant="contained" sx={{ bgcolor: '#E7F6EA', color:"#4EB164"}}>{data}</Button>
          ))}
        </Card>
        )}
      </Collapse>
    </>
  );
};

export default ShortQuestion;
