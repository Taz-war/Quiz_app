import React from 'react'
import { useState } from 'react';
import io from "socket.io-client";
const LiveResults = () => {
  const [roomData,setRoomData]=useState('')
  const socket = io("http://localhost:5000");
  socket.on('connect', () => {
    console.log('Connected to server');
  });
  socket.emit('joinRoom', 'C7h9EM');
  socket.on('connectedRoom',(data)=>{
    console.log('socketroom',data)
    setRoomData(data)
  })
  return (
    <div>
        <h1>{`This is live results ${roomData}`}</h1>
    </div>
  )
}

export default LiveResults