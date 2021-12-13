import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import { storage } from "./firebase";
import { useParams } from "react-router-dom";

function Aboutme() {
  const navigate = useNavigate();
  const [about, setabout] = useState([]);
  const params = useParams();
  const did = params.id;

  let handlesubmit = async (e) => {
    try {
      navigate("/profile", { replace: true });
      let post = await axios.post(
        "https://yadharthblog.herokuapp.com/aboutme",
        {
          did,
          about,
        }
      );
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="Setpic">
      <div className="header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
          <div class="container-fluid">
            <a class="navbar-brand" href="#" style={{ color: "white" }}>
              <span className="blogzone">Blogzone</span>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ backgroundColor: "white" }}
            >
              <span
                class="navbar-toggler-icon"
                style={{ backgroundColor: "white" }}
              ></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    <Link to="/feed" style={{ textDecoration: "none" }}>
                      <span style={{ color: "white" }} id="feed">
                        Feed
                      </span>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <span style={{ color: "white" }} id="profile">
                        Profile
                      </span>
                    </Link>
                  </a>
                </li>
              </ul>
              <form class="d-flex">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span id="profile"> Name</span>
                    </a>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                      style={{ minWidth: "0px" }}
                      id="logout"
                    >
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          style={{ padding: "0px" }}
                        >
                          <button
                            id="logoutbtn"
                            onClick={() => {
                              window.localStorage.removeItem("app_token");
                              navigate("/", { repalce: true });
                            }}
                          >
                            Logout
                          </button>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
      </div>
      <div className="setpage">
        <div className="setbox">
          <div className="sypp">About me:</div>
          <form
            onSubmit={(i) => {
              handlesubmit(i);
            }}
          >
            <div className="settext">
              <input
                type="text"
                id="settext"
                placeholder="Tell us about yourself"
                value={about}
                onChange={(i) => {
                  setabout(i.target.value);
                }}
              />
            </div>
            <div className="setsubmit">
              <input type="submit" id="setsubmit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Aboutme;
