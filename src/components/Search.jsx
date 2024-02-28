import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { AniList } from "./AniList";
import { queryAtom, showSearchResultsAtom } from "../recoil/atoms";
import urls from "../utils/apiEndpoints";
import { Button, Input } from "@mui/joy";
import SearchTwoTone from "@mui/icons-material/SearchTwoTone";

export function SearchBar() {
  const setQuery = useSetRecoilState(queryAtom);
  const [show, setShow] = useRecoilState(showSearchResultsAtom);
  const navigate = useNavigate();

  const handleSearch = () => {
    const value = document.getElementById("searchInput").value;
    const newURL = urls.getSearchResults(value);
    setQuery(newURL);
    if (!show) setShow(true);
    navigate("/search");
  };

  return (
    <div>
      <Input
        id="searchInput"
        onChange={handleSearch}
        startDecorator={<SearchTwoTone />}
        endDecorator={<Button onClick={handleSearch}>Search</Button>}
        sx={{
          "--Input-radius": "25px",
          "--Input-gap": "8px",
          "--Input-placeholderOpacity": 0.3,
          "--Input-minHeight": "39px",
          "--Input-focusedThickness": "1px",
          width: "600px",
        }}
      ></Input>
      {/* <input id="searchInput" type="text" onChange={handleSearch} /> */}
    </div>
  );
}

export function SearchResults({ listType }) {
  const show = useRecoilValue(showSearchResultsAtom);
  return <div>{show && <AniList listType={listType} />}</div>;
}
