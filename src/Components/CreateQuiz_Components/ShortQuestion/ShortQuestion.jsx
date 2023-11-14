import React, { useState } from "react";
import {
  Button,
  Card,
  Collapse,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { v4 as uuidv4 } from 'uuid';

const ShortQuestion = ({ index,setQuestionSet,questionSet,open,setOpen  }) => {
  let serialNum = index;
  // const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState(0);
  const [shortAnswers, setShortAnswers] = useState([""]);

  let tempShortQuestion = {
    id:uuidv4(),
    QuestionType:'shortQuestion',
    QuestionTitle: question,
    Point: point,
    Answer: shortAnswers,
  };
  
  ///add option///
  const addOption = () => {
    setShortAnswers([...shortAnswers, ""]);
  };

  ///delete option///
  const deleteOption = (index) => {
    const updatedAnswers = [...shortAnswers];
    updatedAnswers.splice(index, 1);
    setShortAnswers(updatedAnswers);
  };

  ///onchange options///
  const handleOptionChange = (newValue, index) => {
    const updatedAnswers = [...shortAnswers];
    updatedAnswers[index] = newValue;
    setShortAnswers(updatedAnswers);
  };

  ///on submit///
  const handleSubmit = () => {
    if (shortAnswers[0] === "") {
      setShortAnswers([]);
    }
    setOpen(true);
    setQuestionSet([...questionSet,tempShortQuestion])
  };
  return (
    <>
      <Collapse >
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
          {shortAnswers.length > 0 &&
            shortAnswers.map((answer, i) => (
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
          <Button variant="contained" size="small" sx={{ml:2,mt:2}} onClick={() => handleSubmit()}>
            submit
          </Button>
        </Card>
      </Collapse>
      {/* <Collapse in={open}>
        
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
                <Typography fontSize={"x-large"} fontWeight={"bolder"}>{`${serialNum + 1} . ${question}`}</Typography>
                {shortAnswers.length > 0 &&
                  shortAnswers.map((data, i) => (
                    <Button
                      key={i}
                      variant="contained"
                      sx={{ bgcolor: "#E7F6EA", color: "#4EB164",mr:2,'&:hover':{
                        bgcolor:"#E7F6EA"
                      } }}
                    >
                      {data}
                    </Button>
                  ))}
              </Grid>
              <Grid item xs={2} textAlign={"right"}>
                <IconButton onClick={()=>setOpen(false)}>
                  <BorderColorTwoToneIcon
                    sx={{ bgcolor: "skyblue", color: "white", p: 1 }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
       
      </Collapse> */}
    </>
  );
};

export default ShortQuestion;
