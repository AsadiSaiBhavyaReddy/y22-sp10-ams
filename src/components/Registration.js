import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2';

const defaultTheme = createTheme();

export default function SignUp() {
  const [formErrors, setFormErrors] = useState({
    name: false,
    role: false,
    email: false,
    password: false
  });

  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name'),
      role: data.get('role'),
      email: data.get('email'),
      password: data.get('password'),
    };

    // Check if any field is empty
    if (Object.values(formData).some(value => !value) || formData.role === "0") {
      setFormErrors({
        name: !formData.name,
        role: !formData.role,
        email: !formData.email,
        password: !formData.password
      });
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setFormErrors({ ...formErrors, email: true });
      return;
    }

    axios.post('http://localhost:8081/insert', formData)
      .then((res) => {
        if (res.data.status === 'error') {
          // Show error message using SweetAlert2
          Swal.fire({
            title: "Registration Error",
            text: res.data.error,
            icon: "error"
          });
        } else {
          // Show success message using SweetAlert2
          Swal.fire({
            title: "Registration Successful",
            text: res.data.message,
            icon: "success"
          }).then(() => {
            // Redirect to the login page
            window.location.href = "/login";
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Show error message using SweetAlert2
        Swal.fire({
          title: "Error",
          text: "An error occurred. Please try again later.",
          icon: "error"
        });
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formErrors.name}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  error={formErrors.role}
                  id="role"
                  label="Role"
                  name="role"
                  defaultValue={0}
                  fullWidth
                >
                  <MenuItem value={0}>Select User</MenuItem>
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={2}>User</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={formErrors.email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={formErrors.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <p>Already have an account? <Link href="/login" variant="body2">
                  Sign in
                </Link></p>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://mui.com/">
                AMS
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}