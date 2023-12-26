import React, { useState } from 'react';
import { auth } from '../../firebase.config';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GoogleIcon from '@mui/icons-material/Google';
import { Container } from '@mui/material';

const TeacherLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // handle successful login
      } catch (error) {
        // handle errors
      }
    };
  
    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        // handle successful login
      } catch (error) {
        // handle errors
      }
    };
  
    return (
      <Container>
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
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign In
          </Button>
          <div style={{ margin: '20px 0', textAlign: 'center' }}>Or</div>
          <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleSignIn} fullWidth>
            Sign in with Google
          </Button>
        </form>
      </Container>
    );
}

export default TeacherLogin