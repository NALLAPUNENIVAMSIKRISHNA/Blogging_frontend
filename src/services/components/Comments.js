import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Comments.css';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/comments?post_id=${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCreateComment = async () => {
    try {
      const response = await axios.post(`${process.env.API_URL}/api/comments`, { post_id: postId, content: newComment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleUpdateComment = async (id, updatedContent) => {
    try {
      const response = await axios.put(`${process.env.API_URL}/api/comments/${id}`, { content: updatedContent }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(comments.map(comment => comment._id === id ? response.data : comment));
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`${process.env.API_URL}/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(comments.filter(comment => comment._id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <p><strong>{comment.author_id.username}:</strong> {comment.content}</p>
          <button
            className="btn-update"
            onClick={() => handleUpdateComment(comment._id, prompt('Update comment:', comment.content))}
          >
            Update
          </button>
          <button
            className="btn-delete"
            onClick={() => handleDeleteComment(comment._id)}
          >
            Delete
          </button>
        </div>
      ))}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button className="btn-add" onClick={handleCreateComment}>Add Comment</button>
    </div>
  );
};

export default Comments;
