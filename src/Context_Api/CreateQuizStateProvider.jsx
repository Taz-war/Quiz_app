import React, { createContext, useState }  from 'react'

export const CreateQuizContex = createContext();

const CreateQuizStateProvider = ({children}) => {
  const [quizzes, setQuizzes] = useState([]);
  const [id,setId] =useState('')
  const [open, setOpen] = useState(false);
  const [startExam,setStartExam] = useState(false)
  const [userId,setUserId] =useState('')
  return (
    <div>
        <CreateQuizContex.Provider value={{open,setOpen,id,setId,quizzes, setQuizzes,startExam,setStartExam,setUserId,userId}}>
            {children}
        </CreateQuizContex.Provider>
    </div>
  )
}

export default CreateQuizStateProvider