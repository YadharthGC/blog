import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useHistory } from "react";
import Register from "./register";
import Login from "./login";
import Feed from "./feed";
import Profile from "./profile";
import Page from "./page";
import Create from "./create";
import Setpic from "./setpic";
import Aboutme from "./aboutme";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} exact={true} />
          <Route path="/" element={<Login />} exact={true} />
          <Route path="/feed" element={<Feed />} exact={true} />
          <Route path="/profile" element={<Profile />} exact={true} />
          <Route path="/page/:id" element={<Page />} exact={true} />
          <Route path="/create" element={<Create />} exact={true} />
          <Route path="/setpic/:id" element={<Setpic />} exact={true} />
          <Route path="/aboutme/:id" element={<Aboutme />} exact={true} />
          <Route path="/create" element={<Create />} exact={true} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
