// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './services/components/Register';
import Login from './services/components/Login';
import Posts from './services/components/Posts';
import Home from './services/components/Home';
import MyPosts from './services/components/MyPosts';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
        <Route path="/my-posts" element={<PrivateRoute><MyPosts /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
