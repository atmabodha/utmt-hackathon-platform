import React, { useState } from "react";
import { TextInputField } from "../../../utilities/FormComponents";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useUser } from "../../../context/user";
import { useFormHandler } from "../contest creation/FormHandlers";
import LoadingOverlay from "react-loading-overlay-ts";
import PulseLoader from "react-spinners/PulseLoader";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { current: user, signup } = useUser();
  const { formData: signUpData, handleInputChange } = useFormHandler({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredentials = await signup(
        signUpData.email,
        signUpData.password,
        signUpData.name
      );
      if (userCredentials) {
        navigate("/administration/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const signUpFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      controlClass: "form-control-custom",
      placeholder: "Enter your name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      controlClass: "form-control-custom",
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      controlClass: "form-control-custom",
      placeholder: "Enter your password",
    },
  ];

  return (
    <div className="signup-page">
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
        <div className="signup-form">
          <div>
            <h1>Code Hut</h1>
            <h2>Sign Up</h2>
          </div>
          <div className="signup-input-fields">
            <Form>
              {signUpFields.map((field, index) => (
                <TextInputField
                  key={index}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={signUpData[field.name]}
                  onChange={handleInputChange}
                  groupClass={"signup-input-field"}
                  placeholder={field.placeholder}
                  controlClass={"input-field"}
                />
              ))}
            </Form>
          </div>
          <div className="signup-form-footer">
            <Button className="signup-btn" onClick={handleSubmit}>
              Submit
            </Button>
            <div className="signup-footer-text">
              <p className="signup-footer-text">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </div>
  );
};

export default SignUp;
