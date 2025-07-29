import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../../images/p1.jpg';
import p2 from '../../images/p2.jpg';
import p3 from '../../images/p3.jpg';
import p4 from '../../images/p4.jpg';
import AllPropertiesCards from '../user/AllPropertiesCards';

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
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

      <div className='home-body'>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              src={p1}
              className="d-block w-100"
              alt="First slide"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={p2}
              className="d-block w-100"
              alt="Second slide"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={p3}
              className="d-block w-100"
              alt="Third slide"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={p4}
              className="d-block w-100"
              alt="Fourth slide"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className='property-content'>
        <div className='text-center'>
          <h1 className='m-1 p-5' style={{ color: '#343a40' }}>One Stop Solution for all your Property Needs</h1>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#555' }}>
            Want to post your Property?{" "}
            <Link to={'/register'}>
              <Button
                variant='primary'
                style={{
                  backgroundColor: '#007bff',
                  borderColor: '#007bff',
                  color: 'white',
                  borderRadius: '5px',
                  padding: '8px 20px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                Register as Owner
              </Button>
            </Link>
          </p>
        </div>

        <Container>
          <AllPropertiesCards />
        </Container>
      </div>
    </>
  );
};

export default Home;