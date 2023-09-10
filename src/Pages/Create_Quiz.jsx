import React, { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Paper, TextField } from '@mui/material';

const Create_Quiz = () => {
  const McqTemplate = { op1: "", op2: "", op3: "", op4: "" };
  const [multipleChoice, setMultipleChoice] = useState([McqTemplate]);

  const addQuestions = () => {
    setMultipleChoice([...multipleChoice, McqTemplate]);
  };

  const handleOptionChange = (index, optionName, newValue) => {
    const updatedQuestions = [...multipleChoice];
    updatedQuestions[index][optionName] = newValue;
    setMultipleChoice(updatedQuestions);
  };

  return (
    <Paper component={Box}>
      {multipleChoice.map((option, index) => (
        <Card sx={{ minWidth: 275 }} key={index}>
          <CardContent>
            <TextField
              fullWidth
              variant='outlined'
              value={option.op1}
              onChange={(e) => handleOptionChange(index, 'op1', e.target.value)}
            />
          </CardContent>
          <CardContent>
            <TextField
              fullWidth
              variant='outlined'
              value={option.op2}
              onChange={(e) => handleOptionChange(index, 'op2', e.target.value)}
            />
          </CardContent>
          <CardContent>
            <TextField
              fullWidth
              variant='outlined'
              value={option.op3}
              onChange={(e) => handleOptionChange(index, 'op3', e.target.value)}
            />
          </CardContent>
          <CardContent>
            <TextField
              fullWidth
              variant='outlined'
              value={option.op4}
              onChange={(e) => handleOptionChange(index, 'op4', e.target.value)}
            />
          </CardContent>
        </Card>
      ))}
      <Button size="small" color='primary' variant='contained' onClick={addQuestions}>
        ADD MORE
      </Button>
    </Paper>
  );
};

export default Create_Quiz;
