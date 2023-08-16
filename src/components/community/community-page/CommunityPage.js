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
    newPost.comments = []; // Initialize comments array
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

  // 댓글 추가
  const addComment = (postId, commentText) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            { id: post.comments.length + 1, text: commentText }
          ]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  // 댓글 삭제
  const deleteComment = (postId, commentId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter((comment) => comment.id !== commentId)
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  // 현재 페이지에서 보여줄 게시글
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>커뮤니티 페이지</h1>
      <Board
        posts={currentPosts}
        addPost={addPost}
        updatePost={updatePost}
        deletePost={deletePost}
        addComment={addComment} 
        deleteComment={deleteComment}
      />
      <br />
      <br />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default CommunityPage;
