import React, { useState } from "react";
import Board from "../board/Board";
import Pagination from "../pagination/Pagination";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // 게시글 추가
  const addPost = (newPost) => {
    newPost.id = posts.length + 1;
    setPosts([...posts, newPost]);
  };

  // 게시글 수정
  const updatePost = (updatedPost) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };

  // 게시글 삭제
  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  // 현재 페이지에서 보여줄 게시글
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 시 실행되는 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>커뮤니티 페이지</h1>
      <Board
        posts={currentPosts}
        addPost={addPost}
        updatePost={updatePost}
        deletePost={deletePost}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default CommunityPage;