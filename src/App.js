// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './services/components/Register';
import Login from './services/components/Login';
import Posts from './services/components/Posts';
import Home from './services/components/Home';
import MyPosts from './services/components/MyPosts';
import Navbar from './services/components/navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/my-posts" element={<MyPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
