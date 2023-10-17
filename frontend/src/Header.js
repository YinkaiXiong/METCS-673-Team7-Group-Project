import React from 'react';
import './Header.css'; 
import white from '/Users/shivani/Desktop/frontend/src/white.jpg';

function Header() {
  return (
    <header className="header">
      <div className="left-section">
        <div className="logo">Watchdog</div>
      </div>
      <div className="right-section">
        <nav>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Manage Servers</a></li>
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