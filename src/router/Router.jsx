import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QuizList from '../Pages/QuizList'
import EditQuiz from '../Pages/EditQuiz'
import CreateQuiz from '../Pages/CreateQuiz'
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<QuizList />}/>
                <Route path='/EditQuiz/:QId' element={<EditQuiz />} />
                <Route path='/CreateQuiz' element={<CreateQuiz />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
