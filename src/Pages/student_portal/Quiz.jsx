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
  Collapse,
} from "@mui/material";
import QuestionTypeMultipleChoice from "../../Student_Components/QuestionTypeMultipleChoice";
import QuestionTypeShortQuestion from "../../Student_Components/QuestionTypeShortQuestion";
import QuestionTypeTrueFalse from "../../Student_Components/QuestionTypeTrueFalse";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";
import { Alert, Spin } from "antd";

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
  const location = useLocation();
  const quizData = location.state?.data;
  const studenData = location.state?.studentData;
  const id = location.state?.id;
  const roomName = location.state?.roomName;
  console.log({ id });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examStarted, setExamStarted] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ ...studenData });
  const currentQuestion = quizData.questions[currentQuestionIndex];
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.emit(
      "joinRoom",
      roomName,
      studenData,
      quizData.questions.length,
      currentQuestionIndex
    );

    socket.on("examStarted", (data) => {
      console.log("examStarted", data.examStarted);
      setExamStarted(data.examStarted);
    });

    socket.on("message", (message) => {
      console.log("fahimTazwer", message);
    });
    // socket.emit("sendMessage", { room: "C7h9EM", message: "message" });
  }, [socket, currentQuestionIndex]);

  const handleNext = async () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle quiz completion
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log("Quiz Completed", answers);
      const updatedStudentInfo = { ...studentInfo, answer: answers };
      setStudentInfo(updatedStudentInfo);
      // setStudentInfo({ ...studentInfo, answer: answers });

      try {
        const response = await fetch(
          `http://localhost:5000/student/loginInfo/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedStudentInfo),
            headers: { "Content-type": "application/json" },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error posting question:", error);
      }
    }
  };
  console.log("final answer", studentInfo);

  const handleChange = (event) => {
    if (currentQuestion && typeof currentQuestion.id !== 'undefined') {
      setAnswers({ ...answers, [currentQuestion.id]: event.target.value });
    }
    // setAnswers({ ...answers, [currentQuestion.id]: event.target.value });
  };


  return (
    <>
      <Collapse in={examStarted}>
        <div style={{ padding: "20px" }}>
          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            {`${currentQuestionIndex + 1} of ${quizData?.questions.length || 0}`}
          </Typography>
          <Container sx={{ bgcolor: "#DFEAF3", p: 4, textAlign: "left" }} maxWidth='sm'>
            {currentQuestion && (
              <QuestionRenderer
                question={currentQuestion}
                answer={answers[currentQuestion.id]}
                onChange={handleChange}
              />
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              style={{ marginTop: "20px" }}
              disabled={!currentQuestion} // Disable the button if there's no current question
            >
              Submit Answer
            </Button>
          </Container>
        </div>
      </Collapse>
      <Collapse in={examStarted === false}>
        <Container sx={{ bgcolor: "#DFEAF3", p: 4, textAlign: "left",mt:4 }} maxWidth='sm'>
          
          <Spin tip="Loading..." size="large">
            <Alert
              type="info"
              message="Quiz hasn't started yet"
              description="When the quiz starts you'll automatically able to access the quiz"
            />
          </Spin>
        </Container>
      </Collapse>
    </>
  );
};

export default Quiz;
