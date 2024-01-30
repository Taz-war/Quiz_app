import React, { createContext, useState }  from 'react'
import { useEffect } from 'react';

export const CreateQuizContex = createContext();

const CreateQuizStateProvider = ({children}) => {
  const [quizzes, setQuizzes] = useState([]);
  const [id,setId] =useState('')
  const [open, setOpen] = useState(false);
  const [startExam,setStartExam] = useState(false)
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '')
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '')
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || null)
  const [loader,setLoader] =useState(false)
  useEffect(() => {
    if (userId !== '' || userName !== '') {
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
    }
    if (userInfo !== null) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }, [userId, userInfo]);
  return (
    <div>
      <CreateQuizContex.Provider value={{ open, setOpen, id, setId, quizzes, setQuizzes, startExam, setStartExam, setUserId, userId, userName, setUserName, userInfo, setUserInfo,loader,setLoader }}>
            {children}
        </CreateQuizContex.Provider>
    </div>
  )
}

export default CreateQuizStateProvider