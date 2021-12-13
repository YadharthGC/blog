import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Profile() {
  let date = new Date();
  let dates = date.toString();
  const navigate = useNavigate();
  const [dataz, setdataz] = useState([]);
  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [dob, setdob] = useState("");
  const [insta, setinsta] = useState("");
  const [twitter, settwitter] = useState("");
  const [datas, setdatas] = useState([]);
  const [_id, set_id] = useState("");
  const [propic, setpropic] = useState("");
  const [content, setcontent] = useState("");
  const [aboutme, setaboutme] = useState("");
  const params = useParams();
  const did = params.id;
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch();
  }, [dataz]);
  useEffect(() => {
    fetchfeeds();
  }, [datas]);

  let fetch = async () => {
    try {
      let get = await axios.get("http://localhost:3003/profile");
      console.log(get);
      setdataz([...get.data]);
      console.log(dataz);
      setloading(false);
    } catch (error) {}
  };

  let fetchfeeds = async () => {
    try {
      let geta = await axios.get("http://localhost:3003/news", {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setdatas([...geta.data]);
    } catch (error) {}
  };

  return (
    <div>
      <div className="Feed"></div>
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

      <div className="Profilepage">
        {dataz.map((datax) => {
          return (
            <div>
              <div className="profilebox" style={{ marginTop: "0%" }}>
                <div className="row" id="feedrow">
                  <div className="col-lg-3" id="four">
                    <img src={datax.propic} className="proimg" />
                    <Link to={`/setpic/${datax._id}`}>
                      <EditIcon id="editicon" />
                    </Link>
                  </div>
                  <div className="col-lg-9" id="eight">
                    <div>
                      <span className="pro_keyans" style={{ color: "white" }}>
                        {datax.name}
                      </span>
                    </div>
                    <div className="prodob">{datax.dob}</div>
                    <div className="detail">
                      <div>
                        <u>
                          About me
                          <Link to={`/aboutme/${datax._id}`}>
                            <EditIcon id="editicon" />
                          </Link>
                        </u>
                      </div>
                      <div>{datax.aboutme}</div>
                    </div>
                    <div>
                      <InstagramIcon id="proinsta" />
                      <TwitterIcon id="protwitter" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="write">
          <button
            onClick={() => {
              navigate("/create", { replace: true });
            }}
          >
            Create a blog+
          </button>
        </div>
        <div className="container" id="feedpage">
          <div className="blogstyle">Blogs</div>
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
                    {/* <div className="author">
                       <span className="author_key">Author:</span> 
                      &#40;{data.name}&#41;
                    </div> */}
                    <div className="time">{data.dates}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
