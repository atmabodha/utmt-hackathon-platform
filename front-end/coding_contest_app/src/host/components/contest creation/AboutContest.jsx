import React from "react";
import "./AboutContest.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ContestEditFooter from "./ContestEditFooter";
import { useFormHandler } from "./FormHandlers";
import TextAreaField, {
  FileInputField,
} from "../../../utilities/FormComponents";

function AboutContest({ contestUrl }) {
  const inputFields = [
    {
      label: "About",
      name: "about",
    },
    {
      label: "Eligibility",
      name: "eligibility",
    },
    {
      label: "Rules",
      name: "rules",
    },
    {
      label: "Others",
      name: "others",
    },
  ];
  const {
    formData: aboutData,
    handleInputChange,
    handleFileChange,
    imageUploadStatus,
  } = useFormHandler({
    about: "sdfsafa",
    eligibility: "",
    others: "",
    rules: "",
    bannerImage: null,
  });

  return (
    <div>
      <div className="about-contest">
        <div className="about-contest-header">
          <h2 style={{ fontWeight: 600 }}>About the Contest</h2>
          <Link
            to=""
            style={{ textDecoration: "none", color: "var(--text-color)" }}
          >
            {contestUrl}www.codehut.com/hackHard
          </Link>
        </div>
        <div className="about-form">
          <Form>
            <FileInputField
              label="Contest Banner Image"
              name="bannerImage"
              onChange={(event) => handleFileChange(event, 1024 * 1024)}
              required={false}
              groupClass="mb-3 about-input-field"
              labelClass="text-area-label"
              controlClass="form-control-custom"
              accept=".jpg, .png, .jpeg, .svg"
              value={aboutData.bannerImage}
              helperText="Please select a JPG, PNG, JPEG, or SVG file."
              uploadStatus={imageUploadStatus}
            />
            {inputFields.map((field, index) => (
              <TextAreaField
                key={index}
                label={field.label}
                name={field.name}
                value={aboutData[field.name]}
                onChange={handleInputChange}
                controlId={`ControlTextarea${index}`}
                groupClass={"about-input-field"}
                labelClass={"text-area-label"}
                controlClass={"text-area-control"}
              />
            ))}
          </Form>
        </div>
      </div>
      <ContestEditFooter />
    </div>
  );
}

export default AboutContest;
