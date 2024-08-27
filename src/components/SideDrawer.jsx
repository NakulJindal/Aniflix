import { useState } from "react";
import List from "@mui/joy/List";
import Drawer from "@mui/joy/Drawer";
import { useSetRecoilState } from "recoil";
import IconButton from "@mui/joy/IconButton";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/joy/ListItemButton";
import { cardTypeAtom, clickCountAtom } from "../recoil/atoms";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";

export default function DrawerMobileNavigation({ topAnimeRef, scheduleRef }) {
  const [open, setOpen] = useState(false);
  const setClickCount = useSetRecoilState(clickCountAtom);
  const setCardType = useSetRecoilState(cardTypeAtom);
  const navigate = useNavigate();

  const scrollToComponent = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <IconButton
        size="md"
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <ViewSidebarRoundedIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
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
              setOpen(false);
              navigate("/");
            }}
          >
            Home
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpen(false);
              scrollToComponent(topAnimeRef);
            }}
          >
            Top Anime
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpen(false);
              setCardType("random");
              setClickCount((count) => count + 1);
              navigate("/anime");
            }}
          >
            Random
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpen(false);
              scrollToComponent(scheduleRef);
            }}
          >
            Schedule
          </ListItemButton>
          <ListItemButton>About</ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
