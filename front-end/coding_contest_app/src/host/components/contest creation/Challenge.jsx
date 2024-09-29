import React, { useState } from "react";
import { Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import "./Challenge.css";
import ContestEditFooter from "./ContestEditFooter.jsx";
import { useFormHandler } from "./FormHandlers.js";
import {
  TextInputField,
  SelectInputField,
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--card-color)',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--card-color)',
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : state.isFocused ? 'var(--secondary-color)' : 'var(--card-color)',
      color: 'var(--text-color)',
      padding: 10,
    }),
  };

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
          <label
            htmlFor="tags"
          >
            Tags for the Problem:
          </label>

          <CreatableSelect
            isMulti
            label="Difficulty level"
            name="tags"
            id="tags"
            options={predefinedOptions} 
            value={challengeData.tags}
            groupClass="mb-3"
            onChange={(selectedTags) =>
              handleOtherInputChange("tags", selectedTags)
            }
            placeholder="Select tag for problem"
            formatCreateLabel={(inputValue) =>
              `Add "${inputValue}" as a new tag`
            }
            className="form-control-custom"
            styles={customStyles}
          />
        </Form>
      </div>
      <ContestEditFooter />
    </div>
  );
};

export default Challenge;
