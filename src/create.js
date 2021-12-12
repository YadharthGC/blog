import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useHistory } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { storage } from "./firebase";
import axios from "axios";

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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Navbar
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
                      <span style={{ color: "black" }}> Feed</span>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <span style={{ color: "black" }}>Profile</span>
                    </Link>
                  </a>
                </li>
              </ul>
              <form class="d-flex">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                      <InstagramIcon />
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <TwitterIcon />
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
      <div className="createpage">
        <div className="write">Create a blog</div>
        <form
          onSubmit={(i, e) => {
            handlesubmit(i, e);
          }}
        >
          <div>
            <input
              type="text"
              id="createtitle"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="file"
              id="createphoto"
              accept=".jpg,.jpeg,.png"
              onChange={(i) => {
                setimage(i.target.files[0]);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              id="createcontent"
              placeholder="Content"
              value={content}
              onChange={(e) => {
                setcontent(e.target.value);
              }}
            />
          </div>
          <div>
            <input type="submit" id="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
