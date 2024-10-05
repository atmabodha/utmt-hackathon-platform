import React from "react";
import "./Prizes.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ContestEditFooter from "./ContestEditFooter";
import { useFormHandler } from "./FormHandlers";
import TextAreaField from "../../../utilities/FormComponents";
import { BASE_SERVER_URL, CONTESTS, HOST_ENDPOINT } from "../../../Constants";

function Prizes({ contestUrl }) {
  const inputFields = [
    {
      label: "Prize Position",
      name: "prizePosition",
    },
    {
      label: "Prize Description",
      name: "prizeDescription",
    },
    {
      label: "Prize Amount",
      name: "prizeAmount",
    },
    {
      label: "Others",
      name: "others",
    },
  ];
  const { formData: prizeData, handleInputChange } = useFormHandler({
    contest: 1,
    prizePosition: "",
    prizeDescription: "",
    prizeAmount: "",
    others: "",
  });

  const handlePrizeSubmit = async () => {
    const prizeFormData = new FormData();
    prizeFormData.append("contest", prizeData.contest);
    prizeFormData.append("prize_position", prizeData.prizePosition);
    prizeFormData.append("prizeDescription", prizeData.prizeDescription);
    prizeFormData.append("prizeAmount", prizeData.prizeAmount);
    prizeFormData.append("others", prizeData.others);
    const url = BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + "edit/prizes/";
    await sendData(url, prizeFormData);
  };

  return (
    <div>
      <div className="prize-contest">
        <div className="prize-contest-header">
          <h2 style={{ fontWeight: 600 }}>Prizes</h2>
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
      <ContestEditFooter saveChanges={handlePrizeSubmit} />
    </div>
  );
}

export default Prizes;
