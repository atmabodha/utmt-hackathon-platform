import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardLink,
} from "mdb-react-ui-kit";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import FetchContestDetails from "../apis/Contests";
import { useState, useEffect } from "react";

const ContestHistory = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContest = async () => {
      const response = await FetchContestDetails();
      console.log(response);
      setContests(response);
    };
    fetchContest();
  }, []);

  return (
    <div>
      <div>
        <h1
          style={{ textAlign: "center", fontWeight: 700, paddingTop: "100px" }}
        >
          Contests
        </h1>
      </div>
      <div className="contest-filter d-flex justify-content-around">
        <div>
          <NavLink activeClassName="active" to="" className="contest-type">
            Live
          </NavLink>
        </div>
        <div>
          <NavLink activeClassName="active" to="" className="contest-type">
            Scheduled
          </NavLink>
        </div>
        <div>
          <NavLink activeClassName="active" to="" className="contest-type">
            Past
          </NavLink>
        </div>
      </div>
      <div className="contest-cards">
        <MDBRow className="row-cols-1 row-cols-sm-2  row-cols-lg-3 row-cols-xl-4 g-4">
          {contests.map((contest, index) => (
            <MDBCol key={index}>
              <MDBCard>
                <MDBCardImage
                  src="https://lh3.googleusercontent.com/fife/ALs6j_FCBRU6cDTa1iZ28VEANQ__ymT0OthmMY8p_p9bhQMLVACYpf_cJ8QBvoG6ktGGrh9Zz4OVeZoPSkl14OVQE8c8LyNrRgUxpM4mI4W_BDvk-PMKasPYTH5tiJ608aWWFkQBXs4jcOwId9iq8XGKxpNNVKmQ66D-5m_bRZL1JXJyXkQ57iR49lOEiAgUn4w59gPT8IM-Jo4qP-9kZUonJ9PuXhUJbxJNQ_j5D2_tX53btsoDoIUFO9VxPm2y_OabIeqaDE5z8-AypuQYRrpHBvXZxCFF5PggHHOtHhhfgBFykGKX6RgYOcIikQK56bhccwfVvscB1BuMr9F21yde_KDlCA9phOCgiZ2f5Aj2D7DVbSgEinf4pY0DS6HdxmgfuGis-Tol8Fa473bmyAJ5e2Xcj8N3MtCwwfAHREvl5M7gAUNXv923Gq8rALOKYmj2WNwTh8skCUMYX9kAXDyce3S2VA_o1G6gMENmUpWkatELs-II5bQhvEN5TKsANjHun_wL89542NdBNg_7E0Vgaj0FZMtl7U2LCmrSeXFvuOF9gVoX3LuQyyPtRFwWwLEMmQcLm9UpB9abQlKC-yX3N6UxmfmWcveXAQMRTPXcv0hJspAfjO3LYHI7xc-Whpjucki_7NDWt1HbHimaQFAfTw4PeJ-YoDneFBrFBnJujshNeDi6jNuu7EYXCDVHQ-qHMyzG8Ayvutbvw76scRXC3Z7lcA1LrfaUO-866huthnpJ4WajaqPFdR6bmqEc6tL53sJRSTBB7oP3oSDTYUlxk2yyV6TzZ8O1n8pJwLG-3FPeFOEFy9arHYJ6niXfLEm5xPAkaXLpkWq3XjhiJKj3ka8HDwHGXT99e3mcVuurXOAvPEl3pkKgj7koPQDMGO47q2fi9Gw6a2V6nhTTQkQ7ohLrNz99uFSIwz7zHrmQx6xVtImLlCRp3eMYYC3miipdKwd-1WsyOjmVW9oRNAfeICQ5NWxjhPgGfabynDmDdsMIFco2KonEVy4smFbi2NDlhZOGmmi6BVHEMGdbzTK_Wd9MPeNjDjLTPzOnzkd1RPjnyBwg-I6DU5uw9mwbo4Sd0S7OH43WnqCpRrL7NzI9spKPkVpA1u75WinPPnLD0lPothZQ5JviomH5pOkHlDFvebUgqYHmNl8HS4N07q77eTZspmugsTWZnFQsL5Zhe8W4fy0NJZasmAgTBMavOSmfC0lVWH3e0iKr9hsD-l_grmuVJrIgb8GtN4DYd1xB6Mp0aoMBgrE1gwlfCM4TNLnLcrEAumoEpxrCyJFwPN-Aty7FDow9EBWkclsQqLIBSuzIZ67qxpz_JgMwdpD1WHf0zkL_3YUAx20WUOy31hemdFuO6DOY7Gz3msM7egfp2bPq9UP-c_TuGsFPgx-EWdPEHUcbgKwzmWENlducH783c7CG837Z4j9xNDkQC2-TObtUQYPdSZdDJGprY5eKRopGD-WaHsy2C3qWCgCjc22kpUR4v4lLpjQgzpruqy78yomVpihmPvNFwKe1SPlbJkNGhJJmJytLrizwzEOTCPoShZte83RD1s0TnectZR-4IqqFLZ38OcHmTeVzrIoK-YLBbAAu4fGojJ0WJPM2-2SgwOi_Rp8pOFSvl5cm8Sop094=s220?authuser=0"
                  alt={index}
                  position="top"
                />

                <MDBCardBody>
                  <MDBCardTitle className="title">
                    {contest.contest_name}
                  </MDBCardTitle>
                  <MDBCardText className="text">
                    <div className="flex-container">
                      <span className="left-text">Started On:</span>
                      <span className="right-text">
                        {contest.start_date_time}
                      </span>
                    </div>
                    <div className="flex-container">
                      <span className="left-text">Ends On:</span>
                      <span className="right-text">
                        {contest.end_date_time}
                      </span>
                    </div>
                    <div className="flex-container">
                      <span className="left-text">Participant Limit:</span>
                      <span className="right-text">
                        {contest.participant_limit}
                      </span>
                    </div>
                  </MDBCardText>
                  <div className="details">
                    <MDBBtn>Join the contest</MDBBtn>
                    <MDBCardLink href={contest.details}>Details</MDBCardLink>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    </div>
  );
};

export default ContestHistory;
