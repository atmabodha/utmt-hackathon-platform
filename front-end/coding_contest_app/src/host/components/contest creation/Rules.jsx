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
      label: "Contest Rules",
      name: "contestRules",
    }
  ];
  const { formData: rulesData, handleInputChange } = useFormHandler({
    rules: ""
  });

  return (
    <div>
      <div className="rules-contest">
        <div className="rules-contest-header">
          <h2 style={{ fontWeight: 600 }}>Rules</h2>
          <Link
            to=""
            style={{ textDecoration: "none", color: "var(--text-color)" }}
          >
            {contestUrl}www.codehut.com/hackHard
          </Link>
        </div>
        <div className="rules-form">
          <Form>
            {inputFields.map((field, index) => (
              <TextAreaField
                key={index}
                label={field.label}
                name={field.name}
                rows={12}
                value={rulesData[field.name]}
                onChange={handleInputChange}
                controlId={`ControlTextarea${index}`}
                groupClass={"rules-input-field"}
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
