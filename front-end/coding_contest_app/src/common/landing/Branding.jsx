import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Branding.css";

const BrandingPage = () => {
  return (
    <div className="container my-5">
      <div className="row branding-row align-items-center">
        {/* Image Section */}
        <div className="col-lg-6 text-center">
          <img
            // src="https://img.freepik.com/premium-vector/web-developer-wiring-code-program_773186-894.jpg?w=996"
            alt="Developer at Work"
            src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg?t=st=1733055535~exp=1733059135~hmac=7a362066a48356726282a05b631fd0edbdb7d4709848b10d28f68e9cde4fba6b&w=740"
            className="img-fluid banner-images"
          />
        </div>

        {/* Text Section */}
        <div className="col-lg-6 text-center text-lg-start mt-4 mt-lg-0">
          <p className="text-uppercase text-muted small">
            Elevate Your Coding Journey
          </p>
          <h1 className="display-5 fw-bold text-primary">
            Immerse Yourself in a World of
          </h1>
          <p className="lead text-muted">
            Discover the Ultimate Coding Contest Platform: Where Aspiring
            Developers Converge to Showcase Their Talents, Push the Boundaries
            of Innovation.
          </p>
          <Link className="hero-button btn btn-lg rounded-pill mt-3" to="/participant">
            Participate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandingPage;
