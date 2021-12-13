import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useHistory } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { storage } from "./firebase";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";

function Create() {
  let date = new Date();
  let dates = date.toString();
  const navigate = useNavigate();
  const [title, settitle] = useState([]);
  const [image, setimage] = useState(null);
  const [urls, seturls] = useState([]);
  const [content, setcontent] = useState([]);

  let handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const uploadtask = storage.ref(`images/${image.name}`).put(image);
      uploadtask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log("error32");
        },
        () => {
          try {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(async (url) => {
                try {
                  seturls(url);
                  console.log(url);
                  console.log(title, content, url);
                  navigate("/profile", { replace: true });
                  await axios.post(
                    "https://yadharthblog.herokuapp.com/feed",
                    {
                      title,
                      content,
                      dates,
                      url,
                    },
                    {
                      headers: {
                        Authorization: window.localStorage.getItem("app_token"),
                      },
                    }
                  );
                  console.log("posted");
                } catch (error) {
                  console.log("erorre");
                  console.log(error);
                }
              });
          } catch (error) {
            console.log("storage error");
            console.log(error);
          }
        }
      );
    } catch (error) {
      console.log("handlesubmit error");
      console.log("error");
    }
  };

  return (
    <div className="Create">
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

      <div id="createset">
        <div className="setbox">
          <div className="sypp">Create a feed:</div>
          <form
            onSubmit={(i, e) => {
              handlesubmit(i, e);
            }}
          >
            <div className="settitle" style={{ textAlign: "center" }}>
              <input
                type="text"
                placeholder="Title"
                id="settitle"
                value={title}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
            </div>
            <div className="setfilea" style={{ textAlign: "center" }}>
              <input
                type="file"
                id="setfile"
                accept=".jpg,.jpeg,.png"
                onChange={(i) => {
                  setimage(i.target.files[0]);
                }}
              />
            </div>
            <div className="settext">
              <input
                type="text"
                placeholder="Content"
                id="settext"
                value={content}
                onChange={(e) => {
                  setcontent(e.target.value);
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

export default Create;
