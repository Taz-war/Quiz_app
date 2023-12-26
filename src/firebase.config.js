import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyD1ofOKZW2jIWr3F99v61PO5YDBZFy77Ig",
    authDomain: "quiz-app-ba467.firebaseapp.com",
    projectId: "quiz-app-ba467",
    storageBucket: "quiz-app-ba467.appspot.com",
    messagingSenderId: "390960348513",
    appId: "1:390960348513:web:9b3e938719682cfbb5d920",
    measurementId: "G-J80YRM6FFS"
  };

  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
  export default firebaseConfig;