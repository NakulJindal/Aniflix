import axios from "axios";
import { Button } from "@mui/joy";
import { AniList } from "./AniList";
import { useEffect, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cardTypeAtom,
  aniIdAtom,
  clickCountAtom,
  loginAtom,
} from "../recoil/atoms";

export default function Anicard() {
  const [aniData, setAniData] = useState({});
  const [inList, setInList] = useState(false);
  const [aniId, setAniId] = useRecoilState(aniIdAtom);
  const cardType = useRecoilValue(cardTypeAtom);
  const isLogin = useRecoilValue(loginAtom);
  const clickCount = useRecoilValue(clickCountAtom);

  const URL = useMemo(() => {
    return cardType === "random"
      ? `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/random`
      : `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/anime/${aniId}`;
  }, [cardType, aniId]);

  const handleClick = async () => {
    const {
      airing,
      broadcast,
      episodes,
      mal_id,
      title,
      title_english,
      title_japanese,
      trailer,
      images,
      type,
      year,
    } = aniData;
    try {
      if (!inList) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist/add`,
          {
            airing,
            broadcast,
            episodes,
            mal_id,
            title,
            title_english,
            title_japanese,
            trailer,
            images,
            type,
            year,
          },
          { withCredentials: true }
        );
      } else {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist/remove`,
          { mal_id },
          { withCredentials: true }
        );
      }

      setInList((check) => !check);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(URL);
      if (res.data) {
        setAniData(res.data);
        setAniId(res.data.mal_id);
      }
    };

    fetchData();
  }, [clickCount, URL]);

  useEffect(() => {
    const listCheck = async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist/check`,
        { mal_id: aniData.mal_id },
        { withCredentials: true }
      );

      if (res.data) setInList(res.data.check);
    };
    listCheck();
  }, [aniData, inList]);

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
        <div style={{ width: "20%" }}>
          <img
            src={aniData.images?.jpg?.image_url}
            alt={`${aniData.title_english}.jpeg`}
            width="100%"
            height="auto"
            style={{ marginTop: "30px" }}
          />
        </div>

        <div style={{ width: "80%", marginLeft: "2%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ marginBottom: "8px" }}>{aniData.title_english}</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              {isLogin && (
                <Button onClick={handleClick} size="lg">
                  {inList ? "Remove from Watchlist" : "Add to Watchlist"}
                </Button>
              )}
            </div>
          </div>
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
