import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";

function Profile() {
  let date = new Date();
  let dates = date.toString();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [dob, setdob] = useState("");
  const [insta, setinsta] = useState("");
  const [twitter, settwitter] = useState("");
  const [datas, setdatas] = useState([]);

  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    fetchfeeds();
  }, []);

  let fetch = async () => {
    try {
      let get = await axios.get("https://yadharthblog.herokuapp.com/profile");
      console.log(get);
      setname(get.data.name);
      setmail(get.data.mail);
      setdob(get.data.dob);
      setinsta(get.data.insta);
      settwitter(get.data.twitter);
    } catch (error) {}
  };

  let fetchfeeds = async () => {
    try {
      let geta = await axios.get("https://yadharthblog.herokuapp.com/news", {
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
      <div className="Profilepage">
        <div className="profilebox">
          <div className="row" id="feedrow">
            <div className="col-lg-3" id="four">
              <img src="./images/r1.jpg" className="proimg" />
            </div>
            <div className="col-lg-9" id="eight">
              <div>
                <span className="pro_keyans">
                  <u>{name}</u>
                </span>
              </div>
              <div className="prodob">{dob}</div>
              <div className="detail">
                I am Hari Yadharth GC from Kovilpatti,Thoothukudi district. I
                graduated engineering with 86% , HSC with 92% and SSLC 94%. I am
                graduated from Dr.Mahalingam college of engineering and
                technology, Pollachi where my major was mechatronics. During my
                college days I underwent 2 months of implant training in ICMPL
                Chennai in 2021. I did an IoT project, facial recognition
                security system for my final year project. During my implant
                training, I was trained to be a Machine maintenance engineer for
                CNC machines. Beyond that, I am good with 3 programming
                languages that include c,c++, and javascript. I have the
                knowlege about HTML,CSS and Bootstrap and also about the
                libraries Reactjs and Nodejs. I am comfortable with windows and
                Linux operating systems. With my native language Tamil, I am
                fine with the other two languages, English and Telugu. Last but
                not least i love travelling and i use to play badminton for my
                health.
              </div>
              <div>
                <InstagramIcon id="proinsta" />
                <TwitterIcon id="protwitter" />
              </div>
            </div>
          </div>
        </div>
        <div className="write">
          <button
            onClick={() => {
              navigate("/create", { replace: true });
            }}
          >
            Create a blog+
          </button>
        </div>
        <div className="feedpost">
          {datas.map((data) => {
            return (
              <div className="feedpart">
                <div>
                  <img src={data.url} className="feedimg" />
                </div>
                <div className="title">{data.title}</div>
                <div className="author">
                  <span className="author_key">Author:</span>
                  <span className="author_keyans"> {data.name}</span>
                </div>
                <div className="time">{dates}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
