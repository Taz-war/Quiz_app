import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { v4 as uuidv4 } from 'uuid';


const TrueFalseShowData = ({ i, quizzes,setQuestionSet,questionSet }) => {
    const [openComponent, setOpenComponent] = useState(false);
    const [question, setQuestion] = useState(quizzes.QuestionTitle);
    const [point, setPoint] = useState(quizzes.Point);
    const [value, setValue] = useState(quizzes.Answer);
    console.log(quizzes)
  
    
    let tempTrueFalseQuestion = {
      id:quizzes.id,
      QuestionType:'trueFalse',
      QuestionTitle: question,
      Point: point,
      Answer: value,
    };
    console.log({tempTrueFalseQuestion})
    const handleSubmit =()=>{
      setOpenComponent(false)
      const updateArr = questionSet.map((item, index) =>
        index === i ? tempTrueFalseQuestion : item
      );
      setQuestionSet(updateArr)
    }
  
  return (
    <Box>
        <Collapse in={openComponent == false}>
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
                          {`${i + 1} . ${quizzes.QuestionTitle}`}
                      </Typography>
                      <Button
                          variant="contained"
                          color={`${quizzes.Answer === true ? "success" : "error"
                              }`}
                      >
                          {quizzes.Answer === true ? "True" : "False"}
                      </Button>
                  </Grid>
                  <Grid item xs={2} textAlign={'right'}>
                      <IconButton onClick={() => setOpenComponent(true)}>
                          <BorderColorTwoToneIcon
                          fontSize="large"
                              sx={{ bgcolor: "skyblue", color: "white", p: 1 }}
                          />
                      </IconButton>
                  </Grid>
              </Grid>
          </Card>
        </Collapse>
        <Collapse in={openComponent}>
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
                defaultValue={question}
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
                defaultValue={point}
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
                defaultValue={value}
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
    </Box>
  )
}

export default TrueFalseShowData
