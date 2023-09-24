import React, { useState } from "react";
import {
  Button,
  Card,
  Grid,
  ListItem,
  ListItemButton,
  TextField,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";

const ShortQuestion = () => {
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState(0);
  const [shortAnswers, setShortAnswers] = useState(['']);

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
    </Card>
  );
};

export default ShortQuestion;
