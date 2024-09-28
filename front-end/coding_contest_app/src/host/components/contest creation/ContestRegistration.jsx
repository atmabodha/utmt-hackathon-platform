import React from "react";
import { Form, Button } from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import LoadingOverlay from "react-loading-overlay-ts";
import PulseLoader from "react-spinners/PulseLoader";
import "./ContestRegistration.css";
import ContestEditFooter from "./ContestEditFooter.jsx";
import {useFormHandler, useContestRegistrationSubmit} from "./FormHandlers.js";

const ContestRegistration = ({pageTitle, contestUrl, isRegistration}) => {
  const {loading, handleSubmit} = useContestRegistrationSubmit()
  const {formData, handleInputChange, handleFileChange, imageUploadStatus, setFormData} = useFormHandler({
    contestName: "",
    organisationType: "",
    organisationName: "",
    startDateTime: "",
    endDateTime: "",
    contestVisibility: "",
    participantLimit: 500,
    contestImage: null,
  })

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const handleOkClick = () => {
    const outsideClickTarget = document.body;
    if (outsideClickTarget) {
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideClickTarget.dispatchEvent(event);
    }
  };

  const customRenderView = (viewMode, renderDefault) => {
    return (
      <div>
        {renderDefault()}
        {viewMode === 'time' && (
          <button
            type="button"
            id="ok-button"
            onClick={handleOkClick}
          >
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
            style={{ textAlign: "center", fontWeight: 700, paddingTop: "100px" }}
          >
            {pageTitle}
          </h2>
        </div>

        <div>
          <p style={{ textAlign: "center", fontWeight: 700, padding: "5px 0"}}>
            {contestUrl}
          </p>
        </div>
        <div className="form">
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName" required>
              <Form.Label>Contest Name *</Form.Label>
              <Form.Control
                type="text"
                name="contestName"
                placeholder="Enter contest name"
                value={formData.contestName}
                onChange={handleInputChange}
                required
                className="form-control-custom"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupOrganisationType"
              required
            >
              <Form.Label>Organization Type *</Form.Label>
              <Form.Select
                name="organisationType"
                aria-label="Select Organization type"
                value={formData.organisationType}
                onChange={handleInputChange}
                required
                className="form-control-custom"
              >
                <option value="">Select Organization type</option>
                <option value="university">University</option>
                <option value="company">Company</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupOrganisation"
              required
            >
              <Form.Label>Organization Name *</Form.Label>
              <Form.Control
                type="text"
                name="organisationName"
                placeholder="Enter organization name"
                value={formData.organisationName}
                onChange={handleInputChange}
                required
                className="form-control-custom"
              />
            </Form.Group>

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
                  setFormData({ ...formData, endDateTime: date })}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupVisibility"
              required
            >
              <Form.Label>Contest Visibility *</Form.Label>
              <Form.Select
                name="contestVisibility"
                aria-label="Select contest visibility"
                value={formData.contestVisibility}
                onChange={handleInputChange}
                required
                className="form-control-custom"
              >
                <option value="">Select contest visibility type</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Contest Banner Image *</Form.Label>
              <Form.Control
                id="file-input"
                type="file"
                accept=".jpg, .png, .jpeg, .svg"
                onChange={(event) => (handleFileChange(event, 1024 * 1024))}
                required
                className="form-control-custom"
              />
              <label htmlFor="file-input" className="custom-file-button">
                Choose File
              </label>
              {formData.contestImage && (
                <div className="file-name-display">
                  Selected file: {formData.contestImage.name}
                </div>
              )}
              <Form.Text muted>
                Please select a JPG, PNG, JPEG, or SVG file.
              </Form.Text>
              {imageUploadStatus && (
                <div style={{ color: "green", marginTop: "10px" }}>
                  {imageUploadStatus}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupLimit">
              <Form.Label>Participant Limit</Form.Label>
              <Form.Control
                type="number"
                name="participantLimit"
                placeholder="Enter participant limit"
                value={formData.participantLimit}
                onChange={handleInputChange}
                className="form-control-custom"
              />
            </Form.Group>
          </Form>
          {isRegistration ? (<div className="formsubmit">
              <Button variant="primary"  onClick={onSubmit}>
                Submit
              </Button>
            </div>) : ""}
        </div>
      </LoadingOverlay>
      {isRegistration ? "" : (<ContestEditFooter/>)}
    </div>
  );
};

export default ContestRegistration;
