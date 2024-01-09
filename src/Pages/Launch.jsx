import {
  Box,
  Button,
  Container,
  Drawer,
  Fade,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { CreateQuizContex } from "../Context_Api/CreateQuizStateProvider";
import { useState } from "react";
import { useEffect } from "react";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {url} from '../api'

const Launch = () => {
  const {quizzes, setQuizzes, userId, setUserName, userInfo, setUserInfo } = useContext(CreateQuizContex);
  const [errorMessage, setErrorMessage] = useState("");
  const [publishedQuestions, setPublishedQuestions] = useState([])
  const [roomName, setRoomName] = useState("")
  const [open, setOpen] = useState(false)
  // const [userInfo,setUserInfo] = useState()

  console.log(userId)
  const getAllQuizes = async () => {
    try {
      const response = await fetch(`${url}/questionSet/${userId}`);
      const data = await response.json();
      setQuizzes(data.questions);
      setPublishedQuestions(data.studentIds)
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const getUserInfo = async () =>{
    try {
      const response = await fetch(`${url}/userInfo/${userId}`);
      const data = await response.json();
      setUserInfo(data);
      setUserName(data.userName)
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  useEffect(() => {
    getAllQuizes();
    getUserInfo();
  }, []);

  console.log(userInfo)

  console.log('faky',publishedQuestions)
  ///launch quiz live///
  const handleLive = async (id, title) => {
    const questionTitle = { questionTitle: title }

    const response = await fetch(`${url}/LaunchQuestionSet/${id}`);
    const data = await response.text();

    console.log(data);
    setRoomName(data)
    setOpen(true)
    // setErrorMessage(error.message);

    console.log("live", id);
  };

  return (
    <>
      <Container sx={{ mt: 2 }}>
        {quizzes.length === 0 ? (
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box sx={{ textAlign: 'center', my: 5, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
            <MenuBookIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography variant="h4" color="primary" gutterBottom fontWeight={'bolder'} fontFamily={'Raleway'}>
              No quizzes available
            </Typography>
            <Typography variant="h6">
              Start by creating a new quiz
            </Typography>
          </Box>
        </Slide>

        ) :(
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 750 }}
            aria-label="caption table"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bolder", fontSize: "large", color: '#1E75A3' }}>
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bolder",
                    fontSize: "large",
                    textAlign: "left",
                    color: '#1E75A3'
                  }}
                >
                  Status
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map((row, index) => {
                const isPublished = publishedQuestions.some(pq => pq._id === row._id);
                return (
                  <TableRow key={index} hover sx={{ cursor: "pointer" }}>
                    <TableCell component="th" scope="row" sx={{
                      fontWeight: 'bold',
                      "&:hover": {
                        fontWeight: 'bolder',
                        color: "#1E75A3",
                      },
                    }}>
                      {row.questionSetTitle}
                    </TableCell>
                    <TableCell align="right" sx={{
                      textAlign: "left", fontWeight: 'bold',
                      "&:hover": {
                        fontWeight: 'bolder',
                        color: "#1E75A3",
                      }
                    }}>
                      {isPublished ? 'Published' : 'Unpublished'}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleLive(row._id, row.questionSetTitle)}
                      >
                        Live
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        )
        }
      </Container>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={() => setOpen(false)}

      >
        <Box sx={{ maxWidth: '720px', minWidth: '400px' }}>
          <Typography variant="h4" fontWeight={'bold'}>
            Invite Students
          </Typography>
          <Container>
            <br />
            <Typography variant="h3" >
              Visit <b>gosocrative.com</b> and enter room name <span style={{ color: 'skyblue' }}>'{roomName}'</span>
            </Typography>
          </Container>
        </Box>
        {/* {list(anchor)} */}
      </Drawer>
    </>
  );
};

export default Launch;
