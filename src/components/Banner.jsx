import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { aniIdAtom, trailerAtom } from "../recoil/atoms";
import { Button, ButtonGroup, Typography } from "@mui/joy";
import urls from "../utils/apiEndpoints";
import { apiCall } from "../utils/utils";

export default function Banner() {
  const [recentAnimes, setRecentAnimes] = useState([]);
  const [aniData, setAniData] = useState({});
  const [index, setIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const setAniId = useSetRecoilState(aniIdAtom);
  const setTrailer = useSetRecoilState(trailerAtom);
  const navigate = useNavigate();

  const truncate = useMemo(
    () => (str, n) => str.length > n ? str.substr(0, n - 1) + "..." : str,
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiCall(urls.getSeasonNow);
      if (data) {
        setRecentAnimes(data);
        setLastIndex(data.length - 1);
        setAniData(data[index]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === lastIndex ? 0 : prevIndex + 1));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lastIndex]); // Add lastIndex as a dependency

  useEffect(() => {
    setAniData(recentAnimes[index]);
  }, [index, recentAnimes]);

  const handleInfoClick = () => {
    setAniId(aniData.mal_id);
    navigate("/anime");
  };

  const handlePlay = () => {
    setAniId(aniData.mal_id);
    setTrailer(aniData.trailer.youtube_id);
    // setTrailer(aniData.trailer.embed_url);
    navigate("/watch");
  };

  const handleNextClick = () => {
    setIndex((prevIndex) => (prevIndex === lastIndex ? 0 : prevIndex + 1));
  };

  const handlePrevClick = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? lastIndex : prevIndex - 1));
  };

  return (
    <div
      className="banner"
      style={{
        height: "320px",
      }}
    >
      {aniData && Object.keys(aniData).length !== 0 && (
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
            <Typography level="h1">{aniData.title_english}</Typography>
            <br />
            <Typography level="body-md" sx={{ width: "360px" }}>
              {aniData?.synopsis ? truncate(aniData?.synopsis, 150) : ""}
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
              src={aniData?.images?.jpg?.large_image_url || ""}
              alt="anime_poster"
            />
          </div>
        </div>
      )}
    </div>
  );
}
