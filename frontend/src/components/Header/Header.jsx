import React from "react";
import "./css/Header.css";
import white from "../../assets/images/white.jpg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="left-section">
        <div className="logo">Watchdog</div>
      </div>
      <div className="right-section">
        <nav>
          <ul>
            <li>
              <Link
                to="/serverStatus"
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/serverlistpage"
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                Manage Servers
              </Link>
            </li>
            <li>
              <Link
                to="/userlistpage"
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                Manage Users
              </Link>
            </li>
          </ul>
        </nav>
        <div class="user-profile">
        <div class="dropdown">
          <button class="dropbtn">
            <img src={white} alt="User Profile" class="profile-img"/>
          </button>
          <div class="dropdown-content">
          <Link
                to="/changePassword"
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
               Change Password
              </Link>
              <Link
                to="/"
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
               Logout
              </Link>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}

export default Header;
