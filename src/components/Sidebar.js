import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import SidebarPlaylist from "./SidebarPlaylist";
import { useLocalStorage } from "@uidotdev/usehooks";
import { v4 as uuidv4 } from "uuid";

function Sidebar() {
  const [loggedin, setLoggedIn] = useLocalStorage("loggedin");

  return (
    <Container className="col-auto col-md-3 col-xl-3 ps-2 px-0">
      <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">
        <ul
          className="nav nav-pills flex-column align-items-sm-start mb-2 ps-4 py-2 w-100 rounded"
          id="top"
          style={{ backgroundColor: "#121212" }}
        >
          <li className="nav-item">
            <Link to="/" className="nav-link align-middle px-0 fw-bold">
              <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                alt=""
                style={{ width: "100px" }}
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link align-middle px-0 fw-bold">
              <i className="fs-4 bi-house me-2 align-middle"></i>{" "}
              <span className="ms-1 d-none d-sm-inline align-middle">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link align-middle px-0 fw-bold">
              <i className="fs-4 bi-search me-2 align-middle"></i>{" "}
              <span className="ms-1 d-none d-sm-inline align-middle">
                Search
              </span>
            </Link>
          </li>
        </ul>

        <ul
          className="nav nav-pills flex-column mb-2 align-items-center align-items-sm-start py-2 w-100 rounded flex-fill"
          id="bottom"
          style={{ backgroundColor: "#121212" }}
        >
          <li className="d-flex nav-item ps-4 align-items-center">
            <Link to="/" className="nav-link align-middle px-0 fw-bold">
              <i className="fs-4 bi-collection me-2 align-middle"></i>{" "}
              <span className="ms-1 d-none d-sm-inline align-middle">
                Your Library
              </span>
            </Link>
            <a
              href=""
              className="nav-link px-0 fs-3 fw-bold align-bottom"
              id="addPlaylist"
            >
              <i className="bi bi-plus align-middle"></i>
            </a>
          </li>
          {loggedin && loggedin.liked.map((el) => {
            return (
              <SidebarPlaylist
                key={uuidv4()}
                id={el.pid}
                src={el.url}
                name={el.name}
                type={el.pType}
                owner={el.type !== "Artist" && el.owner}
              />
            ); 
          })}
        </ul>
      </div>
    </Container>
  );
}

export default Sidebar;
