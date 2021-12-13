import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

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
      let geta = await axios.get("http://localhost:3003/allnews", {
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
            >
              <span class="navbar-toggler-icon"></span>
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
        {/* <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
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
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    <Link to="/feed" style={{ textDecoration: "none" }}>
                      <span style={{ color: "white" }} id="feed">
                        {" "}
                        Feed
                      </span>
                    </Link>
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
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
                 
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <Avatar />
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <Avatar />
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" href="#">
                        Action
                      </a>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                      <button
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
              </form>
            </div>
          </div>
        </nav> */}
      </div>

      {/* <div className="feedpage">
        <div className="blogstyle">Blog</div>
        <div className="feedpost">
          {datas.map((data) => {
            return (
              <Link to={`/page/${data._id}`} style={{ textDecoration: "none" }}>
                <div className="feedpart">
                  <div>
                    <img src={data.url} className="feedimg" />
                  </div>
                  <div style={{ backgroundColor: "black" }}>
                    <div className="title">{data.title}</div>
                    <div className="author">
                      <span className="author_key">Author:</span>
                      <span className="author_keyans">{data.name}</span>
                    </div>
                    <div className="time">{data.dates}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div> */}
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
                <div
                // style={{ backgroundColor: "black" }}
                >
                  <div id="title">{data.title}</div>
                  <div className="author">
                    {/* <span className="author_key">Author:</span> */}
                    &#40;{data.name}&#41;
                  </div>
                  {/* <div className="time">{data.dates}</div> */}
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
