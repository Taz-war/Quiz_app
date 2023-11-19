import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QuizList from '../Pages/QuizList'
import EditQuiz from '../Pages/EditQuiz'
import CreateQuiz from '../Pages/CreateQuiz'
import { useContext } from 'react'
import { CreateQuizContex } from '../Context_Api/CreateQuizStateProvider'
import Navbar from '../Components/NavBar/NavBar'
const Router = () => {
    const { id,quizzes } = useContext(CreateQuizContex);
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<QuizList />}/>
                <Route path='/EditQuiz/:QId' element={<EditQuiz quizzes={quizzes} id={id}/>} />
                <Route path='/CreateQuiz' element={<CreateQuiz />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
