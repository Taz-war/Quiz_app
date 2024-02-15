import React, { useState } from "react";
import { auth } from "../../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { CreateQuizContex } from "../../Context_Api/CreateQuizStateProvider";
import {url} from '../../api'
import axios from "axios";

const TeacherGoogleSignUp = () => {
    const { setUserId,userId } = useContext(CreateQuizContex);
    const location = useLocation();
    const id = location.state?.id;
  const email = location.state?.email;
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      userName: "",
      firstName: "",
      lastName: "",
      organizationType: "",
      organizationName: "",
      role: "",
      phoneNumber: "",
      agreeToTerms: false,
    });
    const navigate = useNavigate();
  
    const handleNext = () => {
      if (step < 3) setStep(step + 1);
    };
  
    const handlePrevious = () => {
      if (step > 1) setStep(step - 1);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleCheckboxChange = (event) => {
      setFormData({ ...formData, agreeToTerms: event.target.checked });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await setUserId(id)
        const newUser = {
          userName:formData.userName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          organizationType: formData.organizationType,
          organizationName: formData.organizationName,
          role: formData.role,
          phoneNumber: formData.phoneNumber,
        };
  
        const apiURL = `${url}/teacher/signUp/${id}`;

  
        const response = await fetch(apiURL, {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-type": "application/json" },
        });

        const loggedUser = { email: email }

        const getToken = await axios.post(`${url}/jwt`, loggedUser, { withCredentials: true }).then(res => console.log(res.data))
        navigate('/Launch');
  
        if (!response.ok) {
          // This will catch HTTP errors like 404 or 500
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          // Successful response
          const data = await response.json();
          console.log('Server Response Data', data);
        }
      } catch (error) {
        console.error("Error creating an account or making API call: ", error);
      }
    };
  
    const isStepComplete = () => {
      switch(step) {
        case 1:
          // For step 1, check if userName, firstName, and lastName are filled
          return formData.userName.trim() && formData.firstName.trim() && formData.lastName.trim();
        case 2:
          // For step 2, add conditions based on the required fields in this step
          return formData.organizationType.trim() && (formData.organizationType !== "other" || formData.organizationName.trim());
        case 3:
          // For step 3, check if role and agreeToTerms are filled/checked
          return formData.role.trim() && formData.agreeToTerms;
        default:
          return false;
      }
    };
  
    return (
      <Container maxWidth='sm' sx={{ bgcolor: "#DFEAF3", p: 5, mt: 4 }}>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                 sx={{bgcolor:'white'}}
                  label="Username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                 sx={{bgcolor:'white'}}
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                 sx={{bgcolor:'white'}}
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Button variant="contained" onClick={handleNext} disabled={!isStepComplete()}>
              Next
            </Button>
            </>
          )}
  
          {step === 2 && (
            <>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal"  sx={{bgcolor:'white'}}>
                <InputLabel>Organization Type</InputLabel>
                <Select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  label="Organization Type"
                >
                  <MenuItem value="school">Primary/Secondary School</MenuItem>
                  <MenuItem value="university">University</MenuItem>
                  <MenuItem value="corporate">Corporate</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              {formData.organizationType !== "" && (
                <Grid item xs={12} md={6}>
                  <TextField
                   sx={{bgcolor:'white'}}
                    label="Organization Name"
                    name="organizationName"
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              )}
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="center" mt={3}>
              <Grid item xs={12} md={6}>
                <Button variant="contained" onClick={handlePrevious}>
                  Previous
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
              <Button variant="contained" onClick={handleNext} disabled={!isStepComplete()}>
              Next
            </Button>
              </Grid>
            </Grid>
            </>
          )}
  
          {step === 3 && (
            <>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" sx={{ bgcolor: 'white' }}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    label="Role"
                  >
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="administrator">Administrator</MenuItem>
                    <MenuItem value="it">IT/Technology</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                sx={{bgcolor:'white'}}
                  label="Phone Number (optional)"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeToTerms}
                      onChange={handleCheckboxChange}
                      name="agreeToTerms"
                    />
                  }
                  label="I agree to the terms and privacy policy."
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6}>
                <Button variant="contained" onClick={handlePrevious}>
                  Previous
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
              <Button type="submit" variant="contained" disabled={!isStepComplete()}>
                  Finish
                </Button>
              </Grid>
            </Grid>
            </>
          )}
        </form>
      </Container>
    );
}

export default TeacherGoogleSignUp