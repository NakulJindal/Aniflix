import { useRef } from "react";
import Nav from "./components/Nav";
import Watch from "./components/Watch";
import LogIn from "./components/LogIn";
import Footer from "./components/Footer";
import Signup from "./components/SignUp";
import Landing from "./components/Landing";
import Anicard from "./components/Anicard";
import Profile from "./components/Profile";
import Watchlist from "./components/Watchlist";
import { CssVarsProvider } from "@mui/joy/styles";
import { Container, CssBaseline } from "@mui/joy";
import { SearchResults } from "./components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
              <Route path="/search" element={<SearchResults />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/anime" element={<Anicard />} />
              <Route path="/watch" element={<Watch />} />
            </Routes>
          </Container>
          <br />
          <Footer topAnimeRef={topAnimeRef} scheduleRef={scheduleRef} />
        </BrowserRouter>
      </Container>
    </CssVarsProvider>
  );
}

export default App;
