import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CreateQuizContex } from '../Context_Api/CreateQuizStateProvider';

const steps = ['Profile', 'Demographics'];

const TeacherProfile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { userInfo, setUserInfo } = useContext(CreateQuizContex);
  const { uid } = useParams();
  console.log('uff', userInfo)
  const [profileData, setProfileData] = useState({
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    phoneNumber: userInfo?.phoneNumber || '',
    language: '', // This value was not provided in the userInfo
    organizationType: userInfo?.organizationType || '',
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
  const handleSubmit = () => {
    console.log('Form submitted', profileData);
    // Implement your submission logic here
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
                    <MenuItem value="school">Teacher</MenuItem>
                    <MenuItem value="university">Administrator</MenuItem>
                    <MenuItem value="corporate">IT/Technology</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" color="secondary" onClick={handleBack}>Back</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
            </Box>
          </Box>
        )}
        {/* {activeStep === steps.length - 1 && (
            <Box sx={{ p: 3 }}>
              Include Account step fields here
              <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>Save</Button>
              <Button startIcon={<DeleteIcon />} variant="contained" color="error" fullWidth onClick={handleDeleteAccount} sx={{ mt: 2 }}>
                Delete Account
              </Button>
            </Box>
          )} */}
      </form>
    </Container>
  );
}

export default TeacherProfile