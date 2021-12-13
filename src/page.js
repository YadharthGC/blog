import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useParams } from "react-router-dom";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";

function Page(props) {
  let date = new Date();
  let dates = date.toString();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);

  const [datas, setdatas] = useState([]);
  const [url, seturl] = useState("");
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [insta, setinsta] = useState("");
  const [twitter, settwitter] = useState("");
  const [content, setcontent] = useState("");
  const [time, settime] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetchid();
  }, [datas]);

  let fetch = async () => {
    try {
      let did = params.id;
      let post = await axios.post("https://yadharthblog.herokuapp.com/id", {
        did,
      });
    } catch (error) {}
  };
  let fetchid = async () => {
    try {
      let get = await axios.get("https://yadharthblog.herokuapp.com/getid");
      console.log(get);
      setdatas([...get.data]);
      setloading(false);
    } catch (error) {}
  };

  return (
    <div className="Page">
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

      <div className="row" id="feedrow">
        {loading ? (
          <h2 style={{ color: "white" }}>Loading..</h2>
        ) : (
          <div>
            {datas.map((data) => {
              return (
                <div>
                  <div className="col-lg-12" id="twelve">
                    <img src={data.url} className="pageimg" />
                  </div>
                  <div className="col-lg-12" id="eleven">
                    <div style={{ marginTop: "3%" }}>
                      <div>
                        <span className="pro_keyans">
                          <u>{data.title}</u>
                        </span>
                      </div>
                      <div>
                        <span className="pro_keyans">
                          by, <u>{data.name}</u>
                        </span>
                      </div>
                      <div className="time">{data.time}</div>
                    </div>
                  </div>
                  <div className="pagecontent">{data.content}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
