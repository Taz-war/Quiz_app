import React, { useEffect, useState, useTransition } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";

const ShortQuestion = () => {
  const [isPending, startTransition] = useTransition();
  const [shortAnswer, setShortAnswer] = useState([]);

  const [trigger, setTrigger] = useState(false);
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState(0);
  const [answer, setAnswer] = useState(null);
  // console.log(multipleChoice[answer])
  // let tempQuestion = {
  //   "Question":question,
  //   "Options":multipleChoice,
  //   "Point": point,
  //   "Answer":multipleChoice[answer]
  // }
  console.log(shortAnswer);
  let index = 0;
  ///add options////
  const addOption = () => {
    setShortAnswer([...shortAnswer, ""]);
  };
  ////delete option///
  const deleteOption = (index) => {
    const tempArr = [...shortAnswer];
    tempArr.splice(index, 1);
    setShortAnswer(tempArr);
    setTrigger(!trigger);
  };

  useEffect(() => {
    setShortAnswer([]);
    console.log(shortAnswer);
    setShortAnswer([...shortAnswer]);
    // setShortAnswer([]);
    // setTimeout(() => {
    //   setShortAnswer([...shortAnswer]);
    // }, 1000);
    // console.log([...shortAnswer]);
  }, [trigger]);

  const handleOptionChange = (index, newValue) => {
    const tempArr = [...shortAnswer];
    tempArr[index] = newValue;
    setShortAnswer(tempArr);
  };
  return (
    <>
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
        {shortAnswer.map((option, i) => {
          index = i;
          return (
            <ListItem key={i} disablePadding>
              <ListItemButton role={undefined} dense>
                <TextField
                  fullWidth
                  label={"Correct Answer (optional)"}
                  defaultValue={option}
                  placeholder={`${shortAnswer[i]}`}
                  onBlur={(e) => handleOptionChange(i, e.target.value)}
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
      </Card>
    </>
  );
};

export default ShortQuestion;
