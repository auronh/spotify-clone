import React, { useContext } from "react";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import { featuredContext } from "../context/featuredContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [featured, playlistsMap] = useContext(featuredContext);

  console.log(playlistsMap)
  return (
    <Container
      className="d-flex flex-column rounded-bottom p-4 pb-3 content"
      style={{
        backgroundColor: "#121212",
        height: "90.1vh",
        overflowY: "overlay",
      }}
    >
      <div className="category d-flex flex-column my-2">
        <h4 className="text-white fw-bold">{featured && featured.message}</h4>
        <div className="d-flex gap-3">
          {featured &&
            featured.playlists &&
            featured.playlists.items &&
            featured.playlists.items.map((p) => (
              <Link
                to={`/playlist/${p.id}/playlists`}
                style={{ textDecoration: "none" }}
                key={uuidv4()}
              >
                <Cards
                  url={p.images[0].url}
                  title={p.name}
                  description={p.description}
                  type="Home"
                />
              </Link>
            ))}
        </div>
      </div>
      {Object.entries(playlistsMap).map(([name, info]) => {
        const { id, playlists } = info;
        return (
          <div key={uuidv4()} className="category d-flex flex-column my-2">
            <h4 className="text-white fw-bold">
              {playlists && playlists.message}
            </h4>
            <div className="d-flex gap-3">
              {playlists.playlists.items.map((p) => (
                <Link
                  to={`/playlist/${p.id}/playlists`}
                  style={{ textDecoration: "none" }}
                  key={uuidv4()}
                >
                  <Cards
                    url={p.images[0].url}
                    title={p.name}
                    description={p.description}
                    type="Home"
                  />
                </Link>
              ))}
            </div>
          </div>
        );
      })}
      <Footer></Footer>
    </Container>
  );
}

export default Home;
