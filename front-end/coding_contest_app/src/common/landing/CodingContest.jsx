import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CodingContest.css";
import { Link } from "react-router-dom";

const CodingContests = () => {
  return (
      <div className="container">
        <div className="row contest-container align-items-center">
          {/* Text Section */}
          <div className="col-lg-6 text-center text-lg-start">
            <p className="text-uppercase text-muted small">
              Empowering Coders
            </p>
            <h1 className="display-4 fw-bold text-primary">
              Coding Contests:
            </h1>
            <p className="lead" style={{paddingTop: "15px"}}>
              Unlock Your Full Potential: Dive into the Realm of Coding
              Contests and Elevate Your Skills to New Heights. Embrace the
              thrill of competition.
            </p>
            <div className="d-flex flex-column flex-lg-row gap-3 mt-4">
              <Link className="btn hero-button btn-lg rounded-pill">
                Host Now
              </Link>
              <Link className="btn hero-button btn-lg rounded-pill">
                Tracking your progess
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 text-center mt-4 mt-lg-0">
            <img
              src="https://img.freepik.com/free-vector/young-tiny-girl-sitting-coding-via-laptop-computer-programmer-code-flat-vector-illustration-it-digital-technology_74855-8751.jpg?t=st=1733055746~exp=1733059346~hmac=11f675944e109b2b79c6f2577b8cae2d355b45f5aa474094fa0ed14ab4b2db7b&w=1060"
              alt="Coding Contests"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
  );
};

export default CodingContests;
