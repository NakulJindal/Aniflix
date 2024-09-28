import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/joy";
import { aniIdAtom, cardTypeAtom, trailerAtom } from "../recoil/atoms";
import "./Watchlist.css";

export default function Watchlist() {
  const [data, setData] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [reRender, setreRender] = useState(false);
  const setAniId = useSetRecoilState(aniIdAtom);
  const setCardType = useSetRecoilState(cardTypeAtom);
  const setTrailer = useSetRecoilState(trailerAtom);
  const navigate = useNavigate();

  const handleSelect = async (data) => {
    setAniId(data.mal_id);
    setCardType("watchlist");
    setTrailer(data.trailer.youtube_id);
    navigate("/watch");
  };

  const handleClick = async (mal_id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist/remove`,
        { mal_id },
        { withCredentials: true }
      );
      setreRender((check) => !check);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        setData(res.data.watchList);
      }
    };
    fetchData();
  }, [reRender]);

  useEffect(() => {
    if (data.length > 0) setVisible(true);
  }, [data]);

  return (
    <div>
      <Typography level="h3">Watchlist Animes:</Typography>
      <br />
      <div>
        <div style={{ minWidth: "100%" }}>
          <div className={`watchlist-container ${isVisible ? "visible" : ""}`}>
            {data &&
              data.length > 0 &&
              data.map((e, index) => (
                <div key={index} className="watchlist-item">
                  <div style={{ width: "5%" }} onClick={() => handleSelect(e)}>
                    <img
                      src={e.images?.jpg?.image_url}
                      alt={`${e.title_english}.jpeg`}
                      width="100%"
                      height="auto"
                    />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      alignItems: "center",
                      width: "90%",
                      marginLeft: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3
                        style={{ margin: "0%" }}
                        onClick={() => handleSelect(e)}
                      >
                        {e.title_english}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Button onClick={() => handleClick(e.mal_id)} size="sm">
                          Remove from Watchlist
                        </Button>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={() => handleSelect(e)}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div style={{ marginRight: "10px" }}>{e.type}</div>
                        <div>{`Episodes: ${
                          e.episodes ? e.episodes : "NA"
                        }`}</div>
                      </div>
                      {e.airing ? (
                        <div>{`Airing Time: ${e.broadcast.string}`}</div>
                      ) : (
                        <div>{e.episodes ? "Aired" : "Comimg Soon!"}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
