import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import Board from "../board/Board";
import Pagination from "../pagination/Pagination";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("http://127.0.0.1:8080/board");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = async (newPost) => {
    if (auth.isAuthenticated) {
      try {
        const response = await axiosInstance.post("http://127.0.0.1:8080/board", {
          author: newPost.author,
          title: newPost.title,
          content: newPost.content,
        });

        if (response.data) {
          const newPostWithCreatedAt = {
            ...response.data,
            date: response.data.createdAt,
          };
          setPosts([...posts, newPostWithCreatedAt]);
        }
      } catch (error) {
        console.error("Error adding post:", error);
      }
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  const updatePost = async (postId, updatedPost) => {
    if (auth.isAuthenticated) {
      try {
        const response = await axiosInstance.put(`http://127.0.0.1:8080/board/${postId}`, {
          title: updatedPost.title,
          content: updatedPost.content,
        });

        if (response.data) {
          const updatedPosts = posts.map((post) =>
            post.id === postId
              ? { ...post, title: updatedPost.title, content: updatedPost.content }
              : post
          );
          setPosts(updatedPosts);
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  const deletePost = async (postId) => {
    if (auth.isAuthenticated) {
      try {
        const response = await axiosInstance.delete(`http://127.0.0.1:8080/board/${postId}`);

        if (response.data) {
          const updatedPosts = posts.filter((post) => post.id !== postId);
          setPosts(updatedPosts);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  // 댓글 추가 함수
  const addComment = async (postId, commentText) => {
    try {
      const response = await axiosInstance.post(`http://127.0.0.1:8080/board/${postId}/comments`, {
        content: commentText,
      });

      if (response.data) {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: response.data.id,
                  content: commentText,
                  author: response.data.author,
                  createdAt: response.data.createdAt,
                },
              ],
            };
          }
          return post;
        });

        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const updateComment = async (postId, commentId, updatedContent) => {
    try {
      const response = await axiosInstance.put(
        `http://127.0.0.1:8080/board/${postId}/comments/${commentId}`,
        { content: updatedContent }
      );

      if (response.data) {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            const updatedComments = post.comments.map((comment) =>
              comment.id === commentId ? { ...comment, content: updatedContent } : comment
            );
            return { ...post, comments: updatedComments };
          }
          return post;
        });

        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // 댓글 삭제 함수
  const deleteComment = async (postId, commentId) => {
    try {
      await axiosInstance.delete(`http://127.0.0.1:8080/board/${postId}/comments/${commentId}`);
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments.filter((comment) => comment.id !== commentId);
          return { ...post, comments: updatedComments };
        }
        return post;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
      console.error("Error deleting comment:", error);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>커뮤니티 페이지</h1>
      <Board
        posts={currentPosts}
        setPosts={setPosts}
        addComment={addComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
        addPost={addPost}
        updatePost={updatePost}
        deletePost={deletePost}
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
