import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { UserContext } from '../../App';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllUsers from './AllUsers';
import AllProperty from './AllProperty';
import AllBookings from './AllBookings';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!user) {
    return null;
  }

  return (
    <div>
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
              <h5 className='mx-3' style={{ color: '#343a40' }}>Hi {user.userData.name}</h5>
              <Link onClick={handleLogOut} to={'/'} style={{ color: '#dc3545', textDecoration: 'none', fontSize: '1.1rem' }}>Log Out</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="admin dashboard tabs"
            TabIndicatorProps={{
              style: { backgroundColor: '#007bff' } 
            }}
          >
            <Tab label="All Users" {...a11yProps(0)} sx={{
              '&.Mui-selected': { color: '#007bff' }, 
              color: '#6c757d' 
            }} />
            <Tab label="All Properties" {...a11yProps(1)} sx={{
              '&.Mui-selected': { color: '#007bff' },
              color: '#6c757d'
            }} />
            <Tab label="All Bookings" {...a11yProps(2)} sx={{
              '&.Mui-selected': { color: '#007bff' },
              color: '#6c757d'
            }} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AllUsers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperty />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllBookings />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default AdminHome;