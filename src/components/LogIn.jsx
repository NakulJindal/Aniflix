import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "../recoil/atoms";
import { Button, Card, FormControl, FormLabel, Input, Stack } from "@mui/joy";

export default function LogIn() {
  const [formData, setFormData] = useState({
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

    if (!formData.username || !formData.password) return;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        formData,
        { withCredentials: true }
      );
      setLogin(true);
      navigate("/");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }

    setFormData({
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
        <h2>LogIn</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <FormControl>
              <FormLabel>Username:</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                color="neutral"
                size="lg"
                variant="soft"
                required
              />
            </FormControl>
            <Button type="submit">Log In</Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
}
