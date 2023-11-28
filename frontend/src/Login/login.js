import React, { useState } from "react";
import "./css/login.css";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/manrope";
import "@fontsource/manrope/800.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      },
      body: JSON.stringify({ email: username, password: password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          navigate("/serverlistpage");
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
