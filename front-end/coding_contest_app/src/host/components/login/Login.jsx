import React, { useState } from "react";
import { TextInputField } from "../../../utilities/FormComponents";
import { useUser } from "../../../context/user";
import { useNavigate, Link } from "react-router-dom";
import { useFormHandler } from "../contest creation/FormHandlers";
import LoadingOverlay from "react-loading-overlay-ts";
import PulseLoader from "react-spinners/PulseLoader";
import "./Login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { current: user, login } = useUser();
  const { formData: loginData, handleInputChange } = useFormHandler({
    email: "",
    password: "",
  });

  console.log("login page", user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredentials = await login(loginData.email, loginData.password);
      console.log("user login page usercredentials", userCredentials);
      if (userCredentials) {
        navigate("/host");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div>
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
      </LoadingOverlay>
    </div>
  );
};

export default Login;
