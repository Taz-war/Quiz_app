import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useContext } from "react";
import { CreateQuizContex } from "../../Context_Api/CreateQuizStateProvider";
import GoogleIconSVG from '../../icons8-google.svg';
import {url} from '../../api'

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
        
        const response = await fetch(`${url}/searchUser/${user.uid}`);
        const data = await response.json();
         console.log(data)
        // Check if the user exists in Firebase Authentication
        if (data) {
            // User exists, navigate to appropriate page
            navigate('/Launch', { state: { id: user.uid }});
        } else {
            // User doesn't exist, navigate to sign-up page
            navigate('/teacher/GoogleSignUp',{ state: { id: user.uid }});
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
    <Container maxWidth='sm' sx={{ bgcolor: "#DFEAF3", p: 5,mt:4}}>
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
          sx={{bgcolor:'white'}}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ bgcolor: 'white' }}
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
          sx={{ bgcolor: 'white' }}
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
