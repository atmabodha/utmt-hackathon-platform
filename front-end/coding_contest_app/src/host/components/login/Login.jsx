import React, { useState, useEffect, useContext } from "react";
import { TextInputField } from "../../../utilities/FormComponents";
import AuthContext from "../../../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import { useFormHandler } from "../contest creation/FormHandlers";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const { formData: loginData, handleInputChange } = useFormHandler({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(loginData.email, loginData.password);
      if (user){
        navigate('/host');
      }else {
        Swal.fire(
          data.status,
          data.message,
        );
      }
      console.log("login user data", user)
    } catch (e) {
      console.log(e);
    }
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
          <Link to="" className="forgot-password">
            Forgot <span>Password?</span>
          </Link>
          <p>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
