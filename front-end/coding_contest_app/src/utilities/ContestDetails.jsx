import React from "react";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarAlt, faUniversity, faCalendarTimes, faMapMarkerAlt, faListOl, faInfoCircle, faClock, faUserFriends, faTrophy } from '@fortawesome/free-solid-svg-icons';
import "./styles/ContestDetails.css";
import img1 from "../media/contest detailes/ban2.png";
import img2 from "../media/contest_images/coding.png";
import Header from "../host/components/header/Header";

const ContestInfoItem = ({ icon, text, boldText }) => (
  <p>
    <FontAwesomeIcon icon={icon} size="md" style={{ paddingRight: "10px" }} />
    {boldText && <b>{boldText}: </b>}
    {text}
  </p>
);

const SectionWithTitle = ({ title, children }) => (
  <div>
    <h4>{title}</h4>
    <p>{children}</p>
  </div>
);

const ContestDetails = () => {
  return (
    <>
      <div className="contest-detail-page">
        <Header headerType={"participant"} />
        <div className="contest-details">
          <div className="contest-details-images">
            <div className="image1-div">
              <Image
                className="image1"
                src={img1}
                alt="Contest Background"
              />
              <div className="image2-div">
                <Image
                  className="image2"
                  src={img2}
                  alt="Coding Contest"
                />
              </div>
            </div>
          </div>

          <div className="contest-details-metadata">
            <div>
              <h2>Hack Hard</h2>
              <ContestInfoItem
                icon={faUniversity}
                text="Sitare University"
              />
              <ContestInfoItem
                icon={faMapMarkerAlt}
                text="Bhopal - Indore Bypass Road, Indore, India"
              />
              <ContestInfoItem
                icon={faCalendarAlt}
                boldText="Last updated"
                text="23/06/2024"
              />
              <ContestInfoItem
                icon={faCalendarCheck}
                boldText="Contest starts On"
                text="24/06/2024 at 8:30 PM"
              />
            </div>

            <div className="contest-details-metadata-right">
              <h3 className="deadline-heading">
                Dates and Deadlines
              </h3>
              <ContestInfoItem
                icon={faCalendarTimes}
                boldText="Registration ends"
                text="23/04/2024 at 12 AM"
              />
              <ContestInfoItem
                icon={faClock}
                boldText="Contest Duration"
                text="180 Minutes"
              />
              <ContestInfoItem
                icon={faUserFriends}
                boldText="Participant Limit"
                text="500"
              />
              <ContestInfoItem
                icon={faListOl}
                boldText="Number of problems"
                text="15"
              />
            </div>
          </div>

          <div className="contest-other-details">
            <div className="contest-other-details-left">
              <h3>
                Contest Details
                <FontAwesomeIcon icon={faInfoCircle} size="sm" style={{ paddingLeft: "15px" }} />
              </h3>
              <SectionWithTitle
                title="About"
              >
                This was a concept for a client who is building a productivity suite of tools that allow uniform data management across all domains of life.
              </SectionWithTitle>
              <SectionWithTitle
                title="Eligibility"
              >
                This was a concept for a client who is building a productivity suite of tools that allow uniform data management across all domains of life.
              </SectionWithTitle>
              <SectionWithTitle
                title="Others"
              >
                This was a concept for a client who is building a productivity suite of tools that allow uniform data management across all domains of life.
              </SectionWithTitle>

              <h3>
                Prizes and Benefits
                <FontAwesomeIcon icon={faTrophy} size="sm" style={{ paddingLeft: "15px" }}/>
              </h3>
              <SectionWithTitle
                title="Winner"
              >
                This was a concept for a client who is building a productivity suite of tools that allow uniform data management across all domains of life.
              </SectionWithTitle>
              <SectionWithTitle
                title="Runner up"
              >
                This was a concept for a client who is building a productivity suite of tools that allow uniform data management across all domains of life.
              </SectionWithTitle>
              <SectionWithTitle
                title="Others"
              >
                This was a concept for a client who is building a productivity suite of tools that allow uniform data management across all domains of life.
              </SectionWithTitle>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContestDetails;