import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [mail, setmail] = useState([]);
  const [password, setpassword] = useState([]);
  const navigate = useNavigate();

  let handlesubmit = async (e) => {
    try {
      e.preventDefault();
      let post = await axios.post("https://yadharthblog.herokuapp.com/login", {
        mail,
        password,
      });
      window.localStorage.setItem("app_token", post.data.token);
      navigate("/feed", { replace: true });
    } catch (error) {
      alert("incorrect");
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <div className="register_page">
        <div className="register_box">
          <div className="heading">Login</div>

          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <div className="login_mail">
              <input
                type="text"
                placeholder="Enter your Mail"
                id="mail"
                value={mail}
                onChange={(e) => {
                  setmail(e.target.value);
                }}
              />
            </div>
            <div className="login_password">
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <div className="login_submit">
              <input type="submit" value="Login" id="submit" />
            </div>
          </form>
          <div
            className="already"
            onClick={() => {
              navigate("/register", { replace: true });
            }}
          >
            <u>New member?</u>
          </div>
          {/* <div className="already">
            <u>ADMIN?</u>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
