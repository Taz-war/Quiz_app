import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CreateQuizContex } from '../Context_Api/CreateQuizStateProvider';
import { url } from "../api";

const steps = ['Profile', 'Demographics'];

const TeacherProfile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { userInfo, setUserInfo } = useContext(CreateQuizContex);
  const { uid } = useParams();

  const [profileData, setProfileData] = useState({
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    phoneNumber: userInfo?.phoneNumber || '',
    organizationType: userInfo?.organizationType || '',
    organizationName: userInfo?.organizationName || '',
    role: userInfo?.role || '',
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (prop) => (event) => {
    setProfileData({ ...profileData, [prop]: event.target.value });
  };

  // Add your form submit handler here
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('Form submitted', profileData);

    try {
      const response = await fetch(`${url}/teacherProfile/${uid}`, {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers your API requires, like authorization tokens
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      setUserInfo(data);
      setActiveStep(0)
    } catch (error) {
    }
  };

  // Add your delete account handler here
  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
    // Implement your delete account logic here
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <form onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name"
                  value={profileData.firstName}
                  onChange={handleChange('firstName')}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Last Name"
                  value={profileData.lastName}
                  onChange={handleChange('lastName')}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  value={profileData.email}
                  onChange={handleChange('email')}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone Number (optional)"
                  value={profileData.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>


            <Button variant="contained" color="primary" fullWidth onClick={handleNext} sx={{ mt: 2 }}>Next</Button>
          </Box>
        )}
        {activeStep === 1 && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
             
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="organization-type-label">Organization Type</InputLabel>
                  <Select
                    labelId="organization-type-label"
                    id="organization-type-select"
                    value={profileData.organizationType}
                    label="Organization Type"
                    onChange={handleChange('organizationType')}
                  >
                    <MenuItem value="school">Primary/Secondary School</MenuItem>
                    <MenuItem value="university">University</MenuItem>
                    <MenuItem value="corporate">Corporate</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
                {profileData.organizationType !== "" && (
                <Grid item xs={12} md={6}>
                  <TextField
                  sx={{bgcolor:'white'}}
                    label="Organization Name"
                    name="organizationName"
                    value={profileData.organizationName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              )}
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role-select"
                    value={profileData.role}
                    label="Role"
                    onChange={handleChange('role')}
                  >
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="administrator">Administrator</MenuItem>
                    <MenuItem value="it/technology">IT/Technology</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
            </Grid>

            <Grid container spacing={2} mt={3} rowSpacing={3}>
              <Grid item xs={12} md={6}>
              <Button variant="outlined" color="secondary" fullWidth onClick={handleBack}>Back</Button>
              </Grid>
              <Grid item xs={12} md={6}>
              <Button variant="contained" color="primary" type='submit' fullWidth>Save</Button>
              </Grid>
              <Grid item xs={12}>
            <Button startIcon={<DeleteIcon />} variant="contained" color="error" fullWidth onClick={handleDeleteAccount} sx={{ mt: 2 }}>
                Delete Account
              </Button>
              </Grid>
            </Grid>
          </Box>
        )}
        
      </form>
    </Container>
  );
}

export default TeacherProfile