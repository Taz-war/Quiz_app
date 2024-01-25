import './App.css';
import React from 'react'
import Router from './router/Router';
import { CustomThemeProvider } from './Context_Api/ThemeProvider ';


function App() {
  return (
    <div className="App">
      {/* <CreateQuiz /> */}
      {/* <QuizList /> */}
      <CustomThemeProvider>
        <Router />
      </CustomThemeProvider>
      {/* <HomePage /> */}
      {/* <TeacherLogin /> */}
      {/* <CssBaseline />
      <Quiz /> */}
      {/* <Navbar /> */}
      {/* <DataTable /> */}

    </div>
  );
}

export default App;
