import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QuizList from '../Pages/QuizList'
import EditQuiz from '../Pages/EditQuiz'
import CreateQuiz from '../Pages/CreateQuiz'
import { useContext } from 'react'
import { CreateQuizContex } from '../Context_Api/CreateQuizStateProvider'
import Navbar from '../Components/NavBar/NavBar'
import Launch from '../Pages/Launch'
import Rooms from '../Pages/Rooms'
import Reports from '../Pages/Reports'
import LiveResults from '../Pages/LiveResults'
import StudentLogin from '../Pages/student_portal/StudentLogin'
import Quiz from '../Pages/student_portal/Quiz'
import StudentLoginInfo from '../Pages/student_portal/StudentLoginInfo'
const Router = () => {
    const { id,quizzes } = useContext(CreateQuizContex);
    console.log({id})
    return (
        <>
        {/* <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/Library' element={<QuizList />}/>
                <Route path='/EditQuiz/:QId' element={<EditQuiz quizzes={quizzes} id={id}/>} />
                <Route path='/CreateQuiz' element={<CreateQuiz />} />
                <Route path='/' element={<Launch />} />
                <Route path='/Rooms' element={<Rooms />} />
                <Route path='/Reports' element={<Reports />} />
                <Route path='/LiveResult' element={<LiveResults />} />
                <Route path='/student/login' element={<StudentLogin />}/>
                <Route path='/student/quiz' element={<Quiz />} />
            </Routes>
        </BrowserRouter> */}
        <BrowserRouter>
            {/* <Navbar /> */}
            <Routes>
                <Route path='/student/login' element={<StudentLogin />}/>
                <Route path='/student/quiz' element={<Quiz />} />
                <Route path='/student/studentLoginInfo' element={<StudentLoginInfo />} />
                {/* <Route path='/CreateQuiz' element={<CreateQuiz />} />
                <Route path='/' element={<Launch />} />
                <Route path='/Rooms' element={<Rooms />} />
                <Route path='/Reports' element={<Reports />} />
                <Route path='/LiveResult' element={<LiveResults />} /> */}
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Router
