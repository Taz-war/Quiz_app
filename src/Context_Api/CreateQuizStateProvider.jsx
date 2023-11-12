import React, { createContext, useState }  from 'react'

export const CreateQuizContex = createContext();

const CreateQuizStateProvider = ({children}) => {
  return (
    <div>
        <CreateQuizContex.Provider >
            {children}
        </CreateQuizContex.Provider>
    </div>
  )
}

export default CreateQuizStateProvider