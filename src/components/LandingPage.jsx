import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="heading">
        <img
          src="/bank_logo.png"
          alt="Logo"
          className="logo-image"
          style={{ width: "50px" }}
        />
        <span>National Bank</span>
      </div>

      <div className="landing-box">
        <div className="top-right">English (UK)</div>
        <h1 className="landing-title">Welcome to National Bank</h1>
        <p className="landing-subtitle">
          Manage your finances, track expenses, and plan for the future.
        </p>

        <div className="landing-actions">
          <button
            type="button"
            className="landing-button login-action"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          <button
            type="button"
            className="landing-button register-action"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
