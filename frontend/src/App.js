import React from 'react';
import Login from './Login/login';
import Signup from './SignUp/signup';
import ServerListPage from './ServerList/ServerListPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/serverlistpage" element={<ServerListPage />} />
      </Routes>
    </Router>
  );
}

export default App;