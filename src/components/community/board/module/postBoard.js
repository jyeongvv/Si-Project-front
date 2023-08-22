// postBoard.js
import axiosInstance from "../../../../api/axiosInstance";

export const postBoard = async (newPostWithDate, setPosts) => {
  try {
    const response = await axiosInstance.post("http://127.0.0.1:8080/board", {
      author: newPostWithDate.author,
      title: newPostWithDate.title,
      content: newPostWithDate.content,
    });

    if (response.data) {
      setPosts(prevPosts => [...prevPosts, response.data]);
    }
  } catch (error) {
    console.error("게시물 추가 오류:", error);
  }
};
