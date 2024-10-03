import React, { useState, useEffect } from "react";
import { TextInputField } from "../../../utilities/FormComponents";
import { useFormHandler } from "../contest creation/FormHandlers";
import "./Login.css";

// Component function
const Login = () => {
  const { formData: loginData, handleInputChange } = useFormHandler({
    email: "",
    password: "",
  });

  // Function to handle form submission (e.g., log or send data)
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("User data:", loginData);
    // You can handle login logic here, like sending data to an API
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <TextInputField
            label="Email"
            type="email"
            controlClass={"login-input"}
            placeholder="Enter your email"
            required={true}
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
          />
          <TextInputField
            label="Password"
            type="password"
            controlClass={"login-input"}
            placeholder="Enter your password"
            required={true}
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <div className="login-links">
          <a href="#" className="forgot-password">
            Forgot <span>Password?</span>
          </a>
          <p>
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
