import React, { useState } from "react";
import "./css/login.css";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/manrope";
import "@fontsource/manrope/800.css";
import base64 from 'base-64';
import { useUser } from "./UserContext";

function Login() {
  const { setUserData } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const token = base64.encode(username+":"+password);
    fetch("http://localhost:3000/user/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Authorization":"Basic "+token,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {

          setUserData(username);
          navigate("/serverStatus");
        } else {
          alert(json);
        }
      })
      .catch((error) => {
        window.alert(error);
        //return;
      });
  };

  return (
    <div>
      <h1 className="title">Watchdog</h1>
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot-password">
            <a href="/">FORGOT YOUR PASSWORD?</a>
          </div>
          <button onClick={handleLogin}>SIGN IN</button>
          <div className="create-account">
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "underline", fontWeight: "bold" }}
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
