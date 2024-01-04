import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
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
import ShowReport from '../Components/Show_report/ShowReport'
import TeacherLogin from '../Pages/Login_portal/TeacherLogin'
import TeacherSignUp from '../Pages/Login_portal/TeacherSignUp'
import TeacherGoogleSignUp from '../Pages/Login_portal/TeacherGoogleSignUp'
import StudentNavBar from '../Components/NavBar/StudentNavBar'
import NavBarWrapper from '../Components/NavBar/NavBarWrapper'
import TeacherProfile from '../Pages/TeacherProfile'
const Router = () => {
    const { id,quizzes } = useContext(CreateQuizContex);
    // const location = useLocation()

    // const teacherNavPaths = ['/Library', '/EditQuiz', '/CreateQuiz','/Launch','/Rooms','/Reports','/LiveResult','/teacher/reports'];

    // const getNavBar = () => {
    //     // Example condition: if the path is '/alternate', show the AlternateNavBar
    //     if (teacherNavPaths.includes(location.pathname)) {
    //       return <Navbar />;
    //     }
    //     return <StudentNavBar />;
    //   };
    console.log({id})
    return (
        <>
        <BrowserRouter>
            <NavBarWrapper />
            <Routes>
                <Route path='/' element={<TeacherLogin />} />
                <Route path='/teacher/SignUp' element={<TeacherSignUp />} />
                <Route path='/teacher/GoogleSignUp' element={<TeacherGoogleSignUp />} />
                <Route path='/Library' element={<QuizList />}/>
                <Route path='/EditQuiz/:QId' element={<EditQuiz quizzes={quizzes} id={id}/>} />
                <Route path='/CreateQuiz' element={<CreateQuiz />} />
                <Route path='/Launch' element={<Launch />} />
                <Route path='/Rooms' element={<Rooms />} />
                <Route path='/Reports' element={<Reports />} />
                <Route path='/LiveResult' element={<LiveResults />} />
                <Route path='/student/login' element={<StudentLogin />}/>
                <Route path='/student/quiz' element={<Quiz />} />
                <Route path='/student/studentLoginInfo' element={<StudentLoginInfo />} />
                <Route path='/teacher/reports/:id' element={<ShowReport />} />
                <Route path='/teacher/profile/:uid' element={<TeacherProfile />} />
            </Routes>
        </BrowserRouter>
        {/* <BrowserRouter>
            <Navbar />
            <Routes>
                
                <Route path='/CreateQuiz' element={<CreateQuiz />} />
                <Route path='/' element={<TeacherLogin />} />
                <Route path='/teacher/SignUp' element={<TeacherSignUp />} />
                <Route path='/Reports' element={<Reports />} />
                <Route path='/LiveResult' element={<LiveResults />} />
            </Routes>
        </BrowserRouter> */}
        </>
    )
}

export default Router
