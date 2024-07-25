import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Blogging Website</h1>
      <div className="home-content">
        <div className="home-image">
          <img src="https://media.licdn.com/dms/image/D4D12AQFHlOKR6nYRTA/article-cover_image-shrink_600_2000/0/1685621377041?e=2147483647&v=beta&t=WCwjEiLUYf9tUI48k-fm33JDGiqjUwFWTBkuPZbNBx4" alt="Blogging" />
        </div>
        <div className="home-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
