import { atom } from "recoil";
import urls from "../utils/apiEndpoints";

export const aniIdAtom = atom({
  key: "aniIdAtom",
  default: 1,
});

export const cardTypeAtom = atom({
  key: "cardTypeAtom",
  default: "",
});

export const queryAtom = atom({
  key: "queryAtom",
  default: urls.getSearchResults,
});

export const showSearchResultsAtom = atom({
  key: "showSearchResultsAtom",
  default: false,
});

export const clickCountAtom = atom({
  key: "clickCountAtom",
  default: 1,
});

export const dayAtom = atom({
  key: "dayAtom",
  default: "",
});

export const trailerAtom = atom({
  key: "trailerAtom",
  default: "",
});
