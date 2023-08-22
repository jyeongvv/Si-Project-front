// deleteBoard.js
import axiosInstance from "../../../../api/axiosInstance";

export const deleteBoard = async (postId, setPosts) => {
  try {
    await axiosInstance.delete(`http://127.0.0.1:8080/board/${postId}`);
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  } catch (error) {
    console.error("게시물 삭제 오류:", error);
  }
};