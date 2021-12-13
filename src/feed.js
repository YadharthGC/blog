import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

function Feed() {
  let date = new Date();
  let dates = date.toString();
  const navigate = useNavigate();
  const [datas, setdatas] = useState([]);

  useEffect(() => {
    fetchfeeds();
  }, []);

  let fetchfeeds = async () => {
    try {
      let geta = await axios.get("https://yadharthblog.herokuapp.com/allnews", {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setdatas([...geta.data]);
    } catch (error) {}
  };

  return (
    <div className="Feed">
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
                    <a class="nav-link" href="#">
                      <span id="profile">
                        <LogoutIcon
                          onClick={() => {
                            window.localStorage.removeItem("app_token");
                            navigate("/", { repalce: true });
                          }}
                        />
                      </span>
                    </a>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
      </div>

      <div className="container" id="feedpage">
        <div className="blogstyle">Blogzone</div>
        <div className="feedpost">
          {datas.map((data) => {
            return (
              <div className="feedpart">
                <div>
                  <Link
                    to={`/page/${data._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img src={data.url} className="feedimg" />{" "}
                  </Link>
                </div>
                <div>
                  <div id="title">{data.title}</div>
                  <div className="author">&#40;{data.name}&#41;</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Feed;
