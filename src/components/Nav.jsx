import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { SearchBar } from "./Search";
import {
  Button,
  IconButton,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import MoreVert from "@mui/icons-material/MoreVert";
import DrawerMobileNavigation from "./SideDrawer";
import { cardTypeAtom, clickCountAtom } from "../recoil/atoms";
import logo from "/logo-bg.png";
import "./Nav.css";
import axios from "axios";

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

  const signup = () => navigate("/signup");
  const login = () => navigate("/login");
  const logout = async () => {
    await axios.post(
      "http://localhost:3000/api/v1/user/signout",
      {},
      { withCredentials: true }
    );
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
        <MenuItem>My Profile</MenuItem>
        <MenuItem>Watchlist</MenuItem>
        <MenuItem onClick={signup}>SignUp</MenuItem>
        <MenuItem onClick={login}>LogIn</MenuItem>
        <MenuItem onClick={logout}>LogOut</MenuItem>
      </Menu>
    </Dropdown>
  );
}
