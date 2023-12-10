import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Paper,
  FormLabel,
  Container,
} from "@mui/material";
import QuestionTypeMultipleChoice from "../../Student_Components/QuestionTypeMultipleChoice";
import QuestionTypeShortQuestion from "../../Student_Components/QuestionTypeShortQuestion";
import QuestionTypeTrueFalse from "../../Student_Components/QuestionTypeTrueFalse";
import { useLocation } from "react-router-dom";



const QuestionRenderer = ({ question, answer, onChange }) => {
  switch (question.QuestionType) {
    case "multipleChoice":
      return (
        <QuestionTypeMultipleChoice
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );
    case "shortQuestion":
      return (
        <QuestionTypeShortQuestion
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );
    case "trueFalse":
      return (
        <QuestionTypeTrueFalse
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};

const Quiz = () => {
  const location = useLocation()
  const quizData = location.state?.data;
  console.log({ quizData })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle quiz completion
      console.log("Quiz Completed", answers);
    }
  };

  const handleChange = (event) => {
    setAnswers({ ...answers, [currentQuestion.id]: event.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        {`${currentQuestionIndex + 1} of ${quizData.questions.length}`}
      </Typography>
      <Container sx={{bgcolor:'#DFEAF3',p:4,textAlign:'left'}}>
        <QuestionRenderer
          question={currentQuestion}
          answer={answers[currentQuestion.id]}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          style={{ marginTop: "20px" }}
        >
          Submit Answer
        </Button>
      </Container>
    </div>
  );
};

export default Quiz;
