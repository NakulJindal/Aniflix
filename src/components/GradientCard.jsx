import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Card, CardCover, CardContent, Grid, Typography } from "@mui/joy";
import {
  aniIdAtom,
  cardTypeAtom,
  clickCountAtom,
  trailerAtom,
} from "../recoil/atoms";

export default function GradientCover({ entry, listType }) {
  const { title_english, title, mal_id, images, trailer } = entry;
  const aniTitle = title_english || title;
  const id = mal_id;
  const image = images.jpg.image_url;
  const vidId = trailer?.youtube_id || mal_id;

  const setAniId = useSetRecoilState(aniIdAtom);
  const setCardType = useSetRecoilState(cardTypeAtom);
  const setClickCount = useSetRecoilState(clickCountAtom);
  const setTrailer = useSetRecoilState(trailerAtom);
  const navigate = useNavigate();

  const handleClick = () => {
    setAniId(id);
    setCardType("picked");
    setClickCount((count) => count + 1);
    setTrailer(vidId);
    if (listType === "recommended") navigate("/anime");
    else navigate("/watch");
  };

  const truncate = useMemo(
    () => (str, n) => str.length > n ? str.substr(0, n - 1) + "..." : str,
    []
  );

  return (
    <Card onClick={handleClick} sx={{ minHeight: 280, width: 200 }}>
      <CardCover>
        <img src={image} loading="lazy" alt="" />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography level="title-md" textColor="#fff">
          {truncate(aniTitle, 20)}
        </Typography>
        {/* <Typography level="body-sm" textColor="neutral.300">
             add type-> TV,MOVIE,ONA,OVA
          </Typography> */}
      </CardContent>
    </Card>
  );
}
