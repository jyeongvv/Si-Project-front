import React, { useState } from "react";
import "./Board.css";

const Board = ({ posts, addPost, updatePost, deletePost }) => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editPost, setEditPost] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 현재 시간을 얻어와서 게시글에 추가
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
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setNewPost(post);
  };

  const handleDelete = (postId) => {
    deletePost(postId);
  };

  // 새로운 창으로 게시물 내용 보기
  const openPostInNewWindow = (post) => {
    const newWindow = window.open("", "_blank", "width=600,height=400");
    newWindow.document.write(`
      <div style="padding: 16px;">
        <h2>${post.title}</h2>
        <p>${post.content}</p>
      </div>
    `);
    newWindow.document.close();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
      <table className="custom-table">
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
                <td onClick={() => openPostInNewWindow(post)}>
                  {/* 제목을 클릭하면 새로운 창에 게시물 내용 보기 */}
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
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;