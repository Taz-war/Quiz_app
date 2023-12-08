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

// const quizData = {
//   _id: {
//     $oid: "65618bc7285d9f041f7f8dca",
//   },
//   date: "11/25/2023",
//   questionSetTitle: "Fahims first quiz",
//   questions: [
//     {
//       id: "8488dca5-1f5c-478b-9a02-303372d3446f",
//       QuestionType: "multipleChoice",
//       QuestionTitle: "What is your name?",
//       Options: ["Fahim", "shezan"],
//       Point: "10",
//       Answer: null,
//     },
//     {
//       id: "60b44b52-de64-434d-8748-509516214901",
//       QuestionType: "shortQuestion",
//       QuestionTitle: "Describe yourself",
//       Point: "05",
//       Answer: ["im very good person"],
//     },
//     {
//       id: "e284550d-df34-4644-958e-923f2d817af6",
//       QuestionType: "trueFalse",
//       QuestionTitle: "is ur job safe?",
//       Point: "10",
//       Answer: true,
//     },
//   ],
// };

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
