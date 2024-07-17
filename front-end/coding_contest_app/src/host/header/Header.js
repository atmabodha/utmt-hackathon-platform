import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function OffcanvasExample({ navItems }) {
  const expand = 'md'; // Set this to the size you need ('sm', 'md', 'lg', 'xl', 'xxl')

  // Profile menu items
  const profileItems = [
    { label: 'Profile', link: '#' },
    { label: 'Settings', link: '#' },
    { label: 'Logout', link: '#' },
  ];

  const combinedItems = [
    { label: 'Profile', link: '#profile' },
    { label: 'Leaderboard', href: '#leaderboard' },
    { label: 'Host', href: '#host' },
    { label: 'Submissions', href: '#submissions' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Support', href: '#support' },
    { label: 'Settings', link: '#settings' },
    { label: 'Logout', link: '#logout' },
  ];


  return (
    <Navbar expand={expand} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="#">Code Hut</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Code Hut
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body id='menu-bar'>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {combinedItems.map((item, index) => (
                <Nav.Link key={index} href={item.link}>
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Nav className="ml-auto d-none d-md-flex">
          {navItems.map((navbutton, index) => (
            <Nav.Link key={index} href={navbutton.link}>
              {navbutton.label}
            </Nav.Link>
          ))}
          <NavDropdown
            align="end"
            title={
              <img
                src="./HeaderAssets/profile.jpg" // replace with your image path
                alt="" // Add alt text for the image
                className="rounded-circle"
                style={{ width: '22px', height: '22px' }}
              />
            }
            id="profile-dropdown"
          >
            {profileItems.map((item, index) => (
              <NavDropdown.Item key={index} href={item.link}>
                {item.label}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
