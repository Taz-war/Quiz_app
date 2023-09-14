import React, { useState,useTransition } from "react";
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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';

const ShortQuestion = () => {
    const [isPending,startTransition]=useTransition()
    const [shortAnswer, setShortAnswer] = useState(['','']);
    const [question, setQuestion] = useState("");
    const [point, setPoint] = useState(0);
    const [answer,setAnswer] = useState(null)
    // console.log(multipleChoice[answer])
    // let tempQuestion = {
    //   "Question":question,
    //   "Options":multipleChoice,
    //   "Point": point,
    //   "Answer":multipleChoice[answer]
    // }
    console.log(shortAnswer)
    let index = 0;
    ///add options////
    const addOption = () => {
      const tempObj = {};
      tempObj[index+2] = "";
      setShortAnswer( ...shortAnswer, '' );
    };
  ////delete option///
//   const deleteOption = (optionName) => {
//     const updatedOptions = { ...shortAnswer };
//     delete updatedOptions[optionName];
//     const result = {};
//     Object.keys(updatedOptions).forEach((item, index) => {
//       result[index+1] = updatedOptions[item]
//     })
  
//     setMultipleChoice(result);
//   };
  
    const handleOptionChange = (index, newValue) => {
       const  tempArr=[]
        tempArr.splice(index, 0, newValue)
        setShortAnswer(tempArr)
    };
    return (
        <>
          <Card sx={{ minWidth: 275, bgcolor: "#F5F7F8",mt:2,p:2,textAlign:'left',mb:2 }}>
            <Grid container columns={12} columnSpacing={2}>
            <Grid item xs={8}>
            <TextField variant="outlined" label="Question" fullWidth sx={{ mb: 2 ,mt:2}} onBlur={(e) => setQuestion(e.target.value)}>
              Question
            </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField variant="outlined" label="Point" fullWidth sx={{ mb: 2 ,mt:2}} onChange={(e)=>setPoint(e.target.value)}>Point</TextField>
            </Grid>
            </Grid>
            {shortAnswer.map((option, i) => {
              index = i;
              return (
                <ListItem key={i} disablePadding>
                  <ListItemButton role={undefined} dense>
                    {/* <ListItemIcon>
                      <Checkbox edge="start" tabIndex={-1} disableRipple checked={answer === option} onChange={()=>setAnswer(option)}/>
                      <Typography mt={1.3} fontWeight={"bolder"}>
                        <b>{String.fromCharCode(i + 65)}</b>
                      </Typography>
                    </ListItemIcon> */}
                    <TextField fullWidth label={'Correct Answer'} placeholder="Correct Answer(optional)" onBlur={(e)=>handleOptionChange(i,e.target.value)} />
                    <DeleteOutlineOutlinedIcon sx={{color:'red',ml:1,fontSize:'xx-large'}} />
                  </ListItemButton>
                </ListItem>
              );
            })}
            <Button
              size="small"
              variant="outlined"
              sx={{mt:2,bgcolor:'#E9EEFB',color:'navy'}}
              startIcon={<AddIcon />}
              onClick={addOption}
            >
              ADD MORE Options
            </Button>
          </Card>
        </>
      );
}

export default ShortQuestion
