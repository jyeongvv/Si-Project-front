// updateBoard.js
import axiosInstance from "../../../../api/axiosInstance";

export const updateBoard = async (editPost, newPostWithDate, setPosts) => {
  try {
    await axiosInstance.put(`http://127.0.0.1:8080/board/${editPost.id}`, {
      author: newPostWithDate.author,
      title: newPostWithDate.title,
      content: newPostWithDate.content,
      date: newPostWithDate.date,
    });

    const updatedPosts = setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === editPost.id ? { ...editPost, ...newPostWithDate } : post
      )
    );

    setPosts(updatedPosts);
  } catch (error) {
    console.error("게시물 수정 오류:", error);
  }
};
