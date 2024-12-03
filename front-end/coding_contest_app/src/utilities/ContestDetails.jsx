import React from "react";
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarAlt, faUniversity, faCalendarTimes, faMapMarkerAlt, faListOl, faInfoCircle, faClock, faUserFriends, faTrophy } from '@fortawesome/free-solid-svg-icons';
import "./styles/ContestDetails.css";
import img1 from "../media/contest detailes/ban2.png";
import img2 from "../media/contest_images/coding.png";
import Header from "../host/components/header/Header";
import { getData } from "../host/apis/ApiRequests";
import { useParams } from "react-router-dom";
import { BASE_SERVER_URL, HOST_ENDPOINT, CONTESTS } from "../Constants";
import { MonthFormattedDate, TimeDifference, convertToMomentFormat } from "./TimeConversion";
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
  const [data, setData] = useState({});
  const { contestId } = useParams();
  const url =
    BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + `edit/${contestId}/details/`;


  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await getData(url); // Fetch data for the specific contestId
        const contestDetails = response.data.data;
  
        // Update formData with the fetched data
        if (contestDetails) {
          console.log(contestDetails)
          setData(contestDetails)
        }
      } catch (error) {
        console.error("Error fetching contest details:", error);
      }
    };
  
    fetchContestData();
  }, [url]);


  return (
    <>
      <div className="contest-detail-page">
        <Header headerType={"participantContestDetails"} contestDetails={"participantContestDetails"}/>
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
              <h2>{data.contest_name}</h2>
              <ContestInfoItem
                icon={faUniversity}
                text={data?.organization_name}
              />
              <ContestInfoItem
                icon={faMapMarkerAlt}
                text="Bhopal - Indore Bypass Road, Indore, India"
              />
              <ContestInfoItem
                icon={faCalendarAlt}
                boldText="Last update at"
                // text={MonthFormattedDate(convertToMomentFormat(data?.updated_at)).toDateString()}
                text="26/11/2024 at 8:45 PM"
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
                // text={TimeDifference(data?.start_data_time, data?.end_data_time)}
              />
              <ContestInfoItem
                icon={faUserFriends}
                boldText="Participant Limit"
                text={data?.participant_limit}
              />
              <ContestInfoItem
                icon={faListOl}
                boldText="Number of problems"
                text="4"
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
                {data?.about}
              </SectionWithTitle>
              <SectionWithTitle
                title="Eligibility"
              >
                {data?.eligibility}
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