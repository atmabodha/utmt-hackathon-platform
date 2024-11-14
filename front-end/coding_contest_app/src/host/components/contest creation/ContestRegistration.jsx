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
import { useParams } from "react-router-dom";
import { getData } from "../../apis/ApiRequests.js";
import { convertToMomentFormat } from "../../../utilities/TimeConversion.jsx";

const ContestRegistration = ({ pageTitle, contestUrl, isRegistration }) => {
  const { contestId } = useParams();
  const [requiredFields, setRequiredFields] = useState({});
  if (!isRegistration) {
    const contestDetailsUrl =
      BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + `edit/${contestId}/details/`;
    useEffect(() => {
      const fetchContestData = async () => {
        const response = await getData(contestDetailsUrl); // Fetch data for the specific contestId
        const contestDetails = response.data.data;

        // Update formData with the fetched data
        if (contestDetails) {
          setFormData({
            contestName: contestDetails.contest_name || "",
            organizationType: contestDetails.organization_type || "",
            organizationName: contestDetails.organization_name || "",
            startDateTime:
              convertToMomentFormat(contestDetails.start_date_time) || "",
            endDateTime:
              convertToMomentFormat(contestDetails.end_date_time) || "",
            contestVisibility: contestDetails.contest_visibility || "",
            participantLimit: contestDetails.participant_limit || 500,
            registrationDeadline:
              convertToMomentFormat(contestDetails.registration_deadline) || "",
          });
        }
        console.log("converted", convertToMomentFormat(contestDetails.start_date_time))
      };

      if (!isRegistration) {
        fetchContestData();
      }
    }, [contestDetailsUrl]);
  }

  const [loading, setLoading] = useState(false);
  const { current: user } = useUser();
  console.log("in regist", user?.uid);
  const navigate = useNavigate();

  const validateRequiredFields = () => {
    const requiredErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        requiredErrors[field] = "Please fill this section.";
      }
    });
    setRequiredFields(requiredErrors);
    return Object.keys(requiredErrors).length === 0;
  };

  const [handleSubmit] = useContestRegistrationSubmit();
  const { formData, handleInputChange, handleOtherInputChange, setFormData } =
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
    if (isRegistration) {
      navigate(`/administration/contests/${contestId}/edit`);
    } else {
      showSwalAlert({
        icon: "success",
        title: "Saved",
        text: "Details has been updated!",
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateRequiredFields()) return;
    setLoading(true);
    if (user?.uid) {
      if (isRegistration) {
        const url =
          BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + "registration/";
        handleSubmit(formData, user.uid, afterSubmission, url);
      } else {
        const url =
          BASE_SERVER_URL +
          HOST_ENDPOINT +
          CONTESTS +
          contestId +
          "/registration/";
        handleSubmit(formData, user.uid, afterSubmission, url);
      }
    }
    setLoading(false);
  };

  // Helper function to set minimum time based on selected date
  const getMinTime = (selectedDate, minDate) => {
    const newDateTime = new Date(minDate);
    const newDateTime1 = new Date(selectedDate);
    newDateTime1.setHours(0, 0);
    newDateTime.setHours(0, 0);
    return newDateTime.toDateString() === newDateTime1.toDateString()
      ? new Date().setHours(
          new Date(minDate).getHours(),
          new Date(minDate).getHours()
        )
      : new Date().setHours(0, 0);
  };

  const getMaxTime = (selectedDate, minDate) => {
    const newDateTime = new Date(minDate);
    const newDateTime1 = new Date(selectedDate);
    newDateTime1.setHours(0, 0);
    newDateTime.setHours(0, 0);
    return newDateTime.toDateString() === newDateTime1.toDateString()
      ? new Date().setHours(
          new Date(minDate).getHours(),
          new Date(minDate).getHours()
        )
      : new Date().setHours(23, 59);
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
            {requiredFields.contestName && (
              <p style={{ color: "red" }}>{requiredFields.contestName}</p>
            )}

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
            {requiredFields.organizationType && (
              <p style={{ color: "red" }}>{requiredFields.organizationType}</p>
            )}

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
            {requiredFields.organizationName && (
              <p style={{ color: "red" }}>{requiredFields.organizationName}</p>
            )}

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
              minDate={new Date()}
              maxDate={formData.startDateTime}
              maxTime={getMaxTime(
                formData.registrationDeadline,
                formData.startDateTime
              )}
              placeholder="Select registration deadline"
              controlClass={"form-control-custom"}
            />
            {requiredFields.registrationDeadline && (
              <p style={{ color: "red" }}>{requiredFields.registrationDeadline}</p>
            )}
            <DateTimeInputField
              label="Select Start Date and Time"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleOtherInputChange}
              controlId="formGroupStartDateTime"
              groupClass="mb-3"
              labelClass=""
              minDate={formData.registrationDeadline || new Date()}
              maxDate={formData.endDateTime}
              maxTime={getMaxTime(formData.startDateTime, formData.endDateTime)}
              minTime={getMinTime(
                formData.startDateTime,
                formData.registrationDeadline
              )}
              inputClass="start-date date-picker"
              required={true}
              placeholder="Select start date and time"
              controlClass={"form-control-custom"}
            />
            {requiredFields.startDateTime && (
              <p style={{ color: "red" }}>{requiredFields.startDateTime}</p>
            )}

            <DateTimeInputField
              label="Select End Date and Time"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleOtherInputChange}
              controlId="formGroupEndDateTime"
              groupClass="mb-3"
              labelClass=""
              minDate={formData.startDateTime || new Date()}
              minTime={getMinTime(formData.endDateTime, formData.startDateTime)}
              inputClass="end-date date-picker"
              required={true}
              placeholder="Select end date and time"
              controlClass={"form-control-custom"}
            />
            {requiredFields.endDateTime && (
              <p style={{ color: "red" }}>{requiredFields.endDateTime}</p>
            )}

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
            {requiredFields.contestVisibility && (
              <p style={{ color: "red" }}>{requiredFields.contestVisibility}</p>
            )}

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
            {requiredFields.participantLimit && (
              <p style={{ color: "red" }}>{requiredFields.participantLimit}</p>
            )}
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
