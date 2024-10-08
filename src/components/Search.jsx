import "./SearchBar.css";
import axios from "axios";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import SearchTwoTone from "@mui/icons-material/SearchTwoTone";
import { Button, Input, Sheet, Stack, styled, Typography } from "@mui/joy";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  queryAtom,
  aniIdAtom,
  cardTypeAtom,
  trailerAtom,
} from "../recoil/atoms";
import "./Search.css";

export function SearchBar() {
  const setQuery = useSetRecoilState(queryAtom);
  const navigate = useNavigate();

  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce((searchQuery) => {
      setQuery(searchQuery);
      navigate("/search");
    }, 500),
    []
  );

  const handleChange = (event) => {
    const value = event.target.value;
    handleSearch(value);
  };

  return (
    <div className="search_bar">
      <Input
        id="searchInput"
        onChange={handleChange}
        startDecorator={<SearchTwoTone />}
        endDecorator={<Button onClick={handleSearch}>Search</Button>}
        sx={{
          "--Input-radius": "25px",
          "--Input-gap": "8px",
          "--Input-placeholderOpacity": 0.3,
          "--Input-minHeight": "39px",
          "--Input-focusedThickness": "1px",
        }}
      />
    </div>
  );
}

export function SearchResults() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const query = useRecoilValue(queryAtom);
  const setAniId = useSetRecoilState(aniIdAtom);
  const setTrailer = useSetRecoilState(trailerAtom);
  const setCardType = useSetRecoilState(cardTypeAtom);

  const allowedTypes = ["TV", "Movie", "Special", "TV Special", "ONA", "OVA"];

  const handleSelect = async (data) => {
    setAniId(data.mal_id);
    setCardType("search");
    setTrailer(data.trailer.youtube_id);
    navigate("/watch");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isVisible) setVisible(false);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/anime/search?q=${query}`
        );
        if (res.data) {
          const filteredData = res.data.filter((item) =>
            allowedTypes.includes(item.type)
          );
          setData(filteredData);
          setTimeout(() => {
            if (filteredData.length > 0) setVisible(true);
          }, 50);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) fetchData();
  }, [query]);

  return (
    <div>
      <Typography level="h3">Search Results:</Typography>
      <br />
      <div>
        <div style={{ minWidth: "100%" }}>
          <div className={`searchlist-container ${isVisible ? "visible" : ""}`}>
            {data &&
              data.length > 0 &&
              data.map((e, index) => (
                <div key={index} className="searchlist-item">
                  <div
                    style={{ width: "5%", alignItems: "center" }}
                    onClick={() => handleSelect(e)}
                  >
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
                      width: "90%",
                      marginLeft: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h3
                        style={{ margin: "0%" }}
                        onClick={() => handleSelect(e)}
                      >
                        {e.title_english ? e.title_english : e.title}
                      </h3>
                      {e.airing ? (
                        <div>{`Airing Time: ${e.broadcast.string}`}</div>
                      ) : (
                        <div>{e.episodes ? "Aired" : "Comimg Soon!"}</div>
                      )}
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
