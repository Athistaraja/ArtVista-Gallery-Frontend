import React, { useState } from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Ensure this is correctly imported

const Header = ({ cartItems }) => {
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = () => {
    // Clear JWT and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/" className="brand-name">ArtVista</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {/* <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link> */}
          <Nav.Link as={Link} to="/cart" className="cart-link">
            <i className="fas fa-shopping-cart"></i>
            <Badge pill className="cart-badge">{cartItems}</Badge>
          </Nav.Link>
          <Nav.Link as={Link} to="/artistdashboard">Artist Dashboard</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link> {/* Attach the logout function here */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
