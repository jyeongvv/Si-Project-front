import React, { useState } from "react";
import "./Board.css";

const Board = ({ posts, addPost, updatePost, deletePost, addComment, deleteComment }) => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editPost, setEditPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [commentText, setCommentText] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    const newPostWithDate = { ...newPost, date: formattedDate };

    if (editPost) {
      updatePost({ ...editPost, ...newPostWithDate });
      setEditPost(null);
    } else {
      addPost(newPostWithDate);
    }
    setNewPost({ title: "", content: "" });
    setShowForm(false);
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setNewPost(post);
    setShowForm(true);
  };

  const handleDelete = (postId) => {
    deletePost(postId);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditPost(null);
    setNewPost({ title: "", content: "" });
  };

  const togglePostContent = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
    }
  };

  const handleAddComment = (postId) => {
    if (commentText.trim() !== "") {
      addComment(postId, commentText);
      setCommentText("");
    }
  };

  return (
    <div className="board-container">
      <div className="board-write-form">
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="board-add-button">
            글작성
          </button>
        )}
        {showForm && (
          <button onClick={handleCancel} className="board-cancel-button">
            취소
          </button>
        )}
      </div>
      {showForm && (
        <form className="board-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="제목"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
          <textarea
            placeholder="내용"
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
          />
          <button type="submit">{editPost ? "수정" : "추가"}</button>
        </form>
      )}
      <table className="board-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성 일자</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <React.Fragment key={post.id}>
              <tr>
                <td onClick={() => togglePostContent(post.id)}>
                  {post.title}
                </td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>
                  <button onClick={() => handleEdit(post)}>수정</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(post.id)}>삭제</button>
                </td>
              </tr>
              {expandedPostId === post.id && (
                <tr>
                  <td colSpan={5}>
                    <div className="board-expanded-form">
                      <h2>{post.title}</h2>
                      <textarea readOnly>{post.content}</textarea>
                      <div>
                        <h3>댓글</h3>
                        <div className="comments-section">
                          {post.comments.map((comment) => (
                            <div key={comment.id}>
                              <p>{comment.text}</p>
                              <button onClick={() => deleteComment(post.id, comment.id)}>삭제</button>
                            </div>
                          ))}
                        </div>
                        <div className="comment-input">
                          <textarea
                            placeholder="댓글을 입력하세요."
                            onChange={(e) => setCommentText(e.target.value)}
                            value={commentText}
                          />
                          <button onClick={() => handleAddComment(post.id)}>댓글 추가</button>
                        </div>
                      </div>
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
};

export default Board;
