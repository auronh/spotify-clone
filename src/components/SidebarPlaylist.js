import React from "react";
import { Link } from "react-router-dom";

function SidebarPlaylist({ id, src, name, type, owner = "" }) {
  return (
    <li className="nav-item pl-item ms-2 ps-2 rounded">
      <Link
        to={`/${type === "Artist" ? "artist" : "playlist"}/${id}${
          type === "Playlist"
            ? "/" + type.toLowerCase() + "s"
            : type !== "Artist" ? "/" + type.toLowerCase() : ""
        }`}
        className="d-flex nav-link text-white align-middle px-0 fw-medium"
      >
        <img
          className={`rounded${type === "Artist" && "-pill"}`}
          src={src}
          alt={name}
          style={{ width: "47px", height:"47px" }}
        />
        <div className="d-flex flex-column">
          <span className="ms-2 d-none d-sm-inline align-middle">{name}</span>
          <span
            className="ms-2 d-none d-sm-inline align-middle"
            style={{ fontSize: "14px", color: "grey" }}
          >
            {type} {type !== "Artist" && " | " + owner}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default SidebarPlaylist;
