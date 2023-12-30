import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useContext } from "react";
import { CreateQuizContex } from "../../Context_Api/CreateQuizStateProvider";
import GoogleIconSVG from '../../icons8-google.svg';

const TeacherLogin = () => {
  const { setUserId, userId } = useContext(CreateQuizContex);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log({ userCredential });
      await setUserId(userCredential.user.uid);
      navigate("/Launch", { state: { id: userCredential.user.uid } }); // Redirect to dashboard on successful login
      console.log("go to next page");
    } catch (error) {
      setError("Failed to log in"); // Display error message
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const tokenResponse = result._tokenResponse
        
        const googleSingInInfo ={
          userId:user.uid,
          // firstName:tokenResponse.firstName,
          // lastName :tokenResponse.lastName,
          email:user.email,
          displayName:user.displayName
        }
        // Check if the user exists in Firebase Authentication
        if (user) {
            // User exists, navigate to appropriate page
            navigate('/Launch', { state: { data: googleSingInInfo }});
        } else {
            // User doesn't exist, navigate to sign-up page
            navigate('/teacher/signup');
        }
    } catch (error) {
        setError('Failed to log in with Google');
    }
    setLoading(false);
};
  


  const handleSignUpNavigation = () => {
    navigate("/teacher/SignUp");
  };

  return (
    <Container>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        Teacher Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={loading}
        >
          Sign In
        </Button>
        <Box sx={{ margin: "20px 0", textAlign: "center" }}>Or</Box>
        <Button
          variant="outlined"
          startIcon={<img src={GoogleIconSVG} alt="Google sign-in" />}
          onClick={handleGoogleSignIn}
          fullWidth
          disabled={loading}
        >
          Sign in with Google
        </Button>
        <Box sx={{ marginTop: "20px", textAlign: "center" }}>
          <Typography>
              Don't have an account?
          <Button variant="text" onClick={handleSignUpNavigation}>
            Sign Up
          </Button>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default TeacherLogin;
