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

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetchid();
  }, []);

  let fetch = async () => {
    try {
      let did = params.id;
      let post = await axios.post("http://localhost:3003/id", { did });
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
    } catch (error) {}
  };

  return (
    <div className="Page">
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
      <div className="row" id="feedrow">
        <div className="col-lg-3" id="four">
          <img src={url} className="proimg" />
        </div>
        <div className="col-lg-9" id="eight">
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
          {/* <div className="detail">
            I am Hari Yadharth GC from Kovilpatti,Thoothukudi district. I
            graduated engineering with 86% , HSC with 92% and SSLC 94%. I am
            graduated from Dr.Mahalingam college of engineering and technology,
            Pollachi where my major was mechatronics. During my college days I
            underwent 2 months of implant training in ICMPL Chennai in 2021. I
            did an IoT project, facial recognition security system for my final
            year project. During my implant training, I was trained to be a
            Machine maintenance engineer for CNC machines. Beyond that, I am
            good with 3 programming languages that include c,c++, and
            javascript. I have the knowlege about HTML,CSS and Bootstrap and
            also about the libraries Reactjs and Nodejs. I am comfortable with
            windows and Linux operating systems. With my native language Tamil,
            I am fine with the other two languages, English and Telugu. Last but
            not least i love travelling and i use to play badminton for my
            health.
          </div> */}
          <div>
            <InstagramIcon id="proinsta" />
            <TwitterIcon id="protwitter" />
          </div>
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
