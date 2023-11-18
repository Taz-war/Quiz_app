import './App.css';
import React from 'react'
import CreateQuiz from './Pages/CreateQuiz';
import QuizList from './Pages/QuizList';
import DataTable from './Pages/test';
import MyComponent from './Pages/test';
import Navbar from './Components/NavBar/NavBar';
import Router from './router/Router';

function App() {
  return (
    <div className="App">
      {/* <CreateQuiz /> */}
      {/* <QuizList /> */}
      <Router />
      {/* <Navbar /> */}
      {/* <DataTable /> */}
      
    </div>
  );
}

export default App;
