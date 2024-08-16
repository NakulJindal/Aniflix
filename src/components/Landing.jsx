import Banner from "./Banner";
import { AniList } from "./AniList";
import Schedule from "./Schedule";

export default function Landing({ topAnimeRef, scheduleRef }) {
  return (
    <>
      <Banner />
      <div ref={topAnimeRef}>
        <h1>Top Anime:</h1>
        <AniList listType="top" />
      </div>
      <div>
        <h1>Upcoming Anime:</h1>
        <AniList listType="upcoming" />
      </div>
      <div ref={scheduleRef}>
        <Schedule />
      </div>
    </>
  );
}
