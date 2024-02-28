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

export default function ColorInversionFooter() {
  const color = "neutral";
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
        p: 2,
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
                <ListItemButton>Search Aime</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Random Anime</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Top Anime</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Estimated Schedule</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: "50%", md: 140 } }}>
            <ListSubheader sx={{ fontWeight: "xl" }}>Contact Me:</ListSubheader>
            <List sx={{ "--ListItemDecorator-size": "32px" }}>
              <ListItem>
                <ListItemButton>Instagram</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Mail</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>GitHub</ListItemButton>
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
