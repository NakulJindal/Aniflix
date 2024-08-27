import React from "react";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
