import { Link } from "react-router-dom";
import Banner from "./Banner";
import { AniList } from "./AniList";
import Schedule from "./Schedule";

export default function Landing() {
  return (
    <>
      <Banner />
      <h1>Top Anime:</h1>
      <AniList listType="top" />
      <Schedule />
    </>
  );
}
