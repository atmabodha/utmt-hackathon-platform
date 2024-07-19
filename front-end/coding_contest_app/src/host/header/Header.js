import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ThemeButton from "./ThemeButton";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaUser } from "react-icons/fa";
import headerData from "./headerData.json";

function OffcanvasExample() {
  const expand = "md";
  const brandData = headerData.host.brandData;
  const navItems = headerData.host.pages;
  const profileItems = headerData.profile;
  const menuItems = [...profileItems, ...navItems];

  return (
    <Navbar expand={expand} className="mb-3" id="header">
      <Container fluid>
        <Navbar.Brand as={Link} to={brandData.linksTo} id="brand-name">
          {brandData.name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          style={{
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
          }}
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              {brandData.name}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body id="menu-bar">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {menuItems.map((item, index) => (
                <Nav.Link as={Link} key={index} to={item.linksTo}>
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Nav className="ml-auto d-none d-md-flex">
          {navItems.map((navItem, index) => (
            <Nav.Link as={Link} id="nav-item" key={index} to={navItem.linksTo}>
              {navItem.name}
            </Nav.Link>
          ))}
          <NavDropdown
            align="end"
            title={
              <FaUser
                style={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                }}
              />
            }
            id="profile-dropdown"
          >
            {profileItems.map((item, index) => (
              <NavDropdown.Item
                as={Link}
                key={index}
                to={item.linksTo}
                style={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                }}
              >
                {item.name}
              </NavDropdown.Item>
            ))}
            <NavDropdown.Item
              style={{
                backgroundColor: "var(--background-color)",
                color: "var(--text-color)",
              }}
            >
              <ThemeButton />
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
