import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./Challenge.css";
import ContestEditFooter from "./ContestEditFooter.jsx";
import { useFormHandler } from "./FormHandlers.js";
import {
  TextInputField,
  SelectInputField,
  SelectMultipleOptions,
} from "../../../utilities/FormComponents.jsx";

const Challenge = ({ contestUrl }) => {
  const predefinedOptions = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "performance", label: "Performance" },
    { value: "security", label: "Security" },
    { value: "UI", label: "UI" },
    { value: "bug", label: "Bug" },
  ];

  const {
    formData: challengeData,
    handleInputChange,
    handleOtherInputChange,
  } = useFormHandler({
    name: "",
    description: "",
    statement: "",
    inputFormat: "",
    constraints: "",
    outputFormat: "",
    tags: [],
    docReference: "",
    difficultyLevel: "",
    points: 1,
  });

  const inputFields = [
    {
      label: "Challenge name",
      name: "name",
    },
    {
      label: "Description",
      name: "description",
    },
    {
      label: "Problem statement",
      name: "statement",
    },
    {
      label: "Input format",
      name: "inputFormat",
    },
    {
      label: "Constraints",
      name: "constraints",
    },
    {
      label: "Output format",
      name: "outputFormat",
    },
    {
      label: "Doc reference",
      name: "docReference",
    },
  ];

  return (
    <div className="contest-challenge-filling">
      <div>
        <h2
          style={{
            textAlign: "center",
            fontWeight: 700,
            paddingTop: "100px",
          }}
        >
          Create Challenge
        </h2>
      </div>

      <div>
        <p style={{ textAlign: "center", fontWeight: 700, padding: "5px 0" }}>
          {contestUrl}
        </p>
      </div>
      <div className="form">
        <Form>
          {inputFields.map((field, index) => (
            <TextInputField
              key={index}
              label={field.label}
              name={field.name}
              value={challengeData[field.name]}
              onChange={handleInputChange}
              groupClass="mb-3"
              controlClass="form-control-custom"
            />
          ))}
          <SelectInputField
            label="Difficulty level"
            name="difficultyLevel"
            value={challengeData.difficultyLevel}
            onChange={handleInputChange}
            groupClass="mb-3"
            controlClass="form-control-custom"
            options={[
              { value: "medium", label: "Medium" },
              { value: "difficult", label: "Difficult" },
              { value: "easy", label: "Easy" },
            ]}
            ariaLabel="Select difficulty level"
          />
          <TextInputField
            label="Challenge points"
            type="number"
            name="participantLimit"
            value={challengeData.points}
            onChange={handleInputChange}
            required={true}
            groupClass="mb-3"
            controlClass="form-control-custom"
            placeholder="Enter points"
          />

          <SelectMultipleOptions
            name={"tags"}
            id={"tags"}
            value={challengeData.tags}
            label={"Tags for the Problem:"}
            options={predefinedOptions}
            groupClass={"mb-3"}
            handleChange={handleOtherInputChange}
            placeholder={"Select tag for problem"}
            formatCreateLabel={(inputValue) =>
              `Add "${inputValue}" as a new tag`
            }
          />
        </Form>
      </div>
      <ContestEditFooter isChallengeEdit={true}/>
    </div>
  );
};

export default Challenge;
