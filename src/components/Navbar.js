import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ query, setQuery, resetQuery, search }) {
  const [users, setUsers] = useLocalStorage("users");
  const [loggedin, setLoggedIn] = useLocalStorage("loggedin");
  const url = useLocation();
  let navigate = useNavigate();

  const handleSignOut = e =>{
    setUsers([
      ...users.filter((e) => e.id !== loggedin.id),
      loggedin
    ]);
    e.preventDefault()
    setLoggedIn("")

    window.location.href = "/"

  }

  return (
    <Container
      className="d-flex align-items-center mt-2 text-white py-2 px-4 justify-content-between rounded-top"
      style={{ backgroundColor: "#121212" }}
    >
      <div className="d-flex left gap-3">
        <ul className="d-flex nav gap-3">
          <li
            className="nav-item"
            onClick={() => {
              navigate(-1);
            }}
          >
            <button
              className="btn text-white"
              style={{
                backgroundColor: "black",
                borderRadius: "50%",
                height: "40px",
              }}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          </li>
          <li
            className="nav-item"
            onClick={() => {
              navigate(1);
            }}
          >
            <button
              className="btn text-white"
              style={{
                backgroundColor: "black",
                borderRadius: "50%",
                height: "40px",
              }}
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </li>
        </ul>
        {url.pathname === "/search" && (
          <Form
            id="searchForm"
            className="d-flex align-items-center rounded-pill px-3 gap-2"
            style={{ backgroundColor: "#242424", width: "300px" }}
          >
            <Form.Label className="d-flex mt-2">
              <span>
                <i className="bi bi-search"></i>
              </span>
            </Form.Label>
            <Form.Control
              id="searchInput"
              value={query}
              type="input"
              placeholder="What do you want to play?"
              style={{ backgroundColor: "#242424", border: "0" }}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  search();
                }
              }}
            />
          </Form>
        )}
      </div>
      {loggedin ? (
        <div className="dropdown-center navDrop me-5">
          <button
            className="btn d-flex align-items-center dropdown-toggle text-white"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <p className="text-decoration-underline m-0 me-2">
              {loggedin.name}
            </p>
            <i className="bi bi-person-circle m-0 fs-4"></i>
          </button>
          <ul className="dropdown-menu" style={{backgroundColor:"#121212"}}>
            <li>
              <a className="dropdown-item text-white" href="#">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item text-white" onClick={handleSignOut}>
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <ul className="d-flex nav gap-2">
          <li className="nav-item">
            <Link to={"/signup"}>
              <button
                className="btn btn-dark signin rounded-pill"
                style={{ width: "110px", height: "50px" }}
              >
                Sign Up
              </button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"}>
              <button
                className="btn btn-light login rounded-pill fw-bold"
                style={{ width: "110px", height: "50px" }}
              >
                Log In
              </button>
            </Link>
          </li>
        </ul>
      )}
    </Container>
  );
}

export default Navbar;
