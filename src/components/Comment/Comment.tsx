import React from "react";
import "./Comment.css";

interface CommentProps {
  author: string;
  date: string;
  comment: string;
}

const Comment: React.FC<CommentProps> = ({ author, date, comment }) => {
  // const isCurrentUserComment = currentUser === author;

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-profile">{author}</div>
        <div className="comment-date">{date.slice(0, 10)}</div>
        {/* {isCurrentUserComment && (
          <button className="comment-delete-btn" onClick={onDelete}>
            Delete
          </button>
        )} */}
      </div>
      <p className="comment-content">{comment}</p>
    </div>
  );
};

export default Comment;
