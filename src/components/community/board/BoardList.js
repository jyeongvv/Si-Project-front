import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Board.css';
import CommentList from '../comment/Comment';

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await axios.get("http://127.0.0.1:8080/board");
        setBoards(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    }

    fetchBoards();
  }, []);

  const togglePostContent = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
    }
  };

  return (
    <div className="board-container">
      <h2>게시물 목록</h2>
      <table className="board-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <React.Fragment key={board.id}>
              <tr onClick={() => togglePostContent(board.id)}>
                <td>{board.title}</td>
                <td>{board.author}</td>
              </tr>
              {expandedPostId === board.id && (
                <tr>
                  <td colSpan={2}>
                    <div className="board-expanded-form">
                      <h2>{board.title}</h2>
                      <textarea readOnly value={board.content} />
                      <CommentList boardId={board.id} />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardList;
