import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, FormControl, FormLabel, Input, Stack } from "@mui/joy";

export default function Edit({ userData }) {
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password,
    avatar: userData.avatar,
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

    if (
      !formData.lastName ||
      !formData.firstName ||
      !formData.avatar ||
      !formData.password
    )
      return;

    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/user/edit",
        formData,
        { withCredentials: true }
      );

      navigate("/profile");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }

    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginLeft: "20px",
      }}
    >
      <Card
        color="neutral"
        orientation="vertical"
        size="sm"
        sx={{
          width: "100%",
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingBottom: "15px",
        }}
      >
        <h2 style={{ marginTop: "0px" }}>Edit</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <FormControl>
              <FormLabel>First Name:</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your First Name"
                color="neutral"
                size="lg"
                variant="soft"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name:</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your Last Name"
                color="neutral"
                size="lg"
                variant="soft"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Avatar URL:</FormLabel>
              <Input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Enter link to your Avatar"
                color="neutral"
                size="lg"
                variant="soft"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                color="neutral"
                size="lg"
                variant="soft"
                required
              />
            </FormControl>
            <br />
            <Button type="submit">Update</Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
}
