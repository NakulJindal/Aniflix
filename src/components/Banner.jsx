import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { aniIdAtom, trailerAtom } from "../recoil/atoms";
import { Button, ButtonGroup, Typography } from "@mui/joy";

export default function Banner() {
  const [recentAnimes, setRecentAnimes] = useState([]);
  const [index, setIndex] = useState(0);
  const setAniId = useSetRecoilState(aniIdAtom);
  const setTrailer = useSetRecoilState(trailerAtom);
  const navigate = useNavigate();

  const truncate = useMemo(
    () => (str, n) => str.length > n ? str.substr(0, n - 1) + "..." : str,
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/season`
      );
      if (res.data) setRecentAnimes(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === recentAnimes.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [index]);

  const handleInfoClick = () => {
    setAniId(recentAnimes[index].mal_id);
    navigate("/anime");
  };

  const handlePlay = () => {
    setAniId(recentAnimes[index].mal_id);
    setTrailer(recentAnimes[index].trailer.youtube_id);
    navigate("/watch");
  };

  const handleNextClick = () => {
    setIndex((prevIndex) =>
      prevIndex === recentAnimes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevClick = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? recentAnimes.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="banner"
      style={{
        height: "320px",
      }}
    >
      {recentAnimes[index] && Object.keys(recentAnimes[index]).length !== 0 && (
        <div
          className="banner_contents"
          style={{
            height: "320px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto 75px",
          }}
        >
          <div>
            <Typography level="h1">
              {recentAnimes[index].title_english}
            </Typography>
            <br />
            <Typography level="body-md" sx={{ width: "360px" }}>
              {recentAnimes[index]?.synopsis
                ? truncate(recentAnimes[index]?.synopsis, 150)
                : ""}
            </Typography>
            <br />
            <ButtonGroup
              variant="soft"
              aria-label="button group"
              sx={{
                "--ButtonGroup-separatorColor": `hsl(0 0% 50%) !important`,
              }}
            >
              <Button
                variant="solid"
                sx={{ width: "110px" }}
                onClick={handlePrevClick}
              >
                Previous
              </Button>
              <Button
                onClick={handlePlay}
                sx={{ width: "110px" }}
                className="banner_button_play"
              >
                Play
              </Button>
              <Button
                sx={{ width: "110px" }}
                className="banner_button_info"
                onClick={handleInfoClick}
              >
                More Info
              </Button>
              <Button
                variant="solid"
                sx={{ width: "110px" }}
                onClick={handleNextClick}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <img
              style={{ height: "320px" }}
              src={recentAnimes[index]?.images?.jpg?.large_image_url || ""}
              alt="anime_poster"
            />
          </div>
        </div>
      )}
    </div>
  );
}
