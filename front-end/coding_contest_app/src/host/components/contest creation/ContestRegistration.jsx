import React from "react";
import { Form, Button } from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
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
  FileInputField,
} from "../../../utilities/FormComponents.jsx";

const ContestRegistration = ({ pageTitle, contestUrl, isRegistration }) => {
  const { loading, handleSubmit } = useContestRegistrationSubmit();
  const {
    formData,
    handleInputChange,
    handleFileChange,
    imageUploadStatus,
    setFormData,
  } = useFormHandler({
    contestName: "",
    organisationType: "",
    organisationName: "",
    startDateTime: "",
    endDateTime: "",
    contestVisibility: "",
    participantLimit: 500,
    contestImage: null,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const handleOkClick = () => {
    const outsideClickTarget = document.body;
    if (outsideClickTarget) {
      const event = new MouseEvent("mousedown", { bubbles: true });
      outsideClickTarget.dispatchEvent(event);
    }
  };

  const customRenderView = (viewMode, renderDefault) => {
    return (
      <div>
        {renderDefault()}
        {viewMode === "time" && (
          <button type="button" id="ok-button" onClick={handleOkClick}>
            OK
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="contest-detail-filling">
      <LoadingOverlay
        active={loading}
        text="Hold tight digesting the details..."
        spinner={
          <PulseLoader
            color={"black"}
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
              controlClass="form-control-custom" // Custom control class
              placeholder="Enter contest name" // Placeholder can be customized
            />

            <SelectInputField
              label="Organization Type"
              name="organisationType"
              value={formData.organisationType}
              onChange={handleInputChange}
              required={true} // Mark this field as required
              groupClass="mb-3" // Bootstrap margin bottom
              controlClass="form-control-custom" // Custom control class
              options={[
                { value: "university", label: "University" },
                { value: "company", label: "Company" },
                { value: "other", label: "Other" },
              ]}
              ariaLabel="Select Organization type"
            />
            <TextInputField
              label="Organisation Name"
              name="organisationName"
              value={formData.organisationName}
              onChange={handleInputChange}
              required={true}
              groupClass="mb-3"
              controlClass="form-control-custom"
              placeholder="Enter organisation name" // Placeholder can be customized
            />

            <Form.Group
              className="mb-3"
              controlId="formGroupStartDateTime"
              required
            >
              <Form.Label>Select Start Date and Time *</Form.Label>
              <Datetime
                className="start-date date-picker"
                timeFormat={true}
                dateFormat={true}
                renderView={customRenderView}
                inputProps={{
                  placeholder: "Select start date and time",
                  className: "form-control-custom",
                }}
                onChange={(date) =>
                  setFormData({ ...formData, startDateTime: date })
                }
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupEndDateTime"
              required
            >
              <Form.Label>Select End Date and Time *</Form.Label>
              <Datetime
                className="end-date date-picker"
                timeFormat={true}
                dateFormat={true}
                renderView={customRenderView}
                inputProps={{
                  placeholder: "Select end date and time",
                  className: "form-control-custom",
                }}
                onChange={(date) =>
                  setFormData({ ...formData, endDateTime: date })
                }
              />
            </Form.Group>

            <SelectInputField
              name="contestVisibility"
              label="Contest Visibility"
              aria-label="Select contest visibility"
              value={formData.contestVisibility}
              onChange={handleInputChange}
              required={true} // Mark this field as required
              groupClass="mb-3" // Bootstrap margin bottom
              controlClass="form-control-custom" // Custom control class
              options={[
                { value: "public", label: "Public" },
                { value: "private", label: "Private" },
              ]}
            />

            <FileInputField
              label="Contest Banner Image"
              name="contestImage"
              onChange={(event) => handleFileChange(event, 1024 * 1024)}
              controlId="file-input"
              required={true} // Mark this field as required
              groupClass="mb-3" // Bootstrap margin bottom
              labelClass="form-label" // Custom label class
              controlClass="form-control-custom" // Custom control class
              accept=".jpg, .png, .jpeg, .svg" // Allowed file types
              value={formData.contestImage} // Current file object
              helperText="Please select a JPG, PNG, JPEG, or SVG file." // Helper text
              uploadStatus={imageUploadStatus} // Upload status message
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
