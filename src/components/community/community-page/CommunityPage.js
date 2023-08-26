import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axiosInstance";
import Board from "../board/Board";
import Pagination from "../pagination/Pagination";
import Info from "../../footer/Info";
import WriteFormPopup from "../board/popup/Popup";


const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchOption, setSearchOption] = useState('all');
  const auth = useSelector(state => state.auth);
  // const [showWriteForm, setShowWriteForm] = useState(false); 

  const handleSearch = () => {
    const filtered = posts.filter(post => {
      if (searchOption === 'all') {
        // 전체 검색 옵션일 경우 제목, 작성자, 내용 모두에서 검색
        return (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        // 다른 검색 옵션일 경우 해당 필드에서 검색
        const fieldValue = post[searchOption] || ''; // 필드가 없을 경우 빈 문자열로 초기화
        return fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });

    setFilteredPosts(filtered);
  };


  const refreshPosts = async () => {
    try {
      const response = await axiosInstance.get("http://127.0.0.1:8080/board");
      const sortedPosts = response.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setPosts(sortedPosts);
    } catch (error) {
      console.error("포스트 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("http://127.0.0.1:8080/board");
      const sortedPosts = response.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  

  const addPost = async (newPost) => {
    console.log(auth.isAuthenticated);
    if (auth.isAuthenticated) {
      try {
        const formData = new FormData();
        formData.append("author", newPost.author);
        formData.append("title", newPost.title);
        formData.append("content", newPost.content);
        formData.append("image", newPost.image); // Add image file to the form data

        const response = await axiosInstance.post("http://127.0.0.1:8080/board", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for form data
          },
        });
        if (response.data) {
          const newPostWithCreatedAt = {
            ...response.data,
            date: response.data.createdAt,
          };
          setPosts([...posts, newPostWithCreatedAt]);
          refreshPosts();
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
          refreshPosts();
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
          refreshPosts();
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
        refreshPosts();
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
        refreshPosts();
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
      refreshPosts();
    } catch (error) {
      console.log(error);
      console.error("Error deleting comment:", error);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchTerm ? filteredPosts.slice(indexOfFirstPost, indexOfLastPost) : posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="search-community" style={{ backgroundColor: '#eeeeee'}}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <select
        value={searchOption}
        onChange={e => setSearchOption(e.target.value)}
      >
        <option value="all">전체</option>
        <option value="title">제목</option>
        <option value="author">작성자</option>
        <option value="content">내용</option>
      </select>
      <input
        type="text"
        placeholder="검색어 입력..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
      <WriteFormPopup addPost={addPost} /> 
      <Board
        posts={currentPosts}
        setPosts={setPosts}
        addComment={addComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
        addPost={addPost}
        updatePost={updatePost}
        deletePost={deletePost}
        searchPosts={handleSearch} // 추가: 검색 함수 전달
      />
      <br />
      <br />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={searchTerm ? filteredPosts.length : posts.length}
        paginate={paginate}
      />
      <Info />
    </div>
  );
};

export default CommunityPage;
