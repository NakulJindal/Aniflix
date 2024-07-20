import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Anicard from "./components/Anicard";
import Landing from "./components/Landing";
import { SearchResults } from "./components/Search";
import { CssVarsProvider } from "@mui/joy/styles";
import { Container, CssBaseline } from "@mui/joy";
import ColorInversionFooter from "./components/Footer";
import Watch from "./components/Watch";

function App() {
  return (
    <CssVarsProvider defaultMode="dark">
      <CssBaseline />
      <Container maxWidth="false">
        <BrowserRouter>
          <Nav />
          <br />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/search"
              element={<SearchResults listType="search" />}
            />
            <Route path="/anime" element={<Anicard />} />
            <Route path="/watch" element={<Watch />} />
          </Routes>
          <br />
          <ColorInversionFooter />
        </BrowserRouter>
      </Container>
    </CssVarsProvider>
  );
}

export default App;
