import React, { useState } from 'react';
import './css/signup.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = () => {
    fetch('http://localhost:3000/user/createUser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"

      },
      body: JSON.stringify({ "email": username, "password": password, "first_name": firstName, "last_name": lastName }),
    }).then(res => {
      if (res.status >= 400) {
        throw new Error("Duplicate");
      }
      res.json()
    }).then(json => {
      alert("Successful"); navigate("/");
    }).catch(error => {
      alert(error);
    });
  };

  return (
    <div>
      <h1 className="title">Watchdog</h1>
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create Account</h1>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="name-inputs">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSignup}>CREATE</button>
        <div className="have-account">
          Already have an account? <Link to="/" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>LOGIN</Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
