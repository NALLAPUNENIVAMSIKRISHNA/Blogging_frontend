// src/services/components/Posts.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './Comments';
import './Posts.css';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToMyPosts = () => {
    navigate('/my-posts');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/posts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(response.data);
        console.log(response.data); // Updated to log the response data instead of posts state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Posts</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <button className="my-posts-btn" onClick={goToMyPosts}>My Posts</button>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.author_id && post.author_id.username ? (
            <small>By: {post.author_id.username}</small>
          ) : (
            <small>By: Unknown</small>
          )}
          <Comments postId={post._id} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
