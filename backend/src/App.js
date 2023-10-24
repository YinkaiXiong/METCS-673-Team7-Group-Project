import React from 'react';
import Login from './login'; 
import Signup from './signup';
import ServerListPage from './ServerListPage';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';

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