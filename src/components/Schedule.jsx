import { AniList } from "./AniList";
import { dayAtom } from "../recoil/atoms";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { ButtonGroup, Button, Grid } from "@mui/joy";

export default function Schedule() {
  const scheduleRef = useRef(null);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const shouldScroll = query.get("scroll");
  const [day, setDay] = useRecoilState(dayAtom);
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const date = new Date();
  const today = date.getDay();

  useEffect(() => {
    setDay(days[today]);
  }, []);

  useEffect(() => {
    if (shouldScroll) {
      scheduleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [shouldScroll]);

  return (
    <div ref={scheduleRef}>
      <h1>Estimated Shedule:</h1>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <ButtonGroup
          orientation="horizontal"
          aria-label="horizontal plain button group"
          variant="plain"
        >
          <Button
            key={0}
            onClick={() => setDay(days[0])}
            variant={day == days[0] ? "soft" : "plain"}
            sx={
              day == days[0] ? { fontWeight: "bold" } : { fontWeight: "normal" }
            }
          >
            Sunday
          </Button>
          <Button
            key={1}
            onClick={() => setDay(days[1])}
            variant={day == days[1] ? "soft" : "plain"}
            sx={
              day == days[1] ? { fontWeight: "bold" } : { fontWeight: "normal" }
            }
          >
            Monday
          </Button>
          <Button
            key={2}
            onClick={() => setDay(days[2])}
            variant={day == days[2] ? "soft" : "plain"}
            sx={
              day == days[2] ? { fontWeight: "bold" } : { fontWeight: "normal" }
            }
          >
            Tuesday
          </Button>
          <Button
            key={3}
            onClick={() => setDay(days[3])}
            variant={day == days[3] ? "soft" : "plain"}
            sx={
              day == days[3] ? { fontWeight: "bold" } : { fontWeight: "normal" }
            }
          >
            Wednesday
          </Button>
          <Button
            key={4}
            onClick={() => setDay(days[4])}
            variant={day == days[4] ? "soft" : "plain"}
            sx={
              day == days[4] ? { fontWeight: "bold" } : { fontWeight: "normal" }
            }
          >
            Thursday
          </Button>
          <Button
            key={5}
            onClick={() => setDay(days[5])}
            variant={day == days[5] ? "soft" : "plain"}
            sx={
              day == days[5] ? { fontWeight: "bold" } : { fontWeight: "normal" }
            }
          >
            Friday
          </Button>
          <Button
            key={6}
            onClick={() => setDay(days[6])}
            variant={day == days[6] ? "soft" : "plain"}
            sx={
              day == days[6] ? { fontWeight: "bold" } : { fontWeight: "normal" }
            }
          >
            Saturday
          </Button>
        </ButtonGroup>
      </Grid>
      <div>
        <AniList listType="schedule" />
      </div>
    </div>
  );
}
