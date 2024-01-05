import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { CreateQuizContex } from "../../Context_Api/CreateQuizStateProvider";
import Navbar from "./NavBar";
import StudentNavBar from "./StudentNavBar";

const NavBarWrapper = () => {
  const location = useLocation();
  const { id, quizzes } = useContext(CreateQuizContex);

  const teacherNavPaths = [
    "/Library",
    "/EditQuiz",
    "/CreateQuiz",
    "/Launch",
    "/Rooms",
    "/Reports",
    "/LiveResult",
    "/teacher/profile/",
    "/teacher/reports",
  ];
  const teacherNavPaths1 = teacherNavPaths.map((path) => path.toLowerCase());

  const getNavBar = () => {
    const pathName = location.pathname;
    const findRoute = teacherNavPaths.some((path) => pathName.includes(path));
    console.log({ findRoute });

    if (findRoute) {
      return <Navbar />;
    } else if (pathName.startsWith('/student')) {
      return <StudentNavBar />;
    }
    
  };

  return <>{getNavBar()}</>;
};

export default NavBarWrapper;
