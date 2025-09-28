import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DealerLogin = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate login success
    alert("Logged in!");
    navigate("/dealer-dashboard"); // redirect to dashboard
  };

  return (
    <>
      <style>{`
        body, html, #root {
          height: 100%;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(180deg, #e6f0ff 0%, #c8d7ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-container {
          background: white;
          border-radius: 20px;
          padding: 40px 32px 32px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          width: 360px;
          text-align: center;
        }
        .logo-wrapper {
          background: linear-gradient(135deg, #4f46e5, #9333ea);
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 4px 12px rgba(147, 51, 234, 0.6);
        }
        .logo-icon {
          width: 32px;
          height: 32px;
          filter: drop-shadow(0 0 2px rgba(255,255,255,0.6));
        }
        h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 4px;
        }
        .subtitle {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 32px;
        }
        form label {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
          color: #374151;
          margin-bottom: 8px;
          text-align: left;
        }
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          font-size: 1rem;
          color: #374151;
          box-sizing: border-box;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          margin-bottom: 20px;
        }
        .input-field::placeholder {
          color: #9ca3af;
        }
        .input-field:focus {
          border-color: #4f46e5;
          outline: none;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
        }
        .forgot-password {
          display: block;
          font-size: 0.875rem;
          color: #4f46e5;
          text-align: right;
          margin-top: -16px;
          margin-bottom: 24px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          font-weight: 600;
          text-decoration: none;
        }
        .forgot-password:hover {
          text-decoration: underline;
        }
        .submit-btn {
          width: 100%;
          background: linear-gradient(90deg, #4f46e5, #9333ea);
          color: white;
          padding: 14px 0;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.5);
          transition: background 0.3s ease;
        }
        .submit-btn:hover {
          background: linear-gradient(90deg, #4338ca, #7e22ce);
        }
        .footer-text {
          margin-top: 24px;
          font-size: 0.9rem;
          color: #374151;
        }
        .create-account-btn {
          background: none;
          border: none;
          color: #4f46e5;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          margin-left: 6px;
          text-decoration: none;
        }
        .create-account-btn:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-container" role="main" aria-label="Dealer login form">
        <div className="logo-wrapper" aria-hidden="true">
          <svg
            className="logo-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M5 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm13-10.5c0-.83-.67-1.5-1.5-1.5H15l.12-.51a.75.75 0 1 0-1.43-.34L12.58 11H9a3 3 0 0 0-3 3v2.03A3.001 3.001 0 0 0 8 19v-2.5a1 1 0 0 1 1-1h3.16l2-6H16.5a1.5 1.5 0 0 1 1.5 1.5v3h-1.5v-3zM19 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
        </div>
        <h1>RideX</h1>
        <div className="subtitle">Dealer Login</div>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="usernameOrEmail">Username or Email</label>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            placeholder="Enter your username or email"
            className="input-field"
          />
          {errors.usernameOrEmail && (
            <div style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: "16px", textAlign: "left" }}>
              {errors.usernameOrEmail}
            </div>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="input-field"
          />
          {errors.password && (
            <div style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: "16px", textAlign: "left" }}>
              {errors.password}
            </div>
          )}

          <button
            type="button"
            className="forgot-password"
            onClick={() => alert("Password recovery flow")}
          >
            Forgot Password?
          </button>

          <button type="submit" className="submit-btn">
            Login to Dashboard
          </button>
        </form>

        <div className="footer-text">
          New to RideX?
          <button
            className="create-account-btn"
            onClick={() => navigate("/DRegistration")}
            type="button"
          >
            Create an Account
          </button>
        </div>
      </div>
    </>
  );
};

export default DealerLogin;
