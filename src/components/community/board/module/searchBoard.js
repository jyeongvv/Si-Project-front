import axiosInstance from "../../../../api/axiosInstance";

export const searchBoard = async (searchType, query, setPosts) => {
  try {
    const response = await axiosInstance.get(`/board/search?searchType=${searchType}&query=${query}`);
    setPosts(response.data);
  } catch (error) {
    console.error("게시글 검색 오류:", error);
  }
};
