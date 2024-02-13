import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  Collapse,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { Alert, Spin } from "antd";
import { url } from "../../api";

import QuestionTypeMultipleChoice from "../../Student_Components/QuestionTypeMultipleChoice";
import QuestionTypeShortQuestion from "../../Student_Components/QuestionTypeShortQuestion";
import QuestionTypeTrueFalse from "../../Student_Components/QuestionTypeTrueFalse";

const QuestionRenderer = ({ question, answer, onChange }) => {
  switch (question.QuestionType) {
    case "multipleChoice":
      return <QuestionTypeMultipleChoice question={question} answer={answer} onChange={onChange} />;
    case "shortQuestion":
      return <QuestionTypeShortQuestion question={question} answer={answer} onChange={onChange} />;
    case "trueFalse":
      return <QuestionTypeTrueFalse question={question} answer={answer} onChange={onChange} />;
    default:
      return null;
  }
};

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examStarted, setExamStarted] = useState(false);
  const [quizData, setQuizData] = useState({ questions: [] }); // Initialize with empty questions array
  const studenData = location.state?.studentData;
  const roomName = location.state?.roomName;
  const socket = io(`${url}`);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });


    socket.emit("joinRoom", roomName, studenData, quizData.questions.length, currentQuestionIndex);

    socket.on("examStarted", (data) => {
      setExamStarted(data.examStarted);
      if (data.examStarted) {
        // Fetch quiz data when exam starts
        fetchQuizData();
      }
    });

    // return () => {
    //   socket.off("connect");
    //   socket.off("examStarted");
    // };
  }, [socket, currentQuestionIndex, examStarted]);

  const fetchQuizData = async () => {
    const id = location.state?.id; // Assuming 'id' is the quiz identifier
    try {
      const response = await fetch(`${url}/EditQuiz/${id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setQuizData(data); // Assuming the fetched data is the quiz data
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionIndex === quizData.questions.length - 1) {
      // Handle quiz completion logic here
      navigate("/"); // Navigate to home or results page
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleChange = (event) => {
    const questionId = quizData.questions[currentQuestionIndex]?.id;
    if (questionId) {
      setAnswers({ ...answers, [questionId]: event.target.value });
    }
  };

  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;
  const currentQuestion = quizData.questions[currentQuestionIndex];
  console.log('fahim tazwer',currentQuestionIndex)

  return (
    <>
      <Collapse in={examStarted}>
        <div style={{ padding: "20px" }}>
          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            {`${currentQuestionIndex + 1} of ${quizData.questions.length}`}
          </Typography>
          <Container sx={{ bgcolor: "#DFEAF3", p: 4, textAlign: "left", justifyContent: "space-between" }} maxWidth="sm">
            {currentQuestion && (
              <QuestionRenderer question={currentQuestion} answer={answers[currentQuestion.id]} onChange={handleChange} />
            )}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {currentQuestionIndex > 0 && (
                  <Button variant="outlined" color="error" onClick={handleBack}>
                    Back
                  </Button>
                )}
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button variant="contained" color="primary" onClick={handleNext} disabled={!currentQuestion}>
                  {isLastQuestion ? "Submit Quiz" : "Next"}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Collapse>
      <Collapse in={!examStarted}>
        <Container sx={{ bgcolor: "#DFEAF3", p: 4, textAlign: "left", mt: 4 }} maxWidth="sm">
          <Spin tip="Loading..." size="large">
            <Alert
              type="info"
              message="Quiz hasn't started yet"
              description="When the quiz starts you'll automatically be able to access the quiz."
            />
          </Spin>
        </Container>
      </Collapse>
    </>
  );
};

export default Quiz;
