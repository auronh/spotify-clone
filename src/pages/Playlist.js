import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { accessTokenContext } from "../context/accessTokenContext";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@uidotdev/usehooks";

function Playlist() {
  const accessToken = useContext(accessTokenContext);
  const [users, setUsers] = useLocalStorage("users");
  const [playlist, setPlaylist] = useState();
  const [loggedin, setLoggedIn] = useLocalStorage("loggedin");
  const [likeStatus, setLikeStatus] = useState("off");

  const { id, type } = useParams();

  useEffect(() => {
    if (accessToken !== undefined) {
      const playlistData = async () => {
        const url = `https://api.spotify.com/v1/${
          type === "album" ? "albums" : "playlists"
        }/${id}`;
        var playlistParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(url, playlistParams);
        const data = await response.json();
        setPlaylist(data);
      };
      playlistData();
    }
  }, [accessToken]);

  const handleLike = () => {
    let likedPlaylist = {
      pid: id,
      name: playlist.name,
      url: playlist.images[0].url,
      pType:
        type === "album"
          ? playlist.album_type.charAt(0).toUpperCase() +
            playlist.album_type.slice(1)
          : "Playlist",
      owner:
        type === "album"
          ? playlist.artists[0].name
          : playlist.owner.display_name,
    };

    if (loggedin && loggedin.liked.some((el) => el.pid === likedPlaylist.pid)) {
      setLoggedIn({
        ...loggedin,
        liked: loggedin.liked.filter((e) => e.pid !== likedPlaylist.pid)
      });
    } else {
      setLoggedIn({
        ...loggedin,
        liked: [...loggedin.liked, likedPlaylist],
      });
    }
    console.log(loggedin.liked);
  };

  useEffect(() => {
    if (loggedin && loggedin.liked.some((el) => el.pid === id)) {
      setLikeStatus("on");
    } else {
      setLikeStatus("off");
    }
  }, [loggedin]);

  return (
    <Container
      className="d-flex flex-column rounded-bottom px-4 pb-3 content"
      style={{
        backgroundColor: "#121212",
        height: "90.1vh",
        overflowY: "overlay",
      }}
    >
      {playlist && (
        <>
          <Row className="mt-2 pb-0">
            <Col xs={3}>
              <img
                src={playlist.images[0].url}
                className="plImage"
                alt=""
                style={{ height: "250px", width: "250px" }}
              />
            </Col>
            <Col className="d-flex flex-column text-white pt-5">
              <p className="mb-0">
                {type === "album"
                  ? playlist.album_type.charAt(0).toUpperCase() +
                    playlist.album_type.slice(1)
                  : "Playlist"}
              </p>
              <h1 className="fw-bold mb-2 playlistTitle">{playlist.name}</h1>
              <p className="mb-0">
                {type === "album"
                  ? playlist.artists[0].name
                  : playlist.owner.display_name}{" "}
                |{" "}
                <span>
                  {type === "album" &&
                    playlist.release_date.slice(0, 4) + " | "}{" "}
                  {type === "album"
                    ? playlist.total_tracks
                    : playlist.tracks.items.length}{" "}
                  songs
                </span>
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="d-flex gap-3">
              <div className="playArtist">
                <i className="bi bi-play-fill fs-2"></i>
              </div>
              <div
                className="likeIcon px-2"
                onClick={
                  !loggedin
                    ? () => alert("You need to be logged in!!!")
                    : () => {
                        handleLike();
                      }
                }
              >
                <i
                  className={`bi bi-heart${likeStatus === "on" ? "-fill" : ""}`}
                ></i>
              </div>
            </Col>
          </Row>
        </>
      )}
      <Row className="mt-4 mx-1">
        {playlist &&
          Object.entries(playlist.tracks.items).map((data) => {
            return (
              <div
                className="song d-flex align-items-center justify-content-between w-100 rounded px-3"
                key={uuidv4()}
              >
                <div className="left d-flex gap-2 align-items-center justify-content-center text-white">
                  <i className="bi bi-play-fill fs-5 pe-2"></i>
                  <img
                    className="rounded"
                    src={
                      type === "playlists"
                        ? data[1].track && data[1].track.album.images[0].url
                        : ""
                    }
                    alt=""
                    style={{ height: "40px" }}
                  />
                  <div className="nameArtists">
                    <p className="m-0">
                      {type === "album"
                        ? data[1].name
                        : data[1].track && data[1].track.name}
                    </p>
                    <p
                      className="m-0"
                      style={{ color: "#abacac", fontSize: "13px" }}
                    >
                      {type === "album"
                        ? data[1].artists[0].name
                        : data[1].track && data[1].track.artists[0].name}
                    </p>
                  </div>
                </div>
                <div
                  className="d-flex align-items-center mx-3 right"
                  style={{ color: "#9e9e9e", gap: "250px" }}
                >
                  <p className="mt-3">
                    {new Date(
                      type === "album"
                        ? data[1].duration_ms
                        : data[1].track && data[1].track.duration_ms
                    ).getMinutes()}
                    :
                    {new Date(
                      type === "album"
                        ? data[1].duration_ms
                        : data[1].track && data[1].track.duration_ms
                    ).getSeconds() < 10
                      ? "0" +
                        new Date(
                          type === "album"
                            ? data[1].duration_ms
                            : data[1].track && data[1].track.duration_ms
                        )
                          .getSeconds()
                          .toString()
                      : new Date(
                          type === "album"
                            ? data[1].duration_ms
                            : data[1].track && data[1].track.duration_ms
                        ).getSeconds()}
                  </p>
                </div>
              </div>
            );
          })}
      </Row>
      <Footer></Footer>
    </Container>
  );
}

export default Playlist;
