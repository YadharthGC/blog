import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";

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
        <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#" style={{ color: "white" }}>
              Blog
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
                      <span style={{ color: "white" }}> Feed</span>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <span style={{ color: "white" }}>Profile</span>
                    </Link>
                  </a>
                </li>
              </ul>
              <form class="d-flex">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                      <InstagramIcon style={{ color: "white" }} />
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <TwitterIcon style={{ color: "white" }} />
                    </a>
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
        </nav>
      </div>

      <div className="feedpage">
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
      </div>
    </div>
  );
}

export default Feed;
