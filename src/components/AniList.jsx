import axios from "axios";
import { Typography } from "@mui/joy";
import { useRecoilValue } from "recoil";
import GradientCover from "./GradientCard";
import { useState, useEffect } from "react";
import { aniIdAtom, clickCountAtom, dayAtom, queryAtom } from "../recoil/atoms";

export function AniList({ listType }) {
  const [data, setData] = useState([]);
  const id = useRecoilValue(aniIdAtom);
  const query = useRecoilValue(queryAtom);
  const clickCount = useRecoilValue(clickCountAtom);
  const day = useRecoilValue(dayAtom);

  useEffect(() => {
    let URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/recommend/${id}`;

    switch (listType) {
      case "top":
        URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/top`;
        break;
      case "search":
        URL = `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/anime/search?q=${query}`;
        break;
      case "schedule":
        URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/schedule/${day}`;
        break;
      case "upcoming":
        URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/upcoming`;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(URL);
        if (res.data) {
          const reversedData =
            listType === "schedule" ? res.data.reverse() : res.data;
          setData(reversedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, query, day, listType, clickCount]);

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
        <div style={{ display: "inline-block", minWidth: "100%" }}>
          {data &&
            data.length > 0 &&
            data.map((e, index) => (
              <div
                key={index}
                style={{ display: "inline-block", margin: "0 5px" }}
              >
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
