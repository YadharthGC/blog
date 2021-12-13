import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetchid();
  }, []);

  let fetch = async () => {
    try {
      let did = params.id;
      let post = await axios.post("http://localhost:3003/id", {
        did,
      });
    } catch (error) {}
  };
  let fetchid = async () => {
    try {
      let get = await axios.get("http://localhost:3003/getid");
      console.log(get);
      seturl(get.data[0].url);
      settitle(get.data[0].title);
      setauthor(get.data[0].name);
      setcontent(get.data[0].content);
      settime(get.data[0].time);
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

      <div className="row" id="feedrow">
        <div className="col-lg-12" id="twelve">
          <img src={url} className="pageimg" />
        </div>
        <div className="col-lg-12" id="eleven">
          <div style={{ marginTop: "3%" }}>
            <div>
              <span className="pro_keyans">
                <u>{title}</u>
              </span>
            </div>
            <div>
              <span className="pro_keyans">
                by, <u>{author}</u>
              </span>
            </div>
            <div className="time">{time}</div>
          </div>
          {/* <div>
            <InstagramIcon id="proinsta" />
            <TwitterIcon id="protwitter" />
          </div> */}
        </div>
      </div>
      <div className="pagecontent">{content}</div>
      {/* <div className="comment">
        <div className="similar">Comment</div>
        <form>
          <div>
            <input type="text" id="comment" />
          </div>
          <div>
            <input type="submit" id="submit" />
          </div>
        </form>
      </div>
      <div className="similar">Similar post:</div>
      <div className="pagepost">
        <div className="pagepart">
          <div>
            <div>
              <img src="./images/r1.jpg" className="pageimg" />
            </div>
            <div className="title">Title</div>
          </div>
        </div>
        <div className="pagepart">
          <div>
            <div>
              <img src="./images/r1.jpg" className="pageimg" />
            </div>
            <div className="title">Title</div>
          </div>
        </div>
        <div className="pagepart">
          <div>
            <div>
              <img src="./images/r1.jpg" className="pageimg" />
            </div>
            <div className="title">Title</div>
          </div>
        </div>
        <div className="pagepart">
          <div>
            <div>
              <img src="./images/r1.jpg" className="pageimg" />
            </div>
            <div className="title">Title</div>
          </div>
        </div>
      </div>
      <div className="similar">Popular post:</div>
      <div className="pagepost">
        <div className="pagepart">
          <div>
            <div>
              <img src="./images/r1.jpg" className="pageimg" />
            </div>
            <div className="title">Title</div>
          </div>
        </div>
        <div className="pagepart">
          <div>
            <div>
              <img src="./images/r1.jpg" className="pageimg" />
            </div>
            <div className="title">Title</div>
          </div>
        </div>
        <div className="pagepart">
          <div>
            <div>
              <img src="./images/r1.jpg" className="pageimg" />
            </div>
            <div className="title">Title</div>
          </div>
        </div>
        <div className="pagepart">
          <div>
            <div>
              <img src="./images/r1.jpg" className="pageimg" />
            </div>
            <div className="title">Title</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Page;
