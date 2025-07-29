import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl'; 
import axios from 'axios';
import { message } from 'antd'; 

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.name || !data?.email || !data?.password || !data?.type) {
      message.error("Please fill all fields"); 
      return;
    } else {
      axios.post('http://localhost:8001/api/user/register', data)
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message); 
            navigate('/login');
          } else {
            message.error(response.data.message); 
          }
        })
        .catch((error) => {
          console.error("Registration Error", error); 
          message.error("An error occurred during registration. Please try again."); 
        });
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Renter Full Name/Owner Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
              variant="outlined" 
            />
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
              variant="outlined" 
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password" 
              variant="outlined" 
            />
            
            <FormControl fullWidth margin="normal" required variant="outlined">
              <InputLabel id="user-type-select-label">User Type</InputLabel>
              <Select
                labelId="user-type-select-label"
                id="user-type-select"
                name='type'
                value={data.type}
                label="User Type" 
                onChange={handleChange}
                defaultValue="" 
              >
                <MenuItem value="" disabled>Select User</MenuItem> 
                <MenuItem value={'Renter'}>Renter</MenuItem>
                <MenuItem value={"Owner"}>Owner</MenuItem>
              </Select>
            </FormControl>

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
                Sign Up
              </Button>
            </Box>
            <Grid container justifyContent="flex-end"> 
              <Grid item>Have an account?{" "}
                <Link style={{ color: "#28a745", textDecoration: 'none' }} to={'/login'} variant="body2"> 
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;