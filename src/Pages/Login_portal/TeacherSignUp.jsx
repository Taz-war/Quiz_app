// src/components/SignUpForm.jsx

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
} from "@mui/material";

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    organizationType: "",
    organizationName: "",
    role: "",
    phoneNumber: "",
    agreeToTerms: false,
  });

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
    const response = await fetch(`http://localhost:5000/teacher/signUp/1`, {
      method: "POST",
      body: "hello",
      //   headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    return;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // Handle the user information, possibly storing additional data in Firestore
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        organizationType: formData.organizationType,
        organizationName: formData.organizationName,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
      };
      console.log(userCredential.user.uid);
      const response = await fetch(
        `http://localhost:5000/teacher/signUp/${userCredential.user.uid}`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-type": "application/json" },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error creating an account: ", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <TextField
              label="First Name"
              name="firstName"
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <FormControl fullWidth margin="normal">
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
            {formData.organizationType === "other" && (
              <TextField
                label="Organization Name"
                name="organizationName"
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            )}
            <Button variant="contained" onClick={handlePrevious}>
              Previous
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                label="Role"
              >
                {/* Roles options here */}
              </Select>
            </FormControl>
            <TextField
              label="Phone Number (optional)"
              name="phoneNumber"
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
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
            <Button variant="contained" onClick={handlePrevious}>
              Previous
            </Button>
            <Button type="submit" variant="contained">
              Finish
            </Button>
          </>
        )}
      </form>
    </Container>
  );
};

export default SignUpForm;
