import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Anicard from "./components/Anicard";
import Landing from "./components/Landing";
import { SearchResults } from "./components/Search";
import { CssVarsProvider } from "@mui/joy/styles";
import { Container, CssBaseline } from "@mui/joy";
import ColorInversionFooter from "./components/Footer";
import Watch from "./components/Watch";
import { useRef } from "react";

function App() {
  const topAnimeRef = useRef(null);
  const scheduleRef = useRef(null);
  return (
    <CssVarsProvider defaultMode="dark">
      <Container
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <CssBaseline />
        <BrowserRouter>
          <Nav topAnimeRef={topAnimeRef} scheduleRef={scheduleRef} />
          <Container sx={{ flex: 1 }}>
            <br />
            <Routes>
              <Route
                path="/"
                element={
                  <Landing
                    topAnimeRef={topAnimeRef}
                    scheduleRef={scheduleRef}
                  />
                }
              />
              <Route
                path="/search"
                element={<SearchResults listType="search" />}
              />
              <Route path="/anime" element={<Anicard />} />
              <Route path="/watch" element={<Watch />} />
            </Routes>
          </Container>
          <br />
          <ColorInversionFooter
            topAnimeRef={topAnimeRef}
            scheduleRef={scheduleRef}
          />
        </BrowserRouter>
      </Container>
    </CssVarsProvider>
  );
}

export default App;
