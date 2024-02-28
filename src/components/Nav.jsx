import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { SearchBar } from "./Search";
import {
  Avatar,
  Button,
  Dropdown,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import DrawerMobileNavigation from "./SideDrawer";
import { cardTypeAtom, clickCountAtom } from "../recoil/atoms";
import logo from "/logo-bg.png";

export default function Nav() {
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
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <div>
          <img
            style={{ width: "200px" }}
            className="nav_logo"
            src={logo}
            alt="AniProto Logo"
            onClick={handleLogoClick}
          />
        </div>
        <SearchBar />
        <div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Button variant="outlined" size="lg" onClick={handleRandomClick}>
              Random
            </Button>
            <BasicMenu />
            <DrawerMobileNavigation />
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

export function BasicMenu() {
  return (
    <Dropdown>
      <MenuButton size="md">
        <Avatar color="primary" size="sm" variant="soft" />
      </MenuButton>
      <Menu>
        <MenuItem>My Profile</MenuItem>
        <MenuItem>Watchlist</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}
