import React, { useState } from "react";
import "../css/Register.css"; // Include CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const isFormValid = firstName && lastName && email && password;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    setErrorMessage("");

    try {
      const response = await axiosInstance.post("/users/register", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setErrorMessage(
          "Registration was blocked by the server. Check backend security settings for /users/register."
        );
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="heading"> 
        <img src="/bank_logo.png" alt="Logo" className="logo-image" style={{width:"50px"}} />
        <span>National Bank</span>
      </div>
      <div className="register-box">
        <div className="top-right">English (UK)</div>
        <div className="title">Sign Up</div>
        <form onSubmit={handleRegister} className="register-form">
          <div className="name">
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>&nbsp;&nbsp;</div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            type="submit"
            disabled={!isFormValid}
            className="create-account-button"
          >
            Create Account
          </button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Signin</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
