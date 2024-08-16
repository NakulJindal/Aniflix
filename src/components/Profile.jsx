import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginAtom, userAtom } from "../recoil/atoms";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/joy/";
import Edit from "./Edit";

export default function Profile() {
  const [user, setUser] = useRecoilState(userAtom);
  const setLogin = useSetRecoilState(loginAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const fectchData = async () => {
      const res = await axios.get("http://localhost:3000/api/v1/user/", {
        withCredentials: true,
      });

      if (res.data) setUser(res.data);
    };
    fectchData();
  }, []);

  const handleWatchlist = () => {
    navigate("/watchlist");
  };

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3000/api/v1/user/signout",
      {},
      { withCredentials: true }
    );
    setLogin(false);
    navigate("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "50%",
          height: "auto",
          position: "relative",
          overflow: { xs: "auto", sm: "initial" },
        }}
      >
        <Card
          orientation="horizontal"
          sx={{
            width: "100%",
            flexWrap: "wrap",
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
            <img src={user.avatar} loading="lazy" alt="User Avatar" />
          </AspectRatio>
          <CardContent>
            <Typography fontSize="xl" fontWeight="lg">
              {user.username}
            </Typography>
            <Typography
              level="body-sm"
              fontWeight="lg"
              textColor="text.tertiary"
            >
              {user.firstName + " " + user.lastName}
            </Typography>
            <br />
            <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
              <Button
                onClick={handleWatchlist}
                variant="outlined"
                color="neutral"
              >
                Watchlist
              </Button>
              <Button onClick={handleLogout} variant="solid" color="primary">
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Edit userData={user} />
    </div>
  );
}
