import React from "react";
import "./Rules.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ContestEditFooter from "./ContestEditFooter";
import { useFormHandler } from "./FormHandlers";
import TextAreaField from "../../../utilities/FormComponents";

function Rules({ contestUrl }) {
  const inputFields = [
    {
      label: "Winner Rules",
      name: "winnerPrize",
    },
    {
      label: "1st Runner up prize",
      name: "firstRunnerUpPrize",
    },
    {
      label: "2nd Runner up prize",
      name: "secondRunnerUpPrize",
    },
    {
        label: "Others",
        name: "others",
      },
  ];
  const { formData: prizeData, handleInputChange } = useFormHandler({
    winnerPrize: "",
    firstRunnerUpPrize: "",
    secondRunnerUpPrize: "",
    others: ""
  });

  return (
    <div>
      <div className="prize-contest">
        <div className="prize-contest-header">
          <h2 style={{ fontWeight: 600 }}>Rules</h2>
          <Link
            to=""
            style={{ textDecoration: "none", color: "var(--text-color)" }}
          >
            {contestUrl}www.codehut.com/hackHard
          </Link>
        </div>
        <div className="prize-form">
          <Form>
            {inputFields.map((field, index) => (
              <TextAreaField
                key={index}
                label={field.label}
                name={field.name}
                value={prizeData[field.name]}
                onChange={handleInputChange}
                controlId={`ControlTextarea${index}`}
                groupClass={"prize-input-field"}
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

export default Rules;
