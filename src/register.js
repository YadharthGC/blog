import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Register() {
  const [name, setname] = useState([]);
  const [mail, setmail] = useState([]);
  const [password, setpassword] = useState([]);
  const [cpassword, setcpassword] = useState([]);
  const [dob, setdob] = useState([]);
  const [insta, setinsta] = useState([]);
  const [twitter, settwitter] = useState([]);
  const navigate = useNavigate();

  let handlesubmit = async () => {
    navigate("/", { replace: true });
    let post = await axios.post("http://localhost:3003/register", {
      name,
      mail,
      dob,
      password,
      insta,
      twitter,
    });
  };

  return (
    <div className="Register">
      <div className="register_page">
        <div className="register_box">
          <div className="heading">Register</div>
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <div className="fullname">
              <input
                type="text"
                placeholder="Full name"
                id="fullname"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            <div className="mail">
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
            <div className="password">
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
            <div className="password">
              <input
                type="password"
                placeholder="Confirm Password"
                id="password"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />
            </div>
            <div className="dob">
              <input
                type="date"
                placeholder="Date of Birth"
                id="dob"
                value={dob}
                onChange={(e) => {
                  setdob(e.target.value);
                }}
              />
            </div>
            <div className="insta">
              <input
                type="text"
                placeholder="Insta link"
                id="insta"
                value={insta}
                onChange={(e) => {
                  setinsta(e.target.value);
                }}
              />
            </div>
            <div className="twitter">
              <input
                type="text"
                placeholder="Twitter link"
                id="twitter"
                value={twitter}
                onChange={(e) => {
                  settwitter(e.target.value);
                }}
              />
            </div>
            <div className="submit">
              <input type="submit" value="submit" id="submit" />
            </div>
          </form>
          <div
            className="already"
            onClick={() => {
              navigate("/", { replace: true });
            }}
          >
            <u>Already a member?</u>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
