import React from "react";
import { Form } from "react-bootstrap";
import "./styles/FormComponents.css";

export function TextArea({textAreaName, customeStyle}) {
  return (
    <div>
      <Form>
        <Form.Group controlId="ControlTextarea1">
          <Form.Label className="text-area-label">{textAreaName}</Form.Label>
          <Form.Control as="textarea" rows={5} className="text-area-control"/>
        </Form.Group>
      </Form>
    </div>
  );
}


