import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { categoriesContext } from "./context/categoriesContext";
import { featuredContext } from "./context/featuredContext";
import { accessTokenContext } from "./context/accessTokenContext";
import Artist from "./pages/Artist";
import Playlist from "./pages/Playlist";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const CLIENT_ID = "c32d17f98bf6499d8ba1e80fe48a2f1b";
const CLIENT_SECRET = "13b5cb5d83624e26b86311bc97511046";

function App() {
  const [accessToken, setAccessToken] = useState();
  const [bCategories, setBCategories] = useState();
  const [featured, setFeatured] = useState();
  const [temp, setTemp] = useState({});
  const [playlistsMap, setplaylistMap] = useState({});
  const [queryData, setQueryData] = useState();
  let location = useLocation();

  const [query, setQuery] = useState("");
  const resetQuery = () => {
    setQuery("");
  };

  // Spotify API Authorization
  useEffect(() => {
    const url = "https://accounts.spotify.com/api/token";
    var authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };
    fetch(url, authParams)
      .then((results) => results.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  // Spotify API Endpoints
  useEffect(() => {
    if (accessToken !== undefined) {
      const categories = async () => {
        const url = "https://api.spotify.com/v1/browse/categories?limit=20";
        var catParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(url, catParams);
        const data = await response.json();
        setBCategories(data.categories.items);
      };
      categories();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken !== undefined) {
      const featuredPlaylists = async () => {
        const url =
          "https://api.spotify.com/v1/browse/featured-playlists?limit=5";
        var featParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(url, featParams);
        const data = await response.json();
        setFeatured(data);
      };
      featuredPlaylists();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken !== undefined) {
      bCategories.map(async (category) => {
        const { name, id } = category;
        const url = `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=5`;
        var catParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(url, catParams);
        const data = await response.json();
        const playlists = data;
        setTemp((t) => ({ [name]: { id, playlists } }));
      });
    }
    // eslint-disable-next-line
  }, [bCategories]);

  useEffect(() => {
    setplaylistMap((playlistsMap) => ({ ...playlistsMap, ...temp }));
  }, [temp]);

  async function search() {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=album,artist,track`;
    var searchParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(url, searchParams);
    const data = await response.json();
    setQueryData(data);
  }

  
  return (
    <Container fluid style={{ backgroundColor: "black", height:"100vh" }}>
      <Row>
        {(location.pathname !== "/signup") &
        (location.pathname !== "/login") ? (
          <Sidebar></Sidebar>
        ) : null}

        <Col className="d-flex flex-column">
          {(location.pathname !== "/signup") &
          (location.pathname !== "/login") ? (
            <Navbar
              query={query}
              setQuery={setQuery}
              resetQuery={resetQuery}
              search={search}
            ></Navbar>
          ) : null}
          <accessTokenContext.Provider value={accessToken}>
            <categoriesContext.Provider value={bCategories}>
              <featuredContext.Provider value={[featured, playlistsMap]}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/search"
                    element={<SearchPage query={queryData} />}
                  />
                  <Route path="/artist/:id" element={<Artist />} />
                  <Route path="/playlist/:id/:type" element={<Playlist />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </featuredContext.Provider>
            </categoriesContext.Provider>
          </accessTokenContext.Provider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
