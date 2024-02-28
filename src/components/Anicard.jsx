import { useEffect, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AniList } from "./AniList";
import { cardTypeAtom, aniIdAtom, clickCountAtom } from "../recoil/atoms";
import urls from "../utils/apiEndpoints";
import { apiCall } from "../utils/utils";

export default function Anicard() {
  const [aniData, setAniData] = useState({});
  const [aniId, setAniId] = useRecoilState(aniIdAtom);
  const cardType = useRecoilValue(cardTypeAtom);
  const clickCount = useRecoilValue(clickCountAtom);

  const URL = useMemo(() => {
    return cardType === "random" ? urls.getRandomAnime : urls.getAnime(aniId);
  }, [cardType, aniId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiCall(URL);
      if (data) {
        setAniData(data);
        setAniId(data.mal_id);
      }
    };
    fetchData();
  }, [clickCount, URL, setAniId]);

  if (!aniData || Object.keys(aniData).length === 0) {
    // Render 404 not found component
    return null;
  }

  const genres = aniData.genres.map((genre) => genre.name).join(", ");
  const studios = aniData.studios.map((studio) => studio.name).join(", ");
  const producers = aniData.producers
    .map((producer) => producer.name)
    .join(", ");

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignContent: "baseline",
        }}
      >
        <div>
          <img
            src={aniData.images?.jpg?.image_url}
            alt={`${aniData.title_english}.jpeg`}
            width="210"
            height="280"
            style={{ marginTop: "30px" }}
          />
        </div>
        <div style={{ width: "1000px" }}>
          <h2 style={{ marginBottom: "8px" }}>{aniData.title_english}</h2>
          <i>{aniData.title_japanese}</i>
          <p>{aniData.synopsis}</p>
          <div style={{ display: "flex" }}>
            <table style={{ fontSize: "90%", width: "50%" }}>
              <tbody>
                <tr>
                  <td>Type:</td>
                  <td>{aniData.type}</td>
                </tr>
                <tr>
                  <td>Premiered:</td>
                  <td>{`${aniData.season}${aniData.year}`}</td>
                </tr>
                <tr>
                  <td>Date Aired:</td>
                  <td>{aniData.aired.string}</td>
                </tr>
                <tr>
                  <td>Broadcast:</td>
                  <td>{aniData.broadcast.string}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{aniData.status}</td>
                </tr>
                <tr>
                  <td>Genres:</td>
                  <td>{genres}</td>
                </tr>
              </tbody>
            </table>
            <table style={{ fontSize: "90%", width: "50%" }}>
              <tbody>
                <tr>
                  <td>MAL:</td>
                  <td>{`${aniData.score} by ${aniData.scored_by} reviews`}</td>
                </tr>
                <tr>
                  <td>Duration:</td>
                  <td>{aniData.duration}</td>
                </tr>
                <tr>
                  <td>Episodes:</td>
                  <td>{aniData.episodes}</td>
                </tr>
                <tr>
                  <td>Studios:</td>
                  <td>{studios}</td>
                </tr>
                <tr>
                  <td>Producers:</td>
                  <td>{producers}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <AniList listType="recommended" />
    </div>
  );
}
