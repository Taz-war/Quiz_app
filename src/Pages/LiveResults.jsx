import { Progress, Space } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { red, green, blue } from "@ant-design/colors";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,IconButton
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import CheckIcon from '@mui/icons-material/Check';
import TimerComponent from "../Components/Timer_Component/TimerComponent";
import { useContext } from "react";
import { CreateQuizContex } from "../Context_Api/CreateQuizStateProvider";
import {url} from '../api'


const LiveResults = () => {
  const { startExam,setStartExam } = useContext(CreateQuizContex);
  const [roomData, setRoomData] = useState("");
  const [steps, setSteps] = useState(0);
  const [roomName,setRoomName] = useState('')
  const [totalStudentsEntered, setTotalStudentsEntered] = useState(0);
  const [enteredStudents, setEnteredStudents] = useState([]);
  const [examDuration, setExamDuration] = useState(0);

  const socket = io(`${url}`);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.emit("joinAdminRoom", "admin");

    socket.emit('startExam',{examStarted:startExam,roomName:roomName})
    // socket.emit("joinRoom", "C7h9EM");
    socket.on("userJoined", (userData, step,room,userEntered) => {
      
      setTotalStudentsEntered(userEntered)
      setRoomName(room)
      setEnteredStudents((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === userData.id
        );
        if (existingItemIndex !== -1) {
          return prevItems.map((item, index) =>
            index === existingItemIndex ? userData : item
          );
        } else {
          return [...prevItems, userData];
        }
      });
      setSteps(step);
    });
    console.log(enteredStudents);
    console.log(steps);
    socket.on("connectedRoom", (data) => {
      console.log("socketroom", data);

      setRoomData(data);
    });
  }, [socket]);

  const [inputValue, setInputValue] = useState('');

  const handleIconClick = () => {
    setExamDuration(inputValue * 60);
    setInputValue('')
    // Optional: Clear the input field or perform any other action
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);
  return (
    <div>
      <Container>
            
          <TimerComponent />
        <TableContainer component={Container}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ p: 1 }}>
                  <Box
                    sx={{
                      fontSize: "x-large",
                      fontWeight: "bolder",
                      color: "#0075A3",
                      bgcolor: "#E7EDF0",
                      p: 1,
                    }}
                  >
                    Name
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      fontSize: "x-large",
                      fontWeight: "bolder",
                      color: "#0075A3",
                      bgcolor: "#E7EDF0",
                      p: 1,
                    }}
                  >
                    Progress (%)
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enteredStudents.length > 0 &&
                enteredStudents.map((item, index) => {
                  return (
                    <TableRow key={index} sx={{ mb: 2 }}>
                      <TableCell>
                        <Box
                          sx={{
                            fontSize: "x-large",
                            fontWeight: "bolder",
                            bgcolor: "#F5F7F8",
                            p: 1,
                            borderRadius:'10px'
                          }}
                        >
                          {item.studentName}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Space size={70}>
                          <Progress
                            percent={Math.floor(
                              (item.questionCompleted / steps) * 100
                            )}
                            size={[50, 20]}
                            steps={steps}
                            strokeColor={blue[3]}
                            trailColor="#E7EDF0"
                          />
                        </Space>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell sx={{p:1}}>
                    <Box
                    sx={{
                      fontSize: "large",
                      fontWeight: "bold",
                      color: "#0075A3",
                      bgcolor: "#e9eaf5",
                      p: 1,
                      borderRadius:'10px'
                    }}
                  >
                    Class Total
                  </Box>
                  </TableCell>
                  <TableCell>
                  <Box
                    sx={{
                      fontSize: "large",
                      fontWeight: "bold",
                      color: "#0075A3",
                      bgcolor: "#e9eaf5",
                      p: 1,
                      borderRadius:'10px'
                    }}
                  >
                    {enteredStudents.length}
                  </Box>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default LiveResults;
