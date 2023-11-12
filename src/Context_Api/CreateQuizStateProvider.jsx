import React, { createContext, useState }  from 'react'

export const CreateQuizContex = createContext();

const CreateQuizStateProvider = ({children}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
        <CreateQuizContex.Provider value={{open,setOpen}}>
            {children}
        </CreateQuizContex.Provider>
    </div>
  )
}

export default CreateQuizStateProvider