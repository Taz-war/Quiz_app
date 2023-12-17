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
  Typography,
} from "@mui/material";
import Item from "antd/es/list/Item";
import TimerComponent from "../Components/Timer_Component/TimerComponent";
const LiveResults = () => {
  const [roomData, setRoomData] = useState("");
  const [steps, setSteps] = useState(0);
  const [QuestionCompleted, setQuestionCompleted] = useState(0);
  const [enteredStudents, setEnteredStudents] = useState([]);
  const [examDuration,setExamDuration] =useState(0)
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  const socket = io("http://localhost:5000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.emit("joinAdminRoom", "admin");
    // socket.emit("joinRoom", "C7h9EM");
    socket.on("userJoined", (userData, step) => {
      console.log({ userData });
      //     setEnteredStudents([...enteredStudents, userData]);
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

  console.log({ enteredStudents });
  return (
    <div>
      <Container>
      <h1>{`This is live results ${roomData}`}</h1>
        <Box display={'flex'}>
          <Box width={'50%'} textAlign={'left'} pl={3}>
          <Typography variant="h6" mb={2}>Fix exam duration(in minutes) :</Typography>
          <TextField size="small" onChange={(e)=>setExamDuration((e.target.value)*60)}>Exam duration</TextField>
          </Box>
          <TimerComponent  examDuration={examDuration}/>
        </Box>
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
                    <TableCell >
                      <Box
                        sx={{
                          fontSize: "x-large",
                          fontWeight: "bolder",
                          bgcolor: "#F5F7F8",
                          p: 1,
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
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </div>
  );
};

export default LiveResults;
