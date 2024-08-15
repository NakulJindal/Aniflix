import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        formData,
        { withCredentials: true }
      );

      navigate("/");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }

    setFormData({
      username: "",
      password: "",
    });
    setError("");
  };

  return (
    <div className="login-container">
      <h2>LogIn</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
