import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.config';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Button, TextField, Container, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useContext } from 'react';
import { CreateQuizContex } from '../../Context_Api/CreateQuizStateProvider';

const TeacherLogin = () => {
  const { setUserId,userId } = useContext(CreateQuizContex);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        const userCredential= await signInWithEmailAndPassword(auth, email, password);
        console.log({userCredential})
        await setUserId(userCredential.user.uid )
        navigate('/Launch',{ state: { id: userCredential.user.uid }}); // Redirect to dashboard on successful login
        console.log('go to next page')
      } catch (error) {
        setError('Failed to log in'); // Display error message
      }
      setLoading(false);
    };
  
    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      setLoading(true);
      try {
        await signInWithPopup(auth, provider);
        // navigate('/dashboard');
        console.log('go to next page')
      } catch (error) {
        setError('Failed to log in with Google');
      }
      setLoading(false);
    };
  
    return (
      <Container>
        <Typography variant="h4" style={{ textAlign: 'center', margin: '20px 0' }}>
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
            disabled={loading}>
            Sign In
          </Button>
          <div style={{ margin: '20px 0', textAlign: 'center' }}>Or</div>
          <Button 
            variant="outlined" 
            startIcon={<GoogleIcon />} 
            onClick={handleGoogleSignIn} 
            fullWidth 
            disabled={loading}>
            Sign in with Google
          </Button>
        </form>
      </Container>
    );
}

export default TeacherLogin;
