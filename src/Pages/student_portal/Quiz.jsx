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
  Grid,
} from "@mui/material";
import QuestionTypeMultipleChoice from "../../Student_Components/QuestionTypeMultipleChoice";
import QuestionTypeShortQuestion from "../../Student_Components/QuestionTypeShortQuestion";
import QuestionTypeTrueFalse from "../../Student_Components/QuestionTypeTrueFalse";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";
import { Alert, Spin } from "antd";
import { url } from "../../api";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examStarted, setExamStarted] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ ...studenData });
  const currentQuestion = quizData.questions[currentQuestionIndex];
  const socket = io(`${url}`);
  const navigate = useNavigate();

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
    } else if (currentQuestionIndex === quizData.questions.length - 1) {
      // Handle quiz completion
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setExamStarted(false);
      console.log("Quiz Completed", answers);
      const updatedStudentInfo = { ...studentInfo, answer: answers };
      setStudentInfo(updatedStudentInfo);
      // setStudentInfo({ ...studentInfo, answer: answers });

      try {
        const response = await fetch(`${url}/student/loginInfo/${id}`, {
          method: "PUT",
          body: JSON.stringify(updatedStudentInfo),
          headers: { "Content-type": "application/json" },
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log(data);
        navigate("/");
      } catch (error) {
        console.error("Error posting question:", error);
      }
    }
  };

  ///handle back button///
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleChange = (event) => {
    if (currentQuestion && typeof currentQuestion.id !== "undefined") {
      setAnswers({ ...answers, [currentQuestion.id]: event.target.value });
    }
    // setAnswers({ ...answers, [currentQuestion.id]: event.target.value });
  };

  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

  return (
    <>
      <Collapse in={examStarted}>
        <div style={{ padding: "20px" }}>
          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            {`${
              currentQuestionIndex + 1 < quizData.questions.length
                ? currentQuestionIndex + 1
                : quizData.questions.length
            } of ${quizData?.questions.length || 0}`}
          </Typography>
          <Container
            sx={{
              bgcolor: "#DFEAF3",
              p: 4,
              textAlign: "left",
              justifyContent: "space-between",
            }}
            maxWidth="sm"
          >
            {currentQuestion && (
              <QuestionRenderer
                question={currentQuestion}
                answer={answers[currentQuestion.id]}
                onChange={handleChange}
              />
            )}
            <Grid container columns={12}>
              <Grid item xs={6} pl={1}>
                {currentQuestionIndex > 0 && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleBack}
                    style={{ marginRight: "10px", marginTop: "20px" }}
                  >
                    Back
                  </Button>
                )}
              </Grid>
              <Grid item xs={6} textAlign={'right'} pr={1}>
                {/* Modify button text based on question position */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  sx={{ marginTop: "20px", alignSelf: "end" }}
                  disabled={!currentQuestion} // Disable the button if there's no current question
                >
                  {isLastQuestion ? "Submit Quiz" : "Next"}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Collapse>
      <Collapse in={examStarted === false}>
        <Container
          sx={{ bgcolor: "#DFEAF3", p: 4, textAlign: "left", mt: 4 }}
          maxWidth="sm"
        >
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
