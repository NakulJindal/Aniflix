import { atom } from "recoil";

export const aniIdAtom = atom({
  key: "aniIdAtom",
  default: 1,
});

export const loginAtom = atom({
  key: "loginAtom",
  default: false,
});

export const cardTypeAtom = atom({
  key: "cardTypeAtom",
  default: "",
});

export const queryAtom = atom({
  key: "queryAtom",
  default: "",
});

export const clickCountAtom = atom({
  key: "clickCountAtom",
  default: 1,
});

export const dayAtom = atom({
  key: "dayAtom",
  default: "monday",
});

export const trailerAtom = atom({
  key: "trailerAtom",
  default: "",
});

export const userAtom = atom({
  key: "userAtom",
  default: {},
});
