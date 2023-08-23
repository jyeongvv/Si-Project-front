import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentList({ boardId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`http://127.0.0.1:8080/board/${boardId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchComments();
  }, [boardId]);

  return (
    <div>
      <h3>댓글</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <p>작성자: {comment.author}</p>
            <p>작성 일자: {comment.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
