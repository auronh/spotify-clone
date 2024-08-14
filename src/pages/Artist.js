import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { accessTokenContext } from "../context/accessTokenContext";
import ArtistsTracks from "../components/ArtistsTracks";
import ArtistsAlbums from "../components/ArtistsAlbums";
import { useLocalStorage } from "@uidotdev/usehooks";

function Artist() {
  const accessToken = useContext(accessTokenContext);
  const [artist, setArtist] = useState();
  const [likeStatus, setLikeStatus] = useState("off");
  const [loggedin, setLoggedIn] = useLocalStorage("loggedin");

  const { id } = useParams();

  useEffect(() => {
    if (accessToken != undefined) {
      const artistData = async () => {
        const url = `https://api.spotify.com/v1/artists/${id}`;
        var artistParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(url, artistParams);
        const data = await response.json();
        setArtist(data);
      };
      artistData();
    }
  }, [accessToken]);

  console.log(artist);

  const handleLike = () => {
      let likedArtist = {
        pid: id,
        name: artist.name,
        url: artist.images[0].url,
        pType: artist.type.charAt(0).toUpperCase() +
              artist.type.slice(1)
      };

      if (loggedin.liked.some((el) => el.pid === likedArtist.pid)) {
        setLoggedIn({
          ...loggedin,
          liked: loggedin.liked.filter((e) => e.pid !== likedArtist.pid),
        });
      } else {
        setLoggedIn({
          ...loggedin,
          liked: [...loggedin.liked, likedArtist],
        });
      }
      console.log(loggedin.liked);
    };

    useEffect(() => {
      if (loggedin.liked.some((el) => el.pid === id)) {
        setLikeStatus("on");
      } else {
        setLikeStatus("off");
      }
    }, [loggedin]);

  return (
    <Container
      className="d-flex flex-column rounded-bottom px-4 pb-3 content "
      style={{
        backgroundColor: "#121212",
        height: "90.1vh",
        overflowY: "overlay",
      }}
    >
      <Row>
        <Col xs={3}>
          <img
            src={
              artist && artist.images
                ? artist.images[0].url
                : "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTEzOS5qcGc.jpg"
            }
            className="rounded-pill"
            alt=""
            style={{ height: "250px", width: "250px" }}
          />
          <div className="d-flex interact gap-4 align-items-center mt-4 ps-2">
            <div className="playArtist">
              <i className="bi bi-play-fill fs-2"></i>
            </div>
            <Button
              className={`btn-dark d-flex align-items-center justify-content-center fw-bold ${
                likeStatus === "off" ? "bg-transparent" : "bg-light text-dark"
              }`}
              style={{ height: "30px", fontSize: "12px" }}
              onClick={handleLike}
            >
              {likeStatus === "off" ? "FOLLOW" : "UNFOLLOW"}
            </Button>
          </div>
        </Col>
        <Col className="d-flex flex-column text-white pt-5">
          <p>Artist</p>
          <h1 className="fw-bold playlistTitle">
            {artist && artist.name}
          </h1>
          <p>
            {artist && artist.followers.total.toLocaleString()} monthly
            listeners
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <ArtistsTracks artistId={artist && artist.id}></ArtistsTracks>
      </Row>
      <Row className="mt-5">
        <ArtistsAlbums artistId={artist && artist.id}></ArtistsAlbums>
      </Row>
      <Footer></Footer>
    </Container>
  );
}

export default Artist;
