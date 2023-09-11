import React, { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Container, Paper, TextField } from '@mui/material';
import MultipleChoice from '../Components/MultipleChoice';

const Create_Quiz = () => {
  const [openMcq,setOpenMcq] = useState(false);
  const [openShortAnswer,setOpenShortAnswer] = useState(false);
  const [openTrueFalse,setOpenTrueFalse] = useState(false);
  return (
    <Paper component={Container}>
      <Box p={2}>
        {openMcq && <MultipleChoice />}
      <Button variant='contained' sx={{mr:2}} onClick={()=>setOpenMcq(true)}> Multiple Choice</Button>
      <Button variant='contained'sx={{mr:2}}> Short Answer</Button>
      <Button variant='contained'sx={{mr:2}}> True/False</Button>
      </Box>
    </Paper>
  );
};

export default Create_Quiz;
