import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { message } from 'antd'; 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "" || data.confirmPassword === "") {
      message.error("Please fill all fields"); 
    } else {
      if (data.password === data.confirmPassword) {
        await axios.post("http://localhost:8001/api/user/forgotpassword", data)
          .then((res) => {
            if (res.data.success) {
              message.success('Your password has been changed!'); 
              navigate('/login');
            } else {
              message.error(res.data.message); 
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 401) {
              message.error("User doesn't exist"); 
            } else {
              message.error("An error occurred. Please try again."); 
            }
            navigate("/register");
          });
      } else {
        message.error("New password and confirm password do not match."); 
      }
    }
  };

  return (
    <>
      
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand style={{ color: '#0056b3', fontWeight: 'bold', fontSize: '1.8rem' }}>
            <h2>HouseRent</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Nav>
              <Link to={'/'} style={{ color: '#28a745', marginRight: '15px', textDecoration: 'none', fontSize: '1.1rem' }}>Home</Link>
              <Link to={'/login'} style={{ color: '#007bff', marginRight: '15px', textDecoration: 'none', fontSize: '1.1rem' }}>Login</Link>
              <Link to={'/register'} style={{ color: '#6c757d', textDecoration: 'none', fontSize: '1.1rem' }}>Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            borderRadius: '8px',
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          
          <Avatar sx={{ m: 1, bgcolor: '#007bff' }}>
            <LockOutlinedIcon />
          </Avatar>
          
          <Typography component="h1" variant="h5" sx={{ color: '#343a40', mb: 2 }}>
            Forgot Password?
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="New Password"
              type="password"
              id="password"
              autoComplete="new-password" 
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password" 
              variant="outlined"
            />
            <Box mt={3}>
              <Button
                type="submit"
                fullWidth 
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  backgroundColor: '#007bff',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#0056b3',
                  },
                  fontSize: '1.1rem',
                  padding: '10px 0',
                }}
              >
                Change Password
              </Button>
            </Box>
            <Grid container justifyContent="flex-end"> 
              <Grid item>Don't have an account?{" "}
                <Link style={{ color: "#28a745", textDecoration: 'none' }} to={'/register'} variant="body2"> 
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ForgotPassword;