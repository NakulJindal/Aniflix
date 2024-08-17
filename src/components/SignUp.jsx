import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "../recoil/atoms";
import { Button, Card, FormControl, FormLabel, Input, Stack } from "@mui/joy";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const setLogin = useSetRecoilState(loginAtom);
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
      !formData.username ||
      !formData.password
    )
      return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/user/signup`,
        formData,
        { withCredentials: true }
      );

      setLogin(true);
      navigate("/");
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
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card
        color="neutral"
        orientation="vertical"
        size="sm"
        sx={{ width: 500 }}
      >
        <h2>Signup</h2>
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
              <FormLabel>Username:</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your Username"
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
            <Button type="submit">Sign Up</Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
}
