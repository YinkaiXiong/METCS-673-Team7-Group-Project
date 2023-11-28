import React from "react";
import "./css/Header.css";
import white from "../images/white.jpg";
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
          </ul>
        </nav>
        <div className="user-profile">
          <img src={white} alt="User Profile" />
        </div>
      </div>
    </header>
  );
}

export default Header;
