import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { CreateQuizContex } from '../../Context_Api/CreateQuizStateProvider';
import Navbar from './NavBar';
import StudentNavBar from './StudentNavBar';


const NavBarWrapper = () => {
  const location = useLocation();
  const { id, quizzes } = useContext(CreateQuizContex);

  const teacherNavPaths = ['/Library', '/EditQuiz', '/CreateQuiz', '/Launch', '/Rooms', '/Reports', '/LiveResult', '/teacher/reports'];

  const getNavBar = () => {
    if (teacherNavPaths.includes(location.pathname)) {
      return <Navbar />;
    }
    return <StudentNavBar />;
  };

  return (
    <>
      {getNavBar()}
    </>
  );
};

export default NavBarWrapper;
