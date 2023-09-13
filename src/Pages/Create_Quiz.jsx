import React, { useState } from 'react';
import { Box, Button, Paper, Container } from '@mui/material';
import MultipleChoice from '../Components/MultipleChoice';
import ShortQuestion from '../Components/ShortQuestion';
import TrueFalse from '../Components/TrueFalse';

const Create_Quiz = () => {
  const [componentsToRender, setComponentsToRender] = useState([]);

  // Function to add components to the list
  const addComponent = (component) => {
    setComponentsToRender([...componentsToRender, component]);
  };

  return (
    <Paper component={Container}>
      <Box p={2}>
        {componentsToRender.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => addComponent(<MultipleChoice key={componentsToRender.length} />)}
        >
          Multiple Choice
        </Button>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => addComponent(<ShortQuestion key={componentsToRender.length} />)}
        >
          Short Answer
        </Button>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => addComponent(<TrueFalse key={componentsToRender.length} />)}
        >
          True/False
        </Button>
      </Box>
    </Paper>
  );
};

export default Create_Quiz;
