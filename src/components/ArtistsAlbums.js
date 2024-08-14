import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import { accessTokenContext } from "../context/accessTokenContext";
import { v4 as uuidv4 } from "uuid";

function ArtistsAlbums({ artistId }) {
  const accessToken = useContext(accessTokenContext);
  const [artistAlbums, setArtistAlbums] = useState();

  useEffect(() => {
    if (accessToken != undefined && artistId != undefined) {
      const artistsAlbums = async () => {
        const url = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50`;
        var artistParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(url, artistParams);
        const data = await response.json();
        setArtistAlbums(data);
      };
      artistsAlbums();
    }
  }, [artistId]);

  let albums =
    artistAlbums != undefined &&
    Map.groupBy(
      artistAlbums.items,
      ({ album_type }) => album_type == "album"
    ).get(true);
  let singles =
    artistAlbums != undefined &&
    Map.groupBy(
      artistAlbums.items,
      ({ album_type }) => album_type == "single"
    ).get(true);
  let comps =
    artistAlbums != undefined &&
    Map.groupBy(
      artistAlbums.items,
      ({ album_type }) => album_type == "compilation"
    ).get(true);
  console.log(artistAlbums);
  return (
    <Col>
      <div className="category d-flex flex-column my-2">
        {albums && <h4 className="text-white fw-bold">Albums</h4>}
        <div className="d-flex gap-3 flex-wrap">
          {albums &&
            Object.entries(albums)
              .slice(0, 5)
              .map((data) => {
                return (
                  <Link
                    to={`/playlist/${data[1].id}/album`}
                    style={{ textDecoration: "none" }}
                    key={uuidv4()}
                  >
                    <Cards
                      url={data[1].images[0].url}
                      title={data[1].name}
                      description={
                        data[1].release_date.substring(0, 4) +
                        " | " +
                        (data[1].album_type.charAt(0).toUpperCase() +
                          data[1].album_type.slice(1))
                      }
                      type="Home"
                    />
                  </Link>
                );
              })}
        </div>
      </div>
      <div className="category d-flex flex-column my-2">
        {singles && <h4 className="text-white fw-bold">Singles and EPs</h4>}
        {
          <div className="d-flex gap-3 flex-wrap">
            {singles &&
              Object.entries(singles)
                .slice(0, 5)
                .map((data) => {
                  return (
                    <Link
                      to={`/playlist/${data[1].id}/album`}
                      style={{ textDecoration: "none" }}
                      key={uuidv4()}
                    >
                      <Cards
                        url={data[1].images[0].url}
                        title={data[1].name}
                        description={
                          data[1].release_date.substring(0, 4) +
                          " | " +
                          (data[1].album_type.charAt(0).toUpperCase() +
                            data[1].album_type.slice(1))
                        }
                        type="Home"
                      />
                    </Link>
                  );
                })}
          </div>
        }
      </div>
      <div className="category d-flex flex-column my-2">
        {comps && <h4 className="text-white fw-bold">Compilations</h4>}
        <div className="d-flex gap-3 flex-wrap">
          {comps &&
            Object.entries(comps)
              .slice(0, 5)
              .map((data) => {
                return (
                  <Link
                    to={`/playlist/${data[1].id}/album`}
                    style={{ textDecoration: "none" }}
                    key={uuidv4()}
                  >
                    <Cards
                      url={data[1].images[0].url}
                      title={data[1].name}
                      description={
                        data[1].release_date.substring(0, 4) +
                        " | " +
                        (data[1].album_type.charAt(0).toUpperCase() +
                          data[1].album_type.slice(1))
                      }
                      type="Home"
                    />
                  </Link>
                );
              })}
        </div>
      </div>
    </Col>
  );
}

export default ArtistsAlbums;
