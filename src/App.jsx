import './App.css';
import React from 'react'
import CreateQuiz from './Pages/CreateQuiz';
import QuizList from './Pages/QuizList';
import DataTable from './Pages/test';
import MyComponent from './Pages/test';
import Navbar from './Components/NavBar/NavBar';
import Router from './router/Router';
import Quiz from './Pages/student_portal/Quiz';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <div className="App">
      {/* <CreateQuiz /> */}
      {/* <QuizList /> */}
      {/* <Router /> */}
      <CssBaseline />
      <Quiz />
      {/* <Navbar /> */}
      {/* <DataTable /> */}
      
    </div>
  );
}

export default App;
