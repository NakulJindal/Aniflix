import {
  Box,
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  Typography,
  Sheet,
} from "@mui/joy";
import {
  cardTypeAtom,
  clickCountAtom,
  showSearchResultsAtom,
} from "../recoil/atoms";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function ColorInversionFooter({ topAnimeRef, scheduleRef }) {
  const color = "neutral";

  const setCardType = useSetRecoilState(cardTypeAtom);
  const setClickCount = useSetRecoilState(clickCountAtom);
  const [show, setShow] = useRecoilState(showSearchResultsAtom);
  const navigate = useNavigate();

  const searchClickHandler = () => {
    if (!show) setShow(true);
    navigate("/search");
  };

  const randomClickHandler = () => {
    setCardType("random");
    setClickCount((count) => count + 1);
    navigate("/anime");
  };

  const scrollToComponent = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        ...(color !== "neutral" && {
          bgcolor: `${color}`,
        }),
        flexGrow: 1,
        p: 1.5,
        borderRadius: { xs: 0, sm: "sm" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "flex-start" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <List
          size="md"
          orientation="horizontal"
          wrap
          sx={{
            flexGrow: 0,
            "--ListItem-radius": "8px",
            "--ListItem-gap": "0px",
          }}
        >
          <ListItem nested sx={{ width: { xs: "40%", md: 250 } }}>
            <ListSubheader sx={{ fontWeight: "xl" }}>Sitemap:</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton onClick={searchClickHandler}>
                  Search Anime
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={randomClickHandler}>
                  Random Anime
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => scrollToComponent(topAnimeRef)}>
                  Top Anime
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => scrollToComponent(scheduleRef)}>
                  Estimated Schedule
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: "50%", md: 140 } }}>
            <ListSubheader sx={{ fontWeight: "xl" }}>Contact Me:</ListSubheader>
            <List sx={{ "--ListItemDecorator-size": "32px" }}>
              <ListItem>
                <ListItemButton>
                  <a
                    href="https://www.instagram.com/jindal0_0/"
                    target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Instagram
                  </a>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <a
                    href="https://www.linkedin.com/in/jindalnakul/"
                    target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    LinkedIn
                  </a>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <a
                    href="https://github.com/NakulJindal"
                    target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    GitHub
                  </a>
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
      <Divider sx={{ my: 2 }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography>Made For You By ~NJ</Typography>
      </div>
    </Sheet>
  );
}
