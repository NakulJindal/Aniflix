import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import Menu from "@mui/joy/Menu";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import { cardTypeAtom, clickCountAtom } from "../recoil/atoms";

export default function DrawerMobileNavigation() {
  const [open, setOpen] = useState(false);
  const setClickCount = useSetRecoilState(clickCountAtom);
  const setCardType = useSetRecoilState(cardTypeAtom);
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        size="lg"
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <ViewSidebarRoundedIcon />
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
          }}
        >
          <Typography
            component="label"
            htmlFor="close-icon"
            fontSize="sm"
            fontWeight="lg"
            sx={{ cursor: "pointer" }}
          >
            Close
          </Typography>
          <ModalClose id="close-icon" sx={{ position: "initial" }} />
        </Box>
        <List
          size="lg"
          component="nav"
          sx={{
            flex: "space-around",
            fontSize: "xl",
            "& > div": { justifyContent: "center" },
          }}
        >
          <ListItemButton
            sx={{ fontWeight: "lg" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            Top Anime
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setCardType("random");
              setClickCount((count) => count + 1);
              navigate("/anime");
            }}
          >
            Random
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/?scroll=true");
            }}
          >
            Schedule
            {/* <Link to="/?scroll=true">Schedule</Link> */}
          </ListItemButton>
          <ListItemButton>About</ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
