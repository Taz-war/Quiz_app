import React, { createContext, useState }  from 'react'

export const CreateQuizContex = createContext();

const CreateQuizStateProvider = ({children}) => {
  const [quizzes, setQuizzes] = useState([]);
  const [id,setId] =useState('')
  const [open, setOpen] = useState(false);
  return (
    <div>
        <CreateQuizContex.Provider value={{open,setOpen,id,setId,quizzes, setQuizzes}}>
            {children}
        </CreateQuizContex.Provider>
    </div>
  )
}

export default CreateQuizStateProvider