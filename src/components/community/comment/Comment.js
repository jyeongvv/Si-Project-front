import React from "react";

const Comment = ({ comment, deleteComment }) => {
  return (
    <div className="comment">
      <p>{comment.text}</p>
      <button onClick={() => deleteComment(comment.id)}>댓글 삭제</button>
    </div>
  );
};

export default Comment;
