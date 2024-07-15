import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Datetime from "react-datetime";
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import Swal from "sweetalert2";
import "./ContestDetails.css";

const ContestDetails = () => {
  const [formData, setFormData] = useState({
    contestName: "",
    organisationType: "",
    organisationName: "",
    startDateTime: "",
    endDateTime: "",
    contestVisibility: "",
    participantLimit: 500,
    contestImage: null,
  });
  const [imageUploadStatus, setImageUploadStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      contestImage: e.target.files[0],
    });
    setImageUploadStatus("Image uploaded successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formDataToSend = new FormData();
      formDataToSend.append("contest_name", formData.contestName);
      formDataToSend.append("organisation_type", formData.organisationType);
      formDataToSend.append("organisation_name", formData.organisationName);
      formDataToSend.append("start_date_time", formData.startDateTime);
      formDataToSend.append("end_date_time", formData.endDateTime);
      formDataToSend.append("contest_visibility", formData.contestVisibility);
      formDataToSend.append("participant_limit", formData.participantLimit);
      formDataToSend.append("contest_image", formData.contestImage);

      await axios.post(
        "http://127.0.0.1:8000/host/add-contest-details/",
        formDataToSend
      );

      Swal.fire(
        "Contest Created",
        "Now move to forward for questions",
        "success"
      );
    } catch (error) {
      Swal.fire(
        "Contest not created",
        "Oops! Facing internal server error",
        "error"
      );
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div>
      <div>
        <h2
          style={{ textAlign: "center", fontWeight: 700, paddingTop: "50px" }}
        >
          Create Contest
        </h2>
      </div>
      <div>
        <p style={{ textAlign: "center", fontWeight: 700, padding: "5px 0" }}>
          Host your own contest here on this platform.
        </p>
      </div>
      <div className="form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupName" required>
            <Form.Label>Contest Name *</Form.Label>
            <Form.Control
              type="text"
              name="contestName"
              placeholder="Enter contest name"
              value={formData.contestName}
              onChange={handleChange}
              required
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
              onChange={handleChange}
              required
            >
              <option>Select Organization type</option>
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
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formGroupStartDateTime"
            required
          >
            <Form.Label>Select Start Date and Time *</Form.Label>
            <Datetime
              inputProps={{
                placeholder: "Select start date and time",
              }}
              onChange={(date) =>
                setFormData({ ...formData, startDateTime: date })
              }
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formGroupEndDateTime"
            required
          >
            <Form.Label>Select End Date and Time *</Form.Label>
            <Datetime
              inputProps={{
                placeholder: "Select end date and time",
              }}
              onChange={(date) =>
                setFormData({ ...formData, endDateTime: date })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupVisibility" required>
            <Form.Label>Contest Visibility *</Form.Label>
            <Form.Select
              name="contestVisibility"
              aria-label="Select contest visibility"
              value={formData.contestVisibility}
              onChange={handleChange}
              required
            >
              <option>Select contest visibility type</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formGroupFile" className="mb-3">
            <Form.Label>Contest Banner Image *</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg, .png, .jpeg, .svg"
              onChange={handleFileChange}
            />
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
              onChange={handleChange}
            />
          </Form.Group>

          <div className="formsubmit">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ContestDetails;
