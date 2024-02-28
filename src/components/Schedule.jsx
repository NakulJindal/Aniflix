import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AniList } from "./AniList";
import { dayAtom } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";
import { ButtonGroup, Button, Grid } from "@mui/joy";

export default function Schedule() {
  const scheduleRef = useRef(null);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const shouldScroll = query.get("scroll");
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
  const setDay = useSetRecoilState(dayAtom);

  useEffect(() => {
    setDay(days[today]);
  });

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
          <Button key={0} onClick={() => setDay(days[0])}>
            Sunday
          </Button>
          <Button key={1} onClick={() => setDay(days[1])}>
            Monday
          </Button>
          <Button key={2} onClick={() => setDay(days[2])}>
            Tuesday
          </Button>
          <Button key={3} onClick={() => setDay(days[3])}>
            Wednesday
          </Button>
          <Button key={4} onClick={() => setDay(days[4])}>
            Thursday
          </Button>
          <Button key={5} onClick={() => setDay(days[5])}>
            Friday
          </Button>
          <Button key={6} onClick={() => setDay(days[6])}>
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
