import "./Nav.css";
import axios from "axios";
import logo from "/logo-bg.png";
import { SearchBar } from "./Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawerMobileNavigation from "./SideDrawer";
import MoreVert from "@mui/icons-material/MoreVert";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cardTypeAtom, clickCountAtom, loginAtom } from "../recoil/atoms";
import {
  Button,
  IconButton,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";

export default function Nav({ topAnimeRef, scheduleRef }) {
  const [show, setShow] = useState(false);
  const setClickCount = useSetRecoilState(clickCountAtom);
  const setCardType = useSetRecoilState(cardTypeAtom);
  const navigate = useNavigate();

  const handleScroll = () => {
    setShow(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRandomClick = () => {
    setCardType("random");
    setClickCount((count) => count + 1);
    navigate("/anime");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_container">
        <div className="nav_logo_container">
          <img
            className="nav_logo"
            src={logo}
            alt="AniProto Logo"
            onClick={handleLogoClick}
          />
        </div>
        <div className="nav_search">
          <SearchBar />
        </div>
        <div className="nav_buttons">
          <Button
            variant="outlined"
            size="md"
            color="neutral"
            onClick={handleRandomClick}
          >
            Random
          </Button>
          <IconButtonMenu />
          <DrawerMobileNavigation
            topAnimeRef={topAnimeRef}
            scheduleRef={scheduleRef}
          />
        </div>
      </div>
    </div>
  );
}

export function IconButtonMenu() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useRecoilState(loginAtom);

  const signup = () => navigate("/signup");
  const login = () => navigate("/login");
  const profile = () => navigate("/profile");
  const watchlist = () => navigate("/watchlist");
  const logout = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/signout`, {
      withCredentials: true,
    });
    setLogin(false);
    navigate("/");
  };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu>
        {!isLogin && <MenuItem onClick={signup}>SignUp</MenuItem>}
        {!isLogin && <MenuItem onClick={login}>LogIn</MenuItem>}
        {isLogin && <MenuItem onClick={profile}>My Profile</MenuItem>}
        {isLogin && <MenuItem onClick={watchlist}>Watchlist</MenuItem>}
        {isLogin && <MenuItem onClick={logout}>LogOut</MenuItem>}
      </Menu>
    </Dropdown>
  );
}
