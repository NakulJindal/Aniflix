import { useState, useEffect } from "react";
import { Button, Sheet, Stack, styled, Typography } from "@mui/joy";
import axios from "axios";

export default function Watchlist() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [reRender, setreRender] = useState(false);

  const handleClick = async (mal_id) => {
    try {
      await axios.put(
        "http://localhost:3000/api/v1/watchlist/remove",
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
      const res = await axios.get("http://localhost:3000/api/v1/watchlist", {
        withCredentials: true,
      });
      if (res.data) {
        setData(res.data.watchList);
      }
    };
    fetchData();
  }, [reRender]);

  const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography["body-sm"],
    textAlign: "center",
    display: "flex",
    fontWeight: theme.fontWeight.md,
    color: theme.vars.palette.text.secondary,
    border: "1px solid",
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    borderRadius: theme.radius.md,
  }));

  return (
    <div>
      <Typography level="h3">Watchlist Animes:</Typography>
      <br />
      <div>
        <div style={{ minWidth: "100%" }}>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={1}
          >
            {data &&
              data.length > 0 &&
              data.map((e, index) => (
                <Item key={index}>
                  <div style={{ width: "5%" }}>
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
                      <h3 style={{ margin: "0%" }}>{e.title_english}</h3>
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
                </Item>
              ))}
          </Stack>
        </div>
      </div>
    </div>
  );
}
