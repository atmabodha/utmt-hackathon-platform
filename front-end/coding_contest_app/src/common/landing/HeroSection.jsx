import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Codehut
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link1 hover-button" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link1 hover-button" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link1 hover-button" to="/participant">
                Contests
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link1 hover-button" to="/administration/dashboard">
                Host
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link1 hover-button" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link1 hover-button" to="/login">
                Log in
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link1 hover-button" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

      {/* Hero Section */}
      <div className="container mt-5">
        <div className="row hero-section">
          {/* Text Section */}
          <div className="col-lg-6 text-center text-lg-start pt-1 custome-text">
            <p className="text-uppercase text-muted small">
              Unlock Your Coding Potential
            </p>
            <h1 className="display-4 fw-bold text-primary mt-1">
              Unleash Your Coding Prowess
            </h1>
            <p className="lead text-muted" style={{paddingTop: "20px"}}>
              Discover the Ultimate Coding Contest Platform: Where Innovation
              Meets Competition
            </p>
            <Link className="btn hero-button btn-lg rounded-pill mt-3" to="/administration/dashboard">
              Join Now
            </Link>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 text-center mt-4 mt-lg-0">
            <img
              // src="https://via.placeholder.com/500x300"
              src="https://img.freepik.com/premium-vector/web-developer-working-computer-programming-coding_24911-10259.jpg"
              alt="Coding Contest"
              className="banner-images img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
