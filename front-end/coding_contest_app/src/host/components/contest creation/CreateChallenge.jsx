import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./CreateChallenge.css";
import ContestEditFooter from "./ContestEditFooter.jsx";
import LoadingOverlay from "react-loading-overlay-ts";
import PulseLoader from "react-spinners/PulseLoader";
import { useFormHandler } from "./FormHandlers.js";
import { sendData } from "../../apis/ApiRequests";
import showSwalAlert from "../../../utilities/AlertComponents.jsx";

import {
  TextInputField,
  SelectInputField,
  SelectMultipleOptions,
} from "../../../utilities/FormComponents.jsx";
import {
  BASE_SERVER_URL,
  CONTESTS,
  HOST_ENDPOINT,
} from "../../../Constants.js";
import Header from "../header/Header.jsx";
import { useUser } from "../../../context/user.jsx";

const CreateChallenge = ({ contestUrl }) => {
  const {current: user} = useUser()
  const [loading, setLoading] = useState();
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
    host: "",
    name: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    difficultyLevel: "",
    tags: [],
    docReference: "",
    points: 1,
  });

  const handleChallengeSubmit = async () => {
    setLoading(true);
    const challengeFormData = new FormData();
    if (user?.uid){
      challengeFormData.append("host", user?.uid)
    }
    challengeFormData.append("name", challengeData.name);
    challengeFormData.append("description", challengeData.description);
    challengeFormData.append("input_format", challengeData.inputFormat);
    challengeFormData.append("output_format", challengeData.outputFormat);
    challengeFormData.append("constraints", challengeData.constraints);
    challengeFormData.append("difficulty_level", challengeData.difficultyLevel);
    challengeFormData.append("doc_references", challengeData.docReference);
    challengeFormData.append("weightage", challengeData.points);
    challengeFormData.append("tags", challengeData.tags);
    const challengeURL =
      BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + "edit/challenge/";
    await sendData(challengeURL, challengeFormData);
    setLoading(false);
    showSwalAlert({ icon: "success", title: "Challenge Added", text: "Redirecting to contest challenges" });
    setTimeout(() => {
      window.opener.postMessage("formSubmitted", "*");  }, 1500);   
  };
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
    <div>
      <Header headerType={"host"} />
      <div className="contest-challenge-filling">
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
              Create Challenge
            </h2>
          </div>

          <div>
            <p
              style={{ textAlign: "center", fontWeight: 700, padding: "5px 0" }}
            >
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
          <ContestEditFooter
            saveChanges={handleChallengeSubmit}
            isChallengeEdit={false}
          />
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default CreateChallenge;
