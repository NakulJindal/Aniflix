import { useState, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Typography } from "@mui/joy";
import GradientCover from "./GradientCard";
import urls from "../utils/apiEndpoints";
import { apiCall } from "../utils/utils";
import { aniIdAtom, clickCountAtom, dayAtom, queryAtom } from "../recoil/atoms";

export function AniList({ listType }) {
  const [data, setData] = useState([]);
  const id = useRecoilValue(aniIdAtom);
  const query = useRecoilValue(queryAtom);
  const clickCount = useRecoilValue(clickCountAtom);
  const day = useRecoilValue(dayAtom);

  useEffect(() => {
    const fetchData = async () => {
      let URL = "";
      switch (listType) {
        case "top":
          URL = urls.getTopAnimeList;
          break;
        case "search":
          URL = query;
          break;
        case "schedule":
          URL = urls.getScheduleFor(day);
          break;
        default:
          URL = urls.getRecommendedAnimeList(id);
      }
      const res = await apiCall(URL);
      if (res) {
        const reversedData = listType === "schedule" ? res.reverse() : res;
        setData(reversedData);
        // if (res.length > 16) res = res.slice(0, 16);
        // else if (res.length < 16 && res.length > 8) res = res.slice(0, 8);
      }
    };
    fetchData();
  }, [id, query, day, clickCount, listType]);

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
