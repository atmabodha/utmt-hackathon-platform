import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay-ts";
import PulseLoader from "react-spinners/PulseLoader";
import "./ContestRegistration.css";
import ContestEditFooter from "./ContestEditFooter.jsx";
import {
  useFormHandler,
  useContestRegistrationSubmit,
} from "./FormHandlers.js";
import {
  TextInputField,
  SelectInputField,
  DateTimeInputField,
} from "../../../utilities/FormComponents.jsx";
import {
  BASE_SERVER_URL,
  HOST_ENDPOINT,
  CONTESTS,
} from "../../../Constants.js";
import { useUser } from "../../../context/user.jsx";
import { useNavigate } from "react-router-dom";
import showSwalAlert from "../../../utilities/AlertComponents.jsx";

const ContestRegistration = ({ pageTitle, contestUrl, isRegistration }) => {
  const [loading, setLoading] = useState(false);
  const {current: user} = useUser()
  console.log("in regist", user?.uid)
  const navigate = useNavigate();
  const url = BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + "registration/";
  const [ handleSubmit ] = useContestRegistrationSubmit(url);
  const { formData, handleInputChange, handleOtherInputChange } =
    useFormHandler({
      contestName: "",
      organizationType: "",
      organizationName: "",
      startDateTime: "",
      endDateTime: "",
      contestVisibility: "",
      participantLimit: 500,
      registrationDeadline: "",
    });

  const afterSubmission = (contestId) => { 
      if (isRegistration){ 
          navigate(`/administration/contests/${contestId}/edit`);
      }else{
        showSwalAlert({ icon: "success", title: "Saved", text: "Details has been updated!" });
      }
    }
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (user?.uid) {
      handleSubmit(formData, user.uid, afterSubmission);
    }
    setLoading(false);
  };

  return (
    <div className="contest-detail-filling">
      <LoadingOverlay
        active={loading}
        text="It will not take more than few seconds"
        spinner={
          <PulseLoader
            color={"var(--text-color)"}
            loading={true}
            size={15}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      >
        <div>
          <h2
            style={{
              textAlign: "center",
              fontWeight: 700,
              paddingTop: "100px",
            }}
          >
            {pageTitle}
          </h2>
        </div>

        <div>
          <p style={{ textAlign: "center", fontWeight: 700, padding: "5px 0" }}>
            {contestUrl}
          </p>
        </div>
        <div className="form">
          <Form>
            <TextInputField
              label="Contest Name"
              name="contestName"
              value={formData.contestName}
              onChange={handleInputChange}
              required={true}
              groupClass="mb-3"
              controlClass="form-control-custom"
              placeholder="Enter contest name"
            />

            <SelectInputField
              label="Organization Type"
              name="organizationType"
              value={formData.organizationType}
              onChange={handleInputChange}
              required={true}
              groupClass="mb-3"
              controlClass="form-control-custom"
              options={[
                { value: "university", label: "University" },
                { value: "company", label: "Company" },
                { value: "other", label: "Other" },
              ]}
              ariaLabel="Select Organization type"
            />

            <TextInputField
              label="Organisation Name"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              required={true}
              groupClass="mb-3"
              controlClass="form-control-custom"
              placeholder="Enter organisation name"
            />

            <DateTimeInputField
              label="Select Start Date and Time"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleOtherInputChange}
              controlId="formGroupStartDateTime"
              groupClass="mb-3"
              labelClass=""
              inputClass="start-date date-picker"
              required={true}
              placeholder="Select start date and time"
            />

            <DateTimeInputField
              label="Select End Date and Time"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleOtherInputChange}
              controlId="formGroupEndDateTime"
              groupClass="mb-3"
              labelClass=""
              inputClass="end-date date-picker"
              required={true}
              placeholder="Select end date and time"
            />

            <DateTimeInputField
              label="Select registration deadline"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleOtherInputChange}
              controlId="formGroupRegistrationDeadline"
              groupClass="mb-3"
              labelClass=""
              inputClass="start-date date-picker"
              required={true}
              placeholder="Select registration deadline"
            />

            <SelectInputField
              name="contestVisibility"
              label="Contest Visibility"
              aria-label="Select contest visibility"
              value={formData.contestVisibility}
              onChange={handleInputChange}
              required={true}
              groupClass="mb-3"
              controlClass="form-control-custom"
              options={[
                { value: "public", label: "Public" },
                { value: "private", label: "Private" },
              ]}
            />

            <TextInputField
              label="Participant Limit"
              type="number"
              name="participantLimit"
              value={formData.participantLimit}
              onChange={handleInputChange}
              required={true}
              groupClass="mb-3"
              controlClass="form-control-custom"
              placeholder="Enter participant limit"
            />
          </Form>
          {isRegistration ? (
            <div className="formsubmit">
              <Button variant="primary" onClick={onSubmit}>
                Submit
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </LoadingOverlay>
      {isRegistration ? "" : <ContestEditFooter saveChanges={onSubmit} />}
    </div>
  );
};

export default ContestRegistration;
