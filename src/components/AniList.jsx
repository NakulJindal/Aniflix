import axios from "axios";
import { Typography } from "@mui/joy";
import { useRecoilValue } from "recoil";
import GradientCover from "./GradientCard";
import { useState, useEffect } from "react";
import { aniIdAtom, dayAtom } from "../recoil/atoms";
import "./Anilist.css";

export function AniList({ listType }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isVisible, setVisible] = useState(false);
  const id = useRecoilValue(aniIdAtom);
  const day = useRecoilValue(dayAtom);

  let URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/recommend/${id}`;

  switch (listType) {
    case "top":
      URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/top`;
      break;
    case "upcoming":
      URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/upcoming`;
      break;
    case "schedule":
      URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/schedule/${day}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isVisible) setVisible(false);
        const res = await axios.get(URL);
        if (res.data) {
          const reversedData =
            listType === "schedule" ? res.data.reverse() : res.data;
          setData(reversedData);
          setTimeout(() => {
            if (reversedData.length > 0) setVisible(true);
          }, 50);
        } else throw new Error();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setLoading(false);
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isVisible) setVisible(false);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/schedule/${day}`
        );
        if (res.data) {
          const reversedData = res.data.reverse();
          setData(reversedData);
          setTimeout(() => {
            if (reversedData.length > 0) setVisible(true);
          }, 550);
        } else throw new Error();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (listType === "schedule") fetchData();
    setLoading(false);
  }, [day]);

  if (isLoading || data.length == 0) return <div>Loading...</div>;

  return (
    <div>
      <div>
        {listType === "recommended" && data.length > 0 && (
          <Typography level="h3">Recommended Anime:</Typography>
        )}
      </div>
      <br />
      <div
        className="scrollable-container"
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "thin",
        }}
      >
        <div className={`list-container ${isVisible ? "visible" : ""}`}>
          {data.length > 0 &&
            data.map((e, index) => (
              <div key={index} className="list-item">
                <GradientCover
                  entry={listType === "recommended" ? e.entry : e}
                  listType={listType}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
