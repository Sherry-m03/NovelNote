import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  function navgigateDashboard() {
    navigate("/dashboard");
  }
  function navgigateHome() {
    navigate("/");
  }
  return (
    <div className="home">
      <div className="navbar">
        <div onClick={navgigateHome} className="header">
          Novel Note
        </div>
        <div className="nav-btns">
          <button id="head-search" onClick={navgigateDashboard}>
            Get Started
          </button>
        </div>
      </div>
      <div className="home-desc">
        <div className="home-desc1">Read, Remember, and Relive</div>
        <div className="home-desc2">– because every book matters.</div>
        <div className="home-desc3">
          Log your books, track your progress, and let the adventure never end.
        </div>
      </div>
      <div className="vapour">
        <div className="vapour">
          <span style={{ "--v": 1 }}></span>
          <span style={{ "--v": 2 }}></span>
          <span style={{ "--v": 5 }}></span>
          <span style={{ "--v": 4 }}></span>
          <span style={{ "--v": 6 }}></span>
          <span style={{ "--v": 19 }}></span>
          <span style={{ "--v": 7 }}></span>
          <span style={{ "--v": 8 }}></span>
          <span style={{ "--v": 9 }}></span>
          <span style={{ "--v": 10 }}></span>
          <span style={{ "--v": 11 }}></span>
          <span style={{ "--v": 18 }}></span>
        </div>
      </div>
    </div>
  );
}
