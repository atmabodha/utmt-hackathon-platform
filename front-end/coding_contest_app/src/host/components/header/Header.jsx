import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ThemeButton from "../../../utilities/ThemeButton";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useUser } from "../../../context/user";
import headerData from "../../../utilities/headerData.json";
import { useNavigate } from "react-router-dom";

function Header({ headerType }) {
  const { logout } = useUser();
  const navigte = useNavigate()
  const expand = "md";
  const brandData = headerData[headerType].brandData;
  const navItems = headerData[headerType].pages;
  // const profileItems = headerData.profile;
  const profileItems = headerData.profile;
  const menuItems =
    headerType !== "common"
      ? [profileItems[0], ...navItems, profileItems[1], profileItems[2]]
      : [...navItems];

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        handleCloseOffcanvas();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
      // if(index === profileItems.length - 1 || index === menuItems.length - 1){
        logout()
      navigte("/")
      // }
  }
  return (
    <Navbar expand={expand} id="header" className="fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to={`/${brandData.linksTo}`} id="brand-name">
          {brandData.name}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${expand}`}
          onClick={handleShowOffcanvas}
          className="navbar-toggle-custom"
        >
          <FaBars style={{ color: "var(--text-color)", cursor: "pointer" }} />
        </Navbar.Toggle>
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleCloseOffcanvas}
          style={{
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
          }}
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header className="offcanvas-header-custom">
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              {brandData.name}
            </Offcanvas.Title>
            <FaTimes
              style={{
                color: "var(--text-color)",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
              onClick={handleCloseOffcanvas}
            />
          </Offcanvas.Header>
          <Offcanvas.Body id="menu-bar">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {menuItems.map((item, index) => (
                <Nav.Link as={Link} key={index} to={`/${item.linksTo}`}>
                  {item.name}
                </Nav.Link>
              ))}
              <ThemeButton />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Nav className="ml-auto d-none d-md-flex">
          {navItems.map((navItem, index) => (
            <Nav.Link
              as={Link}
              id="nav-item"
              key={index}
              to={`/${navItem.linksTo}`}
            >
              {navItem.name}
            </Nav.Link>
          ))}
          <div
            style={
              headerType !== "common"
                ? { display: "none" }
                : { paddingTop: "5px" }
            }
          >
            <ThemeButton />
          </div>
          {headerType !== "common" ? (
            <NavDropdown
              align="end"
              className="no-caret"
              title={
                <FaUser
                  size={24}
                  style={{
                    backgroundColor: "var(--background-color)",
                    color: "var(--text-color)",
                  }}
                />
              }
              id="profile-dropdown"
            >
              {profileItems.slice(0, -1).map((item, index) => (
                <NavDropdown.Item
                  as={Link}
                  key={index}
                  to={`/${item.linksTo}`}
                  className="dropdown-card"
                  style={{
                    backgroundColor: "var(--background-color)",
                    color: "var(--text-color)",
                  }}
                >
                  {item.name}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Item
                  as="button"
                  className="dropdown-card"
                  onClick={() => handleLogout()}
                  style={{
                    backgroundColor: "var(--background-color)",
                    color: "var(--text-color)",
                  }}
                >
                  Logout
                </NavDropdown.Item>
              <NavDropdown.Item
                style={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <ThemeButton />
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            ""
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
